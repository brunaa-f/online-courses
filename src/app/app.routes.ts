import { Routes } from '@angular/router';
import { CourseListComponent } from './features/course-list/course-list.component';

export const routes: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' } 
];
