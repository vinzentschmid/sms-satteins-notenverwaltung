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

  constructor(private teacherService: TeacherService) {}

  userName = '';

  ngOnInit() {
    const currentTime = new Date();
    this.currentDay = currentTime.toLocaleDateString('en-GB', {
      weekday: 'long',
    });

    this.getUserNameByEmail()
      .then((name) => {
        this.userName = name;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getUserNameByEmail(): Promise<string> {
    const email = localStorage.getItem('email') || '';
    const emailLowerCase = email.toLowerCase();

    return new Promise((resolve, reject) => {
      this.teacherService.getTeachers().subscribe({
        next: (teachers) => {
          const teacher = teachers.find(
            (t) => t.email.trim().toLowerCase() === emailLowerCase
          );

          if (teacher !== undefined) {
            const namePart = email.split('@')[0];
            const name = this.capitalizeFirstLetter(namePart.replace('.', ' '));
            resolve(name);
          } else {
            reject('Lehrer nicht gefunden');
          }
        },
        error: (err) => reject(err),
      });
    });
  }

  capitalizeFirstLetter(string: string): string {
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
