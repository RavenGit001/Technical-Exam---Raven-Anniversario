import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { EmployeeForm } from '../employee-form/employee-form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeForm]
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  showForm = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
  this.employeeService.getAll().subscribe({
    next: (data) => {
      this.employees = data;
      if (data.length === 0) {
        console.warn('No employees found in the database.');
      }
    },
    error: (err) => {
      console.error('Error fetching employees:', err);
      alert('Failed to load employees. Check console for details.');
    }
  });
}
  addEmployee(): void {
    this.selectedEmployee = null;
    this.showForm = true;
  }

  editEmployee(emp: Employee): void {
    this.selectedEmployee = { ...emp };
    this.showForm = true;
  }

  deleteEmployee(id?: number): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.delete(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => console.error(err)
      });
    }
  }

  onFormClose(reload: boolean): void {
    this.showForm = false;
    if (reload) this.loadEmployees();
  }
}
