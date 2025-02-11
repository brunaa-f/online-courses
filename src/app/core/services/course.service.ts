import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {


  private courses: Course[] = [
    {
      id: 1,
      name: 'Curso de Angular',
      description: 'Aprenda Angular do básico ao avançado.',
      category: 'Programação',
      duration: 40,
      image: 'assets/design.png',
      lessons: [
      { id: 1, title: 'Introdução ao Angular', description: 'Primeiros passos com Angular', duration: 30 },
      { id: 2, title: 'Componentes e Diretivas', description: 'Entendendo a estrutura básica do Angular', duration: 45 }
      ]
    },
  ];

  getCourses(): Observable<Course[]> {
    return of(this.courses); 
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }
}