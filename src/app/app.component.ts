import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pipeline } from './pipeline_list';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddPipelineDialogComponent } from './add-pipeline-dialog/add-pipeline-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'ML_Pipeline_NEW';
  showFiller = false;

  pipelines: Pipeline[] = [];

  pipelines_num = 0;

  message!: string;
  subscription!: Subscription;

  constructor(public dialog: MatDialog, private data: DataService) { }

  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addPipeline(newItem: string) {
    this.pipelines_num = this.pipelines.length + 1;
    this.pipelines.push({id: this.pipelines_num, name: newItem});
    let currenttime = new Date();
    //console.log(currenttime.toISOString() + ": a new pipeline added.");
    this.data.changeMessage(this.message + currenttime.toISOString() + ",A new pipeline added" + "\n");
  }

  download(filename:string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.message));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  openDialog(): void {
    let currenttime = new Date();
    this.data.changeMessage(this.message + currenttime.toISOString() + ",The user want to create a pipeline" + "\n");

    const dialogRef = this.dialog.open(AddPipelineDialogComponent, {
      width: '400px',
      data: { name: 'Pipeline' + (this.pipelines_num+1).toString() },
      autoFocus: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pipelines_num = this.pipelines.length + 1;
        this.pipelines.push({ id: this.pipelines_num, name: result });
        let currenttime = new Date();
        this.data.changeMessage(this.message + currenttime.toISOString() + ",A new pipeline with the name " + result + " added " + "\n");
      }
      else {
        let currenttime = new Date();
        this.data.changeMessage(this.message + currenttime.toISOString() + ",The user canceled the pipeline creation" + "\n");
      }
    });
  }
}
