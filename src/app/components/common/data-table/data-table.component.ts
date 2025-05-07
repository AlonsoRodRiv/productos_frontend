import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../../common/modules/shared.module';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  @Input() headers: String[] = [];
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<void>();

  getCellValue(item: any, column: any): string {
    return column.transform
      ? column.transform(item[column.key])
      : item[column.key];
  }
}
