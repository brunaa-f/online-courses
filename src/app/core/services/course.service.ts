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
        "id": 1,
        "name": "React",
        "description": "Domine o React do zero ao avançado e aprenda a construir aplicações web dinâmicas e reativas. Neste curso, você desenvolverá um projeto real, explorando conceitos como componentes, estado, hooks e integração com APIs.",
        "category": "Programação",
        "duration": 40,
        "image": "assets/react.webp",
        "lessons": [
          { "id": 1, "title": "Introdução", "duration": 30, "videoUrl": "https://www.youtube.com/embed/j942wKiXFu8" },
          { "id": 2, "title": "Componentes e Templates", "duration": 45, "videoUrl": "https://www.youtube.com/embed/2MDP0RjEfFs?si=K1hl63wwMVlGvepP" }
        ]
      },
      {
        "id": 2,
        "name": "Angular",
        "description": "Aprenda Angular do básico ao avançado e crie aplicações robustas com este poderoso framework. Explore módulos, diretivas, serviços e o sistema de injeção de dependências.",
        "category": "Programação",
        "duration": 35,
        "image": "assets/angular.webp",
        "lessons": [
          { "id": 1, "title": "Introdução", "duration": 30, "videoUrl": "https://www.youtube.com/embed/j942wKiXFu8" },
          { "id": 2, "title": "Componentes e Templates", "duration": 45, "videoUrl": "https://www.youtube.com/embed/2MDP0RjEfFs?si=K1hl63wwMVlGvepP" }
        ]
      },
      {
        "id": 3,
        "name": "UI/UX Design",
        "description": "Descubra os princípios essenciais do design de interfaces e experiência do usuário. Aprenda a criar layouts intuitivos, acessíveis e visualmente atraentes.",
        "category": "Design",
        "duration": 30,
        "image": "assets/design.png",
        "lessons": [
          { "id": 1, "title": "Introdução", "duration": 30, "videoUrl": "https://www.youtube.com/embed/j942wKiXFu8" },
          { "id": 2, "title": "Componentes e Templates", "duration": 45, "videoUrl": "https://www.youtube.com/embed/2MDP0RjEfFs?si=K1hl63wwMVlGvepP" }
        ]
      },
      {
        "id": 4,
        "name": "Marketing Digital",
        "description": "Domine as estratégias essenciais do marketing digital, incluindo SEO, redes sociais, branding e campanhas de anúncios pagas.",
        "category": "Marketing",
        "duration": 20,
        "image": "assets/marketing.png",
        "lessons": [
          { "id": 1, "title": "Introdução", "duration": 30, "videoUrl": "https://www.youtube.com/embed/j942wKiXFu8" },
          { "id": 2, "title": "Componentes e Templates", "duration": 45, "videoUrl": "https://www.youtube.com/embed/2MDP0RjEfFs?si=K1hl63wwMVlGvepP" }
        ]
      },
      {
        "id": 5,
        "name": "Python",
        "description": "Aprenda os fundamentos da programação com Python. Explore variáveis, estruturas de controle, funções e manipulação de dados.",
        "category": "Programação",
        "duration": 25,
        "image": "assets/py.png",
        "lessons": [
          { "id": 1, "title": "Introdução", "duration": 30, "videoUrl": "https://www.youtube.com/embed/j942wKiXFu8" },
          { "id": 2, "title": "Componentes e Templates", "duration": 45, "videoUrl": "https://www.youtube.com/embed/2MDP0RjEfFs?si=K1hl63wwMVlGvepP" }
        ]
      },
      {
        "id": 6,
        "name": "Java",
        "description": "Construa APIs REST poderosas com Java e Spring Boot. Aprenda sobre MVC, bancos de dados e autenticação.",
        "category": "Programação",
        "duration": 45,
        "image": "assets/java.png",
        "lessons": [
          { "id": 1, "title": "Introdução", "duration": 30, "videoUrl": "https://www.youtube.com/embed/j942wKiXFu8" },
          { "id": 2, "title": "Componentes e Templates", "duration": 45, "videoUrl": "https://www.youtube.com/embed/2MDP0RjEfFs?si=K1hl63wwMVlGvepP" }
        ]
      },
      {
        "id": 7,
        "name": "UX",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus",
        "category": "Design",
        "duration": 50,
        "image": "assets/ux.png",
        "lessons": [
          { "id": 1, "title": "lorem 1", "duration": 30, "videoUrl": "https://www.youtube.com/embed/j942wKiXFu8" },
          { "id": 2, "title": "Lorem 2", "duration": 45, "videoUrl": "https://www.youtube.com/embed/2MDP0RjEfFs?si=K1hl63wwMVlGvepP" }
        ]
      },
      {
        "id": 8,
        "name": "Random",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus",
        "category": "Design",
        "duration": 50,
        "image": "assets/random.png",
        "lessons": [
          { "id": 1, "title": "lorem 1", "duration": 30, "videoUrl": "https://www.youtube.com/embed/j942wKiXFu8" },
          { "id": 2, "title": "Lorem 2", "duration": 45, "videoUrl": "https://www.youtube.com/embed/2MDP0RjEfFs?si=K1hl63wwMVlGvepP" }
        ]
      },
      {
        "id": 9,
        "name": "Random",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus",
        "category": "Design",
        "duration": 50,
        "image": "assets/random.png",
        "lessons": [
          { "id": 1, "title": "lorem 1", "duration": 30, "videoUrl": "https://www.youtube.com/embed/j942wKiXFu8" },
          { "id": 2, "title": "Lorem 2", "duration": 45, "videoUrl": "https://www.youtube.com/embed/2MDP0RjEfFs?si=K1hl63wwMVlGvepP" }
        ]
      },
      {
        "id": 10,
        "name": "Random",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus",
        "category": "Design",
        "duration": 50,
        "image": "assets/random.png",
        "lessons": [
          { "id": 1, "title": "lorem 1", "duration": 30, "videoUrl": "https://www.youtube.com/embed/j942wKiXFu8" },
          { "id": 2, "title": "Lorem 2", "duration": 45, "videoUrl": "https://www.youtube.com/embed/2MDP0RjEfFs?si=K1hl63wwMVlGvepP" }
        ]
      }
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