import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EmployeeForm implements OnInit {
  employeeForm: FormGroup;
  isEdit = false;
  employeeId?: number;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email]],
      cargo: ['', [Validators.required, Validators.maxLength(50)]],
      fecha_ingreso: ['', [Validators.required]]
    });
  }

  get fecha_ingreso() {
    return this.employeeForm.get('fecha_ingreso');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.employeeId = +id;
        this.loading = true;
        this.employeeService.getEmployees().subscribe({
          next: (employees) => {
            const emp = employees.find(e => e.id === this.employeeId);
            if (emp) {
              this.employeeForm.patchValue(emp);
            }
            this.loading = false;
          },
          error: () => {
            this.loading = false;
            this.errorMsg = 'No se pudo cargar el empleado.';
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const data = this.employeeForm.value;
    if (this.isEdit && this.employeeId) {
      this.employeeService.updateEmployee({ ...data, id: this.employeeId }).subscribe({
        next: () => this.router.navigate(['/empleados']),
        error: () => {
          this.loading = false;
          this.errorMsg = 'No se pudo actualizar el empleado.';
        }
      });
    } else {
      this.employeeService.addEmployee(data).subscribe({
        next: () => this.router.navigate(['/empleados']),
        error: () => {
          this.loading = false;
          this.errorMsg = 'No se pudo crear el empleado.';
        }
      });
    }
  }

  get nombre() { return this.employeeForm.get('nombre'); }
  get correo() { return this.employeeForm.get('correo'); }
  get cargo() { return this.employeeForm.get('cargo'); }
}
