import { Component, Input } from '@angular/core';
import { Course } from '../../core/models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent {
  @Input() course!: Course; 

  constructor(private router: Router) {}

  navigateToDetail(): void {
    this.router.navigate(['/courses', this.course.id]);
  }
}
