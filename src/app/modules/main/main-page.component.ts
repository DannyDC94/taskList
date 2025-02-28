import { CommonModule } from "@angular/common";
import {
    Component,
    inject,
    OnDestroy,
    OnInit,
    signal
} from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Task, User } from "@core/models";
import { TaskService } from "@core/services/task.service";
import { AlertComponent, HeaderComponent, SpinnerComponent } from "@shared/components";
import { formatTimestamp } from "@shared/utils/formatDate.util";
import { Subscription } from "rxjs";

@Component({
    selector: "app-main-page",
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        MatButton,
        MatCheckbox,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        CommonModule,
        HeaderComponent,
        SpinnerComponent
    ],
    templateUrl: "./main-page.component.html",
    styleUrl: "./main-page.component.scss"
})
export class MainPageComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    private svcTask = inject(TaskService);

    taskForm!: FormGroup;
    tasks: Task[] = [];
    showList: boolean = true;
    loading = signal(false);

    readonly dialog = inject(MatDialog);
    private editTask: Task | null = null;
    private user!: User;
    private subscriptions = new Subscription();

    constructor() {
        this.taskForm = this.fb.group({
            title: ["", Validators.required],
            description: [""]
        });
    }

    ngOnInit() {
        const userLocal: string | null = localStorage.getItem("user");
        if (userLocal) {
            this.user = JSON.parse(userLocal);
            this.loading.set(true);
            this.loadTasks();
        }
    }

    // eslint-disable-next-line class-methods-use-this
    transformDate(date: any) {
        return formatTimestamp(date);
    }

    loadTasks(fromForm: boolean = false) {
        this.subscriptions.add(
            this.svcTask.getTasks(this.user.userId).subscribe({
                next: (value) => {
                    this.tasks = value;
                    if (fromForm) {
                        this.taskForm.reset();
                        this.showList = true;
                    }
                },
                error: () => {
                    this.openDialog("", "Ocurrieron errores técnicos, intente más tarde.", true);
                    this.loading.set(false);
                },
                complete: () => this.loading.set(false)
            })
        );
    }

    newTask() {
        this.showList = false;
    }

    cancelTask() {
        this.showList = true;
    }

    addOrEditTask() {
        this.loading.set(true);
        if (this.taskForm.valid) {
            if (this.editTask) {
                const updateTask: Task = {
                    ...this.editTask,
                    ...this.taskForm.value
                };
                this.subscriptions.add(
                    this.svcTask.updateTask(this.user.userId, updateTask).subscribe({
                        next: () => {
                            this.openDialog("", "Tarea editada con exito.", true);
                            this.loadTasks(true);
                        },
                        error: () => {
                            this.openDialog("", "Ocurrieron errores técnicos, intente más tarde.", true);
                            this.loading.set(false);
                        }
                    })
                );
                this.editTask = null;
            } else {
                const newTask: Task = {
                    ...this.taskForm.value,
                    status: false
                };
                this.subscriptions.add(
                    this.svcTask.addTask(this.user.userId, newTask).subscribe({
                        next: () => {
                            this.openDialog("", "Tarea agregada con exito.", true);
                            this.loadTasks(true);
                        },
                        error: () => {
                            this.openDialog("", "Ocurrieron errores técnicos, intente más tarde.", true);
                            this.loading.set(false);
                        }
                    })
                );
            }
        }
    }

    checkTask(task: Task) {
        this.loading.set(true);
        this.subscriptions.add(
            this.svcTask.updateTask(this.user.userId, task).subscribe({
                next: () => { this.openDialog("", "Cambio de estado exitoso.", true); },
                error: () => {
                    this.openDialog("", "Ocurrieron errores técnicos, intente más tarde.", true);
                    this.loading.set(false);
                },
                complete: () => this.loading.set(false)
            })
        );
    }

    showTask(task: Task) {
        this.taskForm.patchValue(task);
        this.editTask = task;
        this.showList = false;
    }

    deleteTask(id: Task["id"]) {
        this.loading.set(true);
        this.subscriptions.add(
            this.svcTask.deleteTask(this.user.userId, id).subscribe({
                next: () => {
                    this.openDialog("", "Tarea eliminada con exito.", true);
                    this.loadTasks();
                },
                error: () => {
                    this.openDialog("", "Ocurrieron errores técnicos, intente más tarde.", true);
                    this.loading.set(false);
                }
            })
        );
    }

    openDialog(id: Task["id"], message: string = "", hideCancel: boolean = false): void {
        const dialogRef = this.dialog.open(AlertComponent, {
            width: "250px",
            enterAnimationDuration: "0ms",
            exitAnimationDuration: "0ms",
            data: {
                title: "Estimado Cliente",
                message,
                hideCancel
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && !hideCancel) this.deleteTask(id);
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
