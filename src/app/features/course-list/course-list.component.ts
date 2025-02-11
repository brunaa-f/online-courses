import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../core/models/course.model';

@Component({
  standalone: true,
  selector: 'app-course-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  title = "Grade de Cursos"
  isAuthenticated: boolean = true; 
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery: string = '';


  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.filteredCourses = data;
      console.log(this.courses)
    });
  }

  searchCourses(): void {
    this.filteredCourses = this.courses.filter(course =>
      course.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
