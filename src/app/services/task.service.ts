import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  urlApi = "http://localhost:3000/tasks";
  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Task[]>(this.urlApi);
  }
  
  delete(id) {
    return this.httpClient.delete(`${this.urlApi}/${id}`);
  }

  persist(task){
    return this.httpClient.post<Task>(this.urlApi, task);
  }

  completedPatch(id, completed){
    return this.httpClient.patch(`${this.urlApi}/${id}`,{completed: !completed})
  }

  update(task){
    return this.httpClient.put(`${this.urlApi}/${task.id}`, task)
  }

  /* add(){
    return this.httpClient.put(TasksComponent)
  } */
  
}
