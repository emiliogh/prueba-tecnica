import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FamiliarService } from '../../services/familiar.service';
import { Familiar } from '../../models/familiar.model';

@Component({
  selector: 'app-familiares-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './familiares-form.html'
})
export class FamiliaresForm {
  @Input() idEmpleado!: number;
  @Output() familiarAgregado = new EventEmitter<void>();
  familiarForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private familiarService: FamiliarService) {
    this.familiarForm = this.fb.group({
      nombre_familiar: ['', [Validators.required, Validators.maxLength(100)]],
      parentesco: ['', [Validators.required, Validators.maxLength(50)]],
      fecha_nacimiento: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.familiarForm.invalid) {
      this.familiarForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const data: Familiar = {
      ...this.familiarForm.value,
      id_empleado: this.idEmpleado
    };
    this.familiarService.addFamiliar(data).subscribe({
      next: () => {
        this.familiarForm.reset();
        this.loading = false;
        this.familiarAgregado.emit();
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'No se pudo agregar el familiar.';
      }
    });
  }

  get nombre_familiar() { return this.familiarForm.get('nombre_familiar'); }
  get parentesco() { return this.familiarForm.get('parentesco'); }
  get fecha_nacimiento() { return this.familiarForm.get('fecha_nacimiento'); }
}
