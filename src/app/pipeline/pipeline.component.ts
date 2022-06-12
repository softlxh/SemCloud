import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pipeline, TaskInterface } from '../pipeline_property';
import { DataService } from "../../data.service";
import { Subscription } from 'rxjs';

interface TaskName {
  value: string;
  viewValue: string;
}

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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClick(): void {
    if (this.tasks.length < 4) {
      this.taskName = "Task";
      let currenttime = new Date();
      //console.log(currenttime.toISOString() + ": Add task.");
      this.data.changeMessage(this.message + currenttime.toISOString() + ",Add task." + "\n");
    }
    else {
      alert("Cannot add more tasks!");
    }
  }

  onSelectPipelineTitle(text: string): void {
    this.textToEdit = text;
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": title of " + this.textToEdit + " start to be edited.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",Title of " + this.textToEdit + " start to be edited." + "\n");
  }

  onSelectValue(text: string): void {
    this.valueToEdit = text;
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": properties of " + this.mockTask.taskname + " start to be edited.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",Properties of " + this.mockTask.taskname + " start to be edited." + "\n");
  }

  onConfirmPipelineTitle(): void {
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": title of " + this.textToEdit + " edit completed.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",Title of " + this.textToEdit + " edit completed." + "\n");
    this.textToEdit = "";
  }

  onConfirmEditedValue(): void {
    this.valueToEdit = "";
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": properties of " + this.mockTask.taskname + " edit completed.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",Properties of " + this.mockTask.taskname + " edit completed." + "\n");
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
        //Retrieve
        if (this.taskName == "Retrieve")
        {
          this.tasks.push({
            taskname: this.taskName!,
            property: [
                {name: "Task type", value: "Retrieve"},
                {name: "Task ID", value: "P1Retrieve"},
                {name: "Data source", value: "URL"},
                {name: "Data name", value: "MetainfoRef"},
                {name: "Username", value: "User"},
                {name: "Password", value: "****"},
                {name: "Data Size", value: "100 GB"},
                {name: "Format", value: "CSV"},
                {name: "Input Task", value: "StartPipeline"},
                {name: "Output Task", value: "Select"}
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
                {name: "Task ID", value: "P1Prepare"},
                {name: "#Instance", value: "Auto: 3"},
                {name: "Input Task", value: "P1Slice"},
                {name: "Output Task", value: "P1Store"},
                {name: "Script Address", value: "https://..."},
                {name: "Extra Input Task", value: "P1Store"}
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
                {name: "Task ID", value: "P1Slice"},
                {name: "#Instance", value: "Auto: 3"},
                {name: "Input Task", value: "P1Retrieve"},
                {name: "Output Task", value: "P1Prepare"},
                {name: "Script Address", value: "https://..."},
                {name: "Chunk Size", value: "1000"},
                {name: "Slice Size", value: "100"},
                {name: "#Slices", value: "Auto: reasoning"},
            ]
          });
        }
      }
      let currenttime = new Date();
      //console.log(currenttime.toISOString() + ": task " + this.taskName + " added.");
      this.data.changeMessage(this.message + currenttime.toISOString() + ",Task " + this.taskName + " added." + "\n");
    }
    
    this.taskName = "";
  }

  onShowProperty(task: TaskInterface): void {
    this.mockTask = task;
    this.showPropertyPanel = true;
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": task " + this.mockTask.taskname + " property panel opened.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",Task " + this.mockTask.taskname + " property panel opened." + "\n");
  }

  onClosePropertyPanel(): void {
    this.showPropertyPanel = false;
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": task " + this.mockTask.taskname + " property panel closed.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",Task " + this.mockTask.taskname + " property panel closed." + "\n");
  }

}
