import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/model/model.teacher';
import { User } from 'src/model/model.user';
import { TeacherService } from 'src/service/service.teacher';
import { UserService } from 'src/service/service.user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentDay = '';
  users: User[] = [];
  selectedUser: User | null = null;
  selectedTeacher: Teacher | undefined;

  constructor(
    private userService: UserService,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    const currentTime = new Date();
    this.currentDay = currentTime.toLocaleDateString('en-GB', {
      weekday: 'long',
    });

    this.selectedTeacher = this.teacherService.getTeacherById(1);
  }
}
