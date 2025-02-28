import {
    Component,
    inject,
    OnDestroy,
    signal
} from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import {
    MatError,
    MatFormField,
    MatFormFieldModule,
    MatLabel
} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { TaskService } from "@core/services/task.service";
import { AlertComponent, HeaderComponent, SpinnerComponent } from "@shared/components";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: "app-home-page",
    standalone: true,
    imports: [
        MatButton,
        MatFormField,
        MatLabel,
        MatError,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HeaderComponent,
        SpinnerComponent
    ],
    templateUrl: "./login-page.component.html",
    styleUrl: "./login-page.component.scss"
})
export class LoginPageComponent implements OnDestroy {
    private fb = inject(FormBuilder);
    private svcTask = inject(TaskService);
    private router = inject(Router);
    private destroy$ = new Subject<void>();

    loginForm!: FormGroup;
    loading = signal(false);
    readonly dialog = inject(MatDialog);

    constructor() {
        localStorage.removeItem("user");
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]]
        });
    }

    openDialog(message: string): void {
        this.dialog.open(AlertComponent, {
            width: "250px",
            enterAnimationDuration: "0ms",
            exitAnimationDuration: "0ms",
            data: {
                title: "Estimado Cliente",
                message,
                hideCancel: true
            },
        });
    }

    login() {
        if (this.loginForm.valid) {
            const { email } = this.loginForm.value;
            this.loading.set(true);
            this.svcTask.getUser(email.toLowerCase().trim())
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (value) => {
                        localStorage.setItem("user", JSON.stringify(value));
                        this.router.navigate(["main"]);
                        if (value.created) this.openDialog("Usuario creado con exito!");
                    },
                    error: () => {
                        this.openDialog("Ocurrieron errores técnicos, intente más tarde.");
                        this.loading.set(false);
                    },
                    complete: () => this.loading.set(false)
                });
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
