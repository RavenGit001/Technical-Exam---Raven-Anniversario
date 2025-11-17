import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EmployeeForm {
  @Input() employee: Employee | null = null;
  @Output() formClose = new EventEmitter<boolean>();

  formEmployee: Employee = { firstName: '', lastName: '', department: '', position: '', salary: 0 };
  showDeleteConfirm: boolean = false; // New property for delete confirmation modal

  constructor(private employeeService: EmployeeService) {}

  ngOnChanges(): void {
    this.formEmployee = this.employee ? { ...this.employee } : { firstName: '', lastName: '', department: '', position: '', salary: 0 };
  }

  save(form: NgForm): void {
    if (!this.formEmployee.firstName || !this.formEmployee.lastName) {
      alert('First Name and Last Name are required');
      return;
    }

    if (this.employee?.id) {
      // Update existing employee
      this.employeeService.update(this.employee.id, this.formEmployee).subscribe({
        next: () => this.formClose.emit(true),
        error: (err) => console.error(err)
      });
    } else {
      // Create new employee
      this.employeeService.create(this.formEmployee).subscribe({
        next: () => this.formClose.emit(true),
        error: (err) => console.error(err)
      });
    }
  }

  // Trigger the delete confirmation modal
  delete(): void {
    this.showDeleteConfirm = true;
  }

  // Confirm deletion
  confirmDelete(): void {
    if (!this.employee?.id) return;
    this.employeeService.delete(this.employee.id).subscribe({
      next: () => {
        this.showDeleteConfirm = false;
        this.formClose.emit(true);
      },
      error: (err) => console.error(err)
    });
  }

  // Cancel deletion
  cancelDelete(): void {
    this.showDeleteConfirm = false;
  }

  cancel(): void {
    this.formClose.emit(false);
  }
}
