import { Routes } from "@angular/router";
import { authGuard } from "@core/guards/auth.guard";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "login",
        loadComponent: () => import("./modules/login/login-page.component").then((m) => m.LoginPageComponent)
    },
    {
        path: "main",
        loadComponent: () => import("./modules/main/main-page.component").then((m) => m.MainPageComponent),
        canActivate: [authGuard]
    }
];
