import { Component, OnInit, Input } from '@angular/core';
import { Class } from 'src/model/model.class';
import { ClassService } from 'src/service/service.class';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss'],
})
export class ClassesListComponent implements OnInit {
  @Input() classBackgroundColor = '#FFFFFF';
  @Input() classTextColor = '#FFFFFF';
  @Input() classTextColorYear = '#FFFFFF';

  classes: Class[] = [];
  groupedClasses: { [year: string]: Class[] } = {};

  constructor(private classService: ClassService) {}

  ngOnInit() {
    this.classService.getClasses().subscribe((data) => {
      this.classes = data.map((cls) => ({
        ...cls,
        year: new Date(cls.year), // Convert year string to Date object
      }));
      this.groupedClasses = this.groupClassesByYear(this.classes);
    });
  }

  groupClassesByYear(classList: Class[]): { [year: string]: Class[] } {
    const grouped: { [year: string]: Class[] } = {};

    classList.forEach((cls) => {
      // Extract the year part from the Date object
      const year = cls.year.getFullYear().toString();

      if (!grouped[year]) {
        grouped[year] = [];
      }

      grouped[year].push(cls);
    });

    return grouped;
  }

  get classYears(): string[] {
    return Object.keys(this.groupedClasses);
  }
}
