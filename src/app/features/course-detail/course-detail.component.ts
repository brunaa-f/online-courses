import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../core/models/course.model';
import { CourseService } from '../../core/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course?: Course;
  sidebarOpen = false;
  selectedLessonIndex: number = 0; 
  selectedLesson?: { title: string; videoUrl: string };
  safeVideoUrl?: SafeResourceUrl; 

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(courseId)) {
      this.course = this.courseService.getCourseById(courseId);
      
      if (!this.course) {
        console.error(`Curso com ID ${courseId} não encontrado.`);
        return;
      }

      this.titleService.setTitle(`${this.course.name} Curso online`);

      if (this.course.lessons?.length) {
        this.selectLesson(this.course.lessons[0], 0);
      }
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  selectLesson(lesson: { title: string; videoUrl: string }, index: number): void {
    this.selectedLesson = lesson;
    this.selectedLessonIndex = index;
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(lesson.videoUrl);
  }

  prevLesson(): void {
    if (this.selectedLessonIndex > 0) {
      this.selectLesson(this.course!.lessons[this.selectedLessonIndex - 1], this.selectedLessonIndex - 1);
    }
  }

  nextLesson(): void {
    if (this.selectedLessonIndex < this.course!.lessons.length - 1) {
      this.selectLesson(this.course!.lessons[this.selectedLessonIndex + 1], this.selectedLessonIndex + 1);
    }
  }
}
