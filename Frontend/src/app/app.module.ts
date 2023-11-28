import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomInputFieldComponent } from './custom-input-field/custom-input-field.component';
import { LoginComponent } from './login/login.component';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes/classes.component';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { ProfileComponent } from './profile/profile.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    CustomInputFieldComponent,
    LoginComponent,
    DashboardComponent,
    ClassesListComponent,
    ClassesComponent,
    ProfileComponent,
    ClassDetailComponent,
    AddAssignmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    NgSelectModule,
    FormsModule,
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
