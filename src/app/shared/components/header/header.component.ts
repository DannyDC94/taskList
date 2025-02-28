import { NgOptimizedImage } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [
        NgOptimizedImage,
        MatButton
    ],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss"
})
export class HeaderComponent implements OnInit {
    router = inject(Router);
    isLogin: boolean = false;

    ngOnInit(): void {
        const user = localStorage.getItem("user");
        if (user) this.isLogin = true;
    }

    closeApp(): void {
        localStorage.removeItem("user");
        this.router.navigate(["login"]);
    }
}
