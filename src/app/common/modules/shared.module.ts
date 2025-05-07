import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../components/common/data-table/data-table.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class SharedModule {}
