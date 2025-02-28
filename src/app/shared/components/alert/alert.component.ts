import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    inject
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";

@Component({
    selector: "app-alert",
    standalone: true,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
    templateUrl: "./alert.component.html",
    styleUrl: "./alert.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
    readonly dialogRef = inject(MatDialogRef<AlertComponent>);
    title: string = "";
    message: string = "";
    hideCancel: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; hideCancel: boolean; }) {
        this.title = data.title;
        this.message = data.message;
        this.hideCancel = data.hideCancel;
    }

    onSend(accept: boolean = false): void {
        this.dialogRef.close(accept);
    }
}
