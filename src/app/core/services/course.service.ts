import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  private filtersSubject = new BehaviorSubject<{ category: string; search: string; order: 'asc' | 'desc' }>({
    category: '',
    search: '',
    order: 'asc',
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
        description: 'Neste curso você irá aprender a como utilizar o React do zero para o desenvolvimento de aplicações web reativas. Você irá aprender a criar um aplicativo web.',
        category: 'Programação',
        duration: 40,
        image: 'assets/react.webp',
        lessons: [
          { id: 1, title: 'Introdução', description: 'Primeiros passos', duration: 30, videoUrl: 'https://www.youtube.com/embed/j942wKiXFu8?si=GTcp_z6XV-XgbMyW'},
          { id: 2, title: 'Componentes e templates', description: 'Entendendo a estrutura básica', duration: 45, videoUrl: 'https://www.youtube.com/embed/9D1x7-2FmTA?si=tA-mYFPIeMzyc8qK' }
        ]
      },
      {
        id: 2,
        name: 'Angular',
        description: 'Aprenda Angular do básico ao avançado.',
        category: 'Programação',
        duration: 10,
        image: 'assets/angular.webp',
        lessons: [

        ]
      },
      {
        id: 3,
        name: 'UI/UX design',
        description: 'tutorial',
        category: 'Design',
        duration: 30,
        image: 'assets/design.png',
        lessons: [

        ]
      },
      {
        id: 4,
        name: 'Marketing',
        description: 'tutorial',
        category: 'Marketing',
        duration: 20,
        image: 'assets/marketing.png',
        lessons: [
        ]
      },
    ];
    this.coursesSubject.next(courses);
  }

  setFilters(filters: { category: string; search: string; order: 'asc' | 'desc' }) {
    this.filtersSubject.next({ ...this.filtersSubject.getValue(), ...filters });
  }

  setSortingOrder(order: 'asc' | 'desc') {
    const currentFilters = this.filtersSubject.getValue();
    this.setFilters({ ...currentFilters, order });
  }

  getFilteredCourses() {
    return this.getSortedCourses();
  }

  getSortedCourses() {
    return combineLatest([this.courses$, this.filters$]).pipe(
      map(([courses, filters]) => {
        const { category, search, order } = filters;

        const filteredCourses = courses.filter(course =>
          (category === '' || course.category === category) &&
          course.name.toLowerCase().includes(search.toLowerCase())
        );

        return filteredCourses.sort((a, b) => order === 'asc' ? a.duration - b.duration : b.duration - a.duration);
      })
    );
  }

  getCourseById(id: number ): Course | undefined {
    return this.coursesSubject.getValue().find(course => course.id === id);
  }
}