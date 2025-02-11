import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Course } from '../../core/models/course.model';
import { CourseService } from '../../core/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
  course!: Course | undefined; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(courseId)) {
      this.course = this.courseService.getCourseById(courseId);
      
      if (!this.course) {
        console.error(`Curso com ID ${courseId} não encontrado.`);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
