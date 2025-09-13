import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamiliarService } from '../../services/familiar.service';
import { Familiar } from '../../models/familiar.model';
import { FamiliaresForm } from './familiares-form';

@Component({
  selector: 'app-familiares-list',
  standalone: true,
  imports: [CommonModule, FamiliaresForm],
  templateUrl: './familiares-list.html',
  styleUrl: './familiares-list.scss'
})
export class FamiliaresList implements OnInit {
  @Input() idEmpleado!: number;
  familiares: Familiar[] = [];
  loading = false;
  errorMsg = '';

  constructor(private familiarService: FamiliarService) {}

  ngOnInit() {
    if (this.idEmpleado) {
      this.cargarFamiliares();
    }
  }

  cargarFamiliares() {
    this.loading = true;
    this.familiarService.getFamiliaresByEmpleado(this.idEmpleado).subscribe({
      next: (data) => {
        this.familiares = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'No se pudieron cargar los familiares.';
      }
    });
  }

  eliminarFamiliar(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este familiar?')) return;
    this.familiarService.deleteFamiliar(id).subscribe({
      next: () => this.cargarFamiliares(),
      error: () => alert('No se pudo eliminar el familiar.')
    });
  }
}
