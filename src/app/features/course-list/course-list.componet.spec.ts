import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import { CourseService } from '../../core/services/course.service';
import { CourseCardComponent } from '../course-card/course-card.component';
import { SearchComponent } from '../../core/components/search/search.component';
import { FilterComponent } from '../../core/components/filter/filter.component';
import { of } from 'rxjs';

class MockCourseService {
  getFilteredCourses() {
    return of([{
      id: 1,
      name: 'Curso Teste',
      description: 'Descrição do curso',
      category: 'Categoria 1',
      duration: 5,
      image: 'https://example.com/image.jpg',
      lessons: [{
        id: 1,
        title: 'Aula 1',
        duration: 30,
        videoUrl: 'https://example.com/video.mp4'
      }]
    }]);
  }
  setFilters(filters: any) {}
}

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent, CourseCardComponent, SearchComponent, FilterComponent],
      providers: [{ provide: CourseService, useClass: MockCourseService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toBe('Grade de Cursos');
  });

  it('should display courses if authenticated', () => {
    component.isAuthenticated = true;
    fixture.detectChanges();
    const courseCardElements = fixture.nativeElement.querySelectorAll('app-course-card');
    expect(courseCardElements.length).toBeGreaterThan(0);
  });

  it('should call updateSearch when search term changes', () => {
    const updateSearchSpy = jest.spyOn(component, 'updateSearch');
    component.updateSearch('test');
    expect(updateSearchSpy).toHaveBeenCalledWith('test');
  });

  it('should update sorting order when updateSortingOrder is called', () => {
    component.updateSortingOrder('desc');
    expect(component.sortingOrder).toBe('desc');
  });

  it('should update category when updateCategory is called', () => {
    component.updateCategory('category');
    expect(component.filters.category).toBe('category');
  });
});

