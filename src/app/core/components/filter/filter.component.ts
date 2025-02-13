import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  category: string = '';
  sortingOrder: 'asc' | 'desc' | 'initial' = 'initial';

  @Output() categoryChange = new EventEmitter<string>();
  @Output() sortingChange = new EventEmitter<'asc' | 'desc'>();

  onCategoryChange() {
    this.categoryChange.emit(this.category);
  }

  toggleSortingOrder() {
    if (this.sortingOrder === 'initial') {
      this.sortingOrder = 'desc';
    } else {
      this.sortingOrder = this.sortingOrder === 'asc' ? 'desc' : 'asc';
    }
    
    this.sortingChange.emit(this.sortingOrder);
  }

}
