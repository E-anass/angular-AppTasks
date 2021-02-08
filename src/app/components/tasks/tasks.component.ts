import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  searchText = '';
  addTask= false;
  editForm= false;

  myTask: Task = {
    label: '',
    status: false
  }

  tasks : Task[] = [];
  resultTasks : Task[] = [];

  constructor(private taskService : TaskService) { }

  getData()
  {
    this.taskService.findAll().subscribe(tasks => 
      { this.resultTasks = this.tasks = tasks });
  }

  deleteTask(id){
    this.taskService.delete(id)
    .subscribe(() => this.tasks = this.tasks.filter(task => task.id != id));
  }

  persistTask(){
    this.taskService.persist(this.myTask)
    .subscribe((task) => {this.tasks = [task, ...this.tasks]});
    this.initTasks();
    this.addTask= false;
  }

  initTasks(){
    this.myTask = {
      label: " ",
      status: false
    }
  }

  updateStatus(task){
    this.taskService.completedPatch(task.id, task.status)
    .subscribe(() => {task.status= !task.status});
  }

  ngOnInit() {
    this.getData();
    //this.deleteTask(this.tasks);
  }

  editTask(task){
    this.myTask = task;
    this.editForm = true;
  }

  updateTask(){
    this.taskService.update(this.myTask)
    .subscribe( task => {
    this.initTasks();
    this.editForm = false;
    })
  }

  searchTask(){
    this.resultTasks = this.tasks.
    filter((task) => task.label.toUpperCase().includes(this.searchText.toUpperCase()))
  }

}
