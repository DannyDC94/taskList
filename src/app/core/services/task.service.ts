import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task, User } from "@core/models";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class TaskService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    getUser(email: string): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/users`, { email });
    }

    getTasks(userId: User["userId"]): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/users/${userId}/tasks`);
    }

    addTask(userId: User["userId"], task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/users/${userId}/tasks`, task);
    }

    updateTask(userId: User["userId"], task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/users/${userId}/tasks/${task.id}`, task);
    }

    deleteTask(userId: User["userId"], taskId: Task["id"]): Observable<Task> {
        return this.http.delete<Task>(`${this.apiUrl}/users/${userId}/tasks/${taskId}`);
    }
}
