import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../core/models/course.model';
import { Observable } from 'rxjs';
import { CourseCardComponent } from "../course-card/course-card.component";
import { HeaderComponent } from '../../core/components/header/header.component';
import { SearchComponent } from "../../core/components/search/search.component";
import { FilterComponent } from "../../core/components/filter/filter.component";
import { FooterComponent } from "../../core/components/footer/footer.component";
import { Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-course-list',
  imports: [RouterModule, CommonModule, FormsModule, CourseCardComponent, HeaderComponent, SearchComponent, FilterComponent, FooterComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  title = "Grade de Cursos";
  isAuthenticated: boolean = true;

  filters: { category: string; search: string; order: 'asc' | 'desc' } = { 
    category: '', 
    search: '', 
    order: 'asc' 
  };

  filteredCourses$: Observable<Course[]> = new Observable<Course[]>();
  sortingOrder: 'asc' | 'desc' | 'initial' = 'initial';

  constructor(private courseService: CourseService,
              private titleService: Title
  ) { }

  ngOnInit() {
    this.filteredCourses$ = this.courseService.getFilteredCourses();
    this.titleService.setTitle('Grade de cursos');
  }

  updateFilters() {
    this.courseService.setFilters(this.filters);
  }

  updateSortingOrder(order: 'asc' | 'desc') {
    this.sortingOrder = order;
    this.filters.order = order;
    this.updateFilters();
  }

  updateSearch(searchTerm: string) {
    this.filters.search = searchTerm;
    this.updateFilters();
  }

  updateCategory(category: string) {
    this.filters.category = category;
    this.updateFilters();
  }
}
