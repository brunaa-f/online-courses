import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseDetailComponent } from './course-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

const mockCourse = {
    id: 1,
    name: "React",
    category: "Programação",
    description: "Domine o React do zero ao avançado e aprenda a construir aplicações web dinâmicas e reativas. Neste curso, você desenvolverá um projeto real, explorando conceitos como componentes, estado, hooks e integração com APIs.",
    duration: 40,
    image: "assets/react.webp",
    lessons: [
        {
            id: 1,
            title: "Introdução",
            duration: 30,
            videoUrl: "https://www.youtube.com/embed/j942wKiXFu8",
        },
        {
            id: 2,
            title: "Componentes e Templates",
            duration: 45,
            videoUrl: "https://www.youtube.com/embed/2MDP0RjEfFs?si=K1hl63wwMVlGvepP",
        },
    ],
};

describe('CourseDetailComponent', () => {
    let component: CourseDetailComponent;
    let fixture: ComponentFixture<CourseDetailComponent>;
    let titleServiceMock: any;

    beforeEach(async () => {
        titleServiceMock = { setTitle: jest.fn() };

        await TestBed.configureTestingModule({
            imports: [CourseDetailComponent], 
            providers: [
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
                { provide: Title, useValue: titleServiceMock },


            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CourseDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load course details on init', () => {
        expect(component.course).toEqual(mockCourse);
        expect(titleServiceMock.setTitle).toHaveBeenCalledWith('React - Curso Online');
        expect(component.selectedLesson).toEqual(mockCourse.lessons[0]);
    });

    it('should toggle sidebar visibility', () => {
        expect(component.sidebarOpen).toBeFalsy();
        component.toggleSidebar();
        expect(component.sidebarOpen).toBeTruthy();
        component.toggleSidebar();
        expect(component.sidebarOpen).toBeFalsy();
    });

    it('should navigate to the next lesson', () => {
        component.nextLesson();
        expect(component.selectedLessonIndex).toBe(1);
        expect(component.selectedLesson).toEqual(mockCourse.lessons[1]);
    });

    it('should navigate to the previous lesson', () => {
        component.selectLesson(mockCourse.lessons[1], 1);
        component.prevLesson();
        expect(component.selectedLessonIndex).toBe(0);
        expect(component.selectedLesson).toEqual(mockCourse.lessons[0]);
    });
});
