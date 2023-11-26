import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from 'src/model/model.class';
import { User } from 'src/model/model.user';
import { Subject } from 'src/model/model.subject';
import { ClassService } from 'src/service/service.class';
import { UserService } from 'src/service/service.user';
import { SubjectService } from 'src/service/service.subject';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss'],
})
export class ClassDetailComponent implements OnInit {
  class: Class | undefined;
  students: User[] | undefined;
  subjects: Subject[] | undefined;

  constructor(
    private classService: ClassService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.getClassDetails();
    this.subjectService.getAllSubjects().subscribe((subject) => {
      this.subjects = subject;
    });
  }

  private getClassDetails(): void {
    const classId: number | undefined = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );

    if (classId) {
      this.classService.getClassById(classId).subscribe((cls) => {
        if (cls) {
          this.class = cls;
          this.getStudentsByClassId(cls.id);
        } else {
          console.error(`Class with ID ${classId} not found`);
        }
      });
    } else {
      console.error('Invalid class ID provided');
    }
  }

  private getStudentsByClassId(classId: number): void {
    this.userService.getStudentsByClassId(classId).subscribe((students) => {
      this.students = students;
    });
  }
}
