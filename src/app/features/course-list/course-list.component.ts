import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../core/models/course.model';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-course-list',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  title = "Grade de Cursos";
  isAuthenticated: boolean = true;
  filters = { category: '', search: '' };
  filteredCourses$: Observable<Course[]> = new Observable<Course[]>(); 

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.filteredCourses$ = this.courseService.getFilteredCourses();
  }

  updateFilters() {
    this.courseService.setFilters(this.filters);
  }
}
