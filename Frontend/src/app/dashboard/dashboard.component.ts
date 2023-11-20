import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/model.user';
import { UserService } from 'src/service/service.user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentDay: string = '';
  users: User[] = [];
  selectedUserId: number | null = null;
  selectedUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const currentTime = new Date();
    this.currentDay = currentTime.toLocaleDateString('en-GB', {
      weekday: 'long',
    });

    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.selectUserById(1);
    });
  }

  selectUserById(userId: number) {
    this.selectedUser = this.users.find((user) => user.id === userId)!;
  }
}
