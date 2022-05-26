import { Component } from '@angular/core';
import { Pipeline } from './pipeline_list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ML_Pipeline_NEW';
  showFiller = false;

  pipelines: Pipeline[] = [];

  pipelines_num = 0;

  addPipeline(newItem: string) {
    this.pipelines_num = this.pipelines.length + 1;
    this.pipelines.push({id: this.pipelines_num, name: newItem});
    let currenttime = new Date();
    console.log(currenttime.toISOString() + ": a new pipeline added.");
  }
}
