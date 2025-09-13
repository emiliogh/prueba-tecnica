import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { FamiliaresList } from '../familiares-list/familiares-list';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FamiliaresList],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss'
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  selectedEmpleadoId?: number;
  loading = false;
  searchTerm: string = '';
  get filteredEmployees() {
    return this.employees.filter(e =>
      e.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
      this.employees = data.map(emp => ({ ...emp, showFamiliares: false }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  editEmployee(employee: Employee) {
    this.selectedEmployee = { ...employee };
  }

  deleteEmployee(id: number) {
    if (confirm('¿Seguro que deseas eliminar este empleado?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.getEmployees();
      });
    }
  }
}
