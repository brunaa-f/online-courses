import { Routes } from '@angular/router';
import { CourseListComponent } from './features/course-list/course-list.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

export const routes: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
