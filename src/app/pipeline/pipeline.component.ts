import { Component, OnInit } from '@angular/core';
import { Pipeline, TaskInterface } from '../pipeline_property';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css'],
  template: '<app-pipeline [tasks]="tasks"></app-pipeline>'
})
export class PipelineComponent implements OnInit {
  pipeline: Pipeline = {
    id: 1,
    name: "Pipeline"
  }
  tasks: TaskInterface[] = [];
  textToEdit?: string = "";
  valueToEdit?: string = "";
  taskName?: string = "";
  showPropertyPanel = false;  
  mockTask: TaskInterface = {
    taskname: "",
    property: []
};

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    if (this.tasks.length < 4) {
      this.taskName = "Task";
      let currenttime = new Date();
      console.log(currenttime.toISOString() + ": Add task.");
    }
    else {
      alert("Cannot add more tasks!");
    }
  }

  onSelectPipelineTitle(text: string): void {
    this.textToEdit = text;
    let currenttime = new Date();
    console.log(currenttime.toISOString() + ": title of " + this.textToEdit + " start to be edited.");
  }

  onSelectValue(text: string): void {
    this.valueToEdit = text;
    let currenttime = new Date();
    console.log(currenttime.toISOString() + ": properties of " + this.mockTask.taskname + " start to be edited.");
  }

  onConfirmPipelineTitle(): void {
    let currenttime = new Date();
    console.log(currenttime.toISOString() + ": title of " + this.textToEdit + " edit completed.");
    this.textToEdit = "";
  }

  onConfirmEditedValue(): void {
    this.valueToEdit = "";
    let currenttime = new Date();
    console.log(currenttime.toISOString() + ": properties of " + this.mockTask.taskname + " edit completed.");
  }

  onConfirmTaskName(): void {
    if (this.tasks.length < 4) {
      let flag = true;
      this.tasks.forEach(value => {
          if (value.taskname === this.taskName) {
              alert("Can not use duplicated task name!");
              flag = false;
          }           
      });
      if (flag == true) {
      this.tasks.push({
        taskname: this.taskName!,
        property: [
            {name: "Task type", value: "Store"},
            {name: "Task ID", value: "P1Store"},
            {name: "Data name", value: "MetainfoRef"},
            {name: "Data label", value: "Meta + Ref"},
            {name: "Storage address", value: "Cloud"},
            {name: "Storage type", value: "FastInMemory"},
            {name: "Format", value: "CSV"},
            {name: "Input Task", value: "P1Prepare"},
            {name: "Output Task", value: "P1Storage"},
            {name: "Comment", value: "This is a task"}
        ]
      });
      }
      let currenttime = new Date();
      console.log(currenttime.toISOString() + ": task " + this.taskName + " added.");
    }
    
    this.taskName = "";
  }

  onShowProperty(task: TaskInterface): void {
    this.mockTask = task;
    this.showPropertyPanel = true;
    let currenttime = new Date();
    console.log(currenttime.toISOString() + ": task " + this.mockTask.taskname + " property panel opened.");
  }

  onClosePropertyPanel(): void {
    this.showPropertyPanel = false;
    let currenttime = new Date();
    console.log(currenttime.toISOString() + ": task " + this.mockTask.taskname + " property panel closed.");
  }

}
