import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  myTask: Task = {
    label: '',
    status: false
  }

  tasks : Task[] = [];
  constructor(private taskService : TaskService) { }

  getData()
  {
    this.taskService.findAll().subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(id){
    this.taskService.delete(id)
    .subscribe(() => this.tasks = this.tasks.filter(task => task.id != id));
  }

  persistTask(){
    this.taskService.persist(this.myTask)
    .subscribe((task) => {this.tasks = [task, ...this.tasks]});
  }

  ngOnInit() {
    this.getData();
    //this.deleteTask(this.tasks);
  }

}
