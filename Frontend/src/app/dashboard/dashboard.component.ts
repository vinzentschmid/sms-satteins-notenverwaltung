import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/model/model.teacher';
import { TeacherService } from 'src/service/service.teacher';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentDay = '';

  selectedTeacher: Teacher | undefined;

  constructor(private teacherService: TeacherService) {}

  ngOnInit() {
    const currentTime = new Date();
    this.currentDay = currentTime.toLocaleDateString('en-GB', {
      weekday: 'long',
    });

    this.selectedTeacher = this.teacherService.getTeacherById(1);
  }
}
