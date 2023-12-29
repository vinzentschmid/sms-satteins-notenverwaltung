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

    const teacherId = 1; // Die ID des Lehrers, den Sie abrufen möchten
    this.teacherService.getTeacherById(teacherId).subscribe(
      (data) => {
        this.selectedTeacher = data; // Zuweisung innerhalb von subscribe
      },
      (error) => {
        console.error('Fehler beim Laden des Lehrers', error);
      }
    );
  }
}
