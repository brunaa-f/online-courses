import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { BehaviorSubject, map } from 'rxjs';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  private filtersSubject = new BehaviorSubject<{ category: string; search: string }>({
    category: '',
    search: ''
  });
  filters$ = this.filtersSubject.asObservable();

  constructor() {
    this.loadCourses();
  }

  private loadCourses() {
    const courses: Course[] = [
      {
        id: 1,
        name: 'React',
        description: 'Aprenda ',
        category: 'Programação',
        duration: 40,
        image: 'assets/b.webp',
        lessons: [
        { id: 1, title: 'Introdução ao react', description: 'Primeiros passos', duration: 30 },
        { id: 2, title: 'Redux', description: 'Entendendo a estrutura básica', duration: 45 }
        ]
      },
      {
        id: 2,
        name: 'Curso de Angular',
        description: 'Aprenda Angular do básico ao avançado.',
        category: 'Programação',
        duration: 40,
        image: 'assets/a.webp',
        lessons: [
        { id: 1, title: 'Introdução ao angular', description: 'Primeiros passos com Angular', duration: 30 },
        { id: 2, title: 'Componentes e Diretivas', description: 'Entendendo a estrutura básica do Angular', duration: 45 }
        ]
      },
    ];
    this.coursesSubject.next(courses);
  }

  setFilters(filters: { category: string; search: string }) {
    this.filtersSubject.next(filters);
  }

  getFilteredCourses() {
    return combineLatest([this.courses$, this.filters$]).pipe(
      map(([courses, filters]) => {
        const { category, search } = filters;
        return courses.filter(
          (course) =>
            (category === '' || course.category === category) && 
            course.name.toLowerCase().includes(search.toLowerCase()) 
        );
      })
    );
  }
}