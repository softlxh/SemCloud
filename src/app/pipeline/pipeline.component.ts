import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pipeline, TaskInterface } from '../pipeline_property';
import { DataService } from "../../data.service";
import { Subscription } from 'rxjs';
import { Input } from '@angular/core';

interface TaskName {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css'],
  template: '<app-pipeline [tasks]="tasks" [name]={{name}}"></app-pipeline>'
})
export class PipelineComponent implements OnInit {
  @Input() name: string = "";
  pipeline: Pipeline = {
    id: 1,
    name: ""
  }
  taskNames: TaskName[] = [
    {value: 'Retrieve', viewValue: 'Retrieve'},
    {value: 'Slice', viewValue: 'Slice'},
    {value: 'Prepare', viewValue: 'Prepare'},
    {value: 'Store', viewValue: 'Store'},
  ];
  tasks: TaskInterface[] = [];
  textToEdit?: string = "";
  valueToEdit?: string = "";
  taskName?: string = "";
  showPropertyPanel = false;  
  mockTask: TaskInterface = {
    taskname: "",
    property: []
};

  message!: string;
  subscription!: Subscription;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
    this.pipeline.name = this.name;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClick(): void {
    if (this.tasks.length < 4) {
      this.taskName = "Task";
      let currenttime = new Date();
      //console.log(currenttime.toISOString() + ": Add task.");
      this.data.changeMessage(this.message + currenttime.toISOString() + ",User start to add task." + "\n");
    }
    else {
      alert("Cannot add more tasks!");
    }
  }

  onCancelAddTask(): void {
    this.taskName = "";
  }

  onSelectPipelineTitle(text: string): void {
    this.textToEdit = text;
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": title of " + this.textToEdit + " start to be edited.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",Title of " + this.textToEdit + " starts to be edited." + "\n");
  }

  onSelectValue(text: string): void {
    this.valueToEdit = text;
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": properties of " + this.mockTask.taskname + " start to be edited.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",User starts to edit the properties of the task " + this.mockTask.taskname + "." + "\n");
  }

  onConfirmPipelineTitle(newName: string): void {
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": title of " + this.textToEdit + " edit completed.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",Title of " + this.textToEdit + " is changed to " + newName + "\n");
    this.textToEdit = "";
  }

  onConfirmEditedValue(): void {
    this.valueToEdit = "";
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": properties of " + this.mockTask.taskname + " edit completed.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",User ends the edit for the properties of the task " + this.mockTask.taskname + ".\n");
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
        //Store
        if (this.taskName == "Store")
        {
          this.tasks.push({
            taskname: this.taskName!,
            property: [
                {name: "Task type", value: "Store"},
                {name: "Task ID", value: this.pipeline.name + "_Store"},
                {name: "Number of Instance", value: "Auto: 1"},
                {name: "Store mode", value: "Auto"},
                {name: "Previous task", value: this.pipeline.name + "_Prepare"},
                {name: "Next task", value: "End of pipeline"},
                {name: "CPU reservation", value: "Auto"},
                {name: "Memory reservation", value: "Auto"},
                {name: "Storage reservation", value: "Auto"},
            ]
          });
        }
        //Retrieve
        if (this.taskName == "Retrieve")
        {
          this.tasks.push({
            taskname: this.taskName!,
            property: [
                {name: "Task type", value: "Retrieve"},
                {name: "Task ID", value: this.pipeline.name + "_Retrieve"},
                {name: "Number of Instance", value: "1"},
                {name: "Data source", value: "URL"},
                {name: "Data name", value: ""},
                {name: "User credentials", value: "--"},
                {name: "Format", value: "CSV"},
                {name: "Previous task", value: this.pipeline.name + "_Store"},
                {name: "Next task", value: "-"},
                {name: "CPU reservation", value: "Auto"},
                {name: "Memory reservation", value: "Auto"},
                {name: "Storage reservation", value: "Auto"},
            ]
          });
        }
        //Prepare
        if (this.taskName == "Prepare")
        {
          this.tasks.push({
            taskname: this.taskName!,
            property: [
                {name: "Task type", value: "Prepare"},
                {name: "Task ID", value: this.pipeline.name + "_Prepare"},
                {name: "Number of Instance", value: "Auto"},
                {name: "Script address", value: ""},
                {name: "Additional data flow", value: ""},
                {name: "Previous task", value: this.pipeline.name + "_Slice"},
                {name: "Next task", value: "-"},
                {name: "CPU reservation", value: "Auto"},
                {name: "Memory reservation", value: "Auto"},
                {name: "Storage reservation", value: "Auto"},
            ]
          });
        }
        //Slice
        if (this.taskName == "Slice")
        {
          this.tasks.push({
            taskname: this.taskName!,
            property: [
                {name: "Task type", value: "Slice"},
                {name: "Task ID", value: this.pipeline.name + "_Slice"},
                {name: "Number of Instance", value: "1"},
                {name: "Chunk size", value: "Auto"},
                {name: "Slice size", value: "Auto"},
                {name: "Slice feature", value: ""},
                {name: "Previous task", value: this.pipeline.name + "_Retrieve"},
                {name: "Next task", value: "-"},
                {name: "CPU reservation", value: "Auto"},
                {name: "Memory reservation", value: "Auto"},
                {name: "Storage reservation", value: "Auto"},
            ]
          });
        }
      }
      let currenttime = new Date();
      //console.log(currenttime.toISOString() + ": task " + this.taskName + " added.");
      this.data.changeMessage(this.message + currenttime.toISOString() + ",Task " + this.taskName + " for the pipeline " + this.pipeline.name + " is added." + "\n");
    }
    
    this.taskName = "";
  }

  onShowProperty(task: TaskInterface): void {
    this.mockTask = task;
    this.showPropertyPanel = true;
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": task " + this.mockTask.taskname + " property panel opened.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",The property panel of " + this.mockTask.taskname + " in pipeline " + this.pipeline.name + " is opened." + "\n");
  }

  onClosePropertyPanel(): void {
    this.showPropertyPanel = false;
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": task " + this.mockTask.taskname + " property panel closed.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",The property panel of " + this.mockTask.taskname + " in pipeline " + this.pipeline.name + " is closed." + "\n");
  }

}
