import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { MatSidenavModule} from '@angular/material/sidenav';
import { PipelineComponent } from './pipeline/pipeline.component';

import { MatSelectModule } from '@angular/material/select'
import { DataService } from '../data.service';
import { AddPipelineDialogComponent } from './add-pipeline-dialog/add-pipeline-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    PipelineComponent,
    AddPipelineDialogComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

