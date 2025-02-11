import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../core/models/course.model';
import { Observable } from 'rxjs';
import { CourseCardComponent } from "../course-card/course-card.component";
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-course-list',
  imports: [RouterModule, CommonModule, FormsModule, CourseCardComponent, HeaderComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  title = "Grade de Cursos";
  isAuthenticated: boolean = true;
  filters: { category: string; search: string; order: 'asc' | 'desc' } = { category: '', search: '', order: 'asc' };
  filteredCourses$: Observable<Course[]> = new Observable<Course[]>(); 

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.filteredCourses$ = this.courseService.getFilteredCourses();
  }

  updateFilters() {
    this.courseService.setFilters(this.filters);
  }

  updateSortingOrder(order: 'asc' | 'desc') {
    this.filters.order = order;
    this.courseService.setSortingOrder(order);
  }
}
