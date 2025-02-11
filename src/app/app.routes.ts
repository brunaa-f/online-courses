import { Routes } from '@angular/router';
import { CourseListComponent } from './features/course-list/course-list.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { CourseDetailComponent } from './features/course-detail/course-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: '**', component: NotFoundComponent },
];
