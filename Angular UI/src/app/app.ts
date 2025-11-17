import { Component } from '@angular/core';
import { EmployeeList } from './components/employee-list/employee-list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeList]
})
export class App {}
