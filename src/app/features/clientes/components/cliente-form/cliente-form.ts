import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ClienteService } from '../../../../core/services/clienteService';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cliente-form.html',
  styleUrls: ['./cliente-form.css'],
})
export class ClienteForm implements OnInit {
  form!: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  clienteId: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      genero: [''],
      edad: [0, [Validators.min(18)]],
      identificacion: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      direccion: ['', [Validators.minLength(5)]],
      telefono: [''],
      contrasenia: ['', [Validators.required, Validators.minLength(4)]],
      estado: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    // Verificar si es modo edición
    console.log('Parámetros de ruta:', this.route.snapshot.params);
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.clienteId = +params['id'];
        this.isEditMode = true;
        this.cargarCliente(this.clienteId);
      }
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const clienteData = this.form.value;

    this.clienteService.crear(clienteData).subscribe({
      next: (response) => {
        console.log('=== RESPUESTA EXITOSA ===', response);
        this.loading = false;
        alert('Cliente creado correctamente');
        this.form.reset({ estado: true });
        // Navegar de vuelta a la lista (se actualizará automáticamente)
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        console.error('=== ERROR COMPLETO ===', err);
        console.error('Status:', err.status);
        console.error('StatusText:', err.statusText);
        console.error('Error:', err.error);
        console.error('Message:', err.message);

        this.loading = false;

        if (err.status === 0) {
          this.errorMessage = 'No se puede conectar con el servidor. Verifica que el backend esté corriendo.';
        } else {
          this.errorMessage = err.message || 'Error al crear el cliente';
        }

        alert(err.message || 'Error al crear el cliente');
      }
    });
  }

  cargarCliente(id: number): void {
    this.loading = true;
    console.log('Cargando cliente con ID:', id);
    this.clienteService.obtenerPorId(id).subscribe({
      next: (cliente) => {
        this.form.patchValue(cliente);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar cliente:', error);
        this.errorMessage = 'Error al cargar los datos del cliente';
        this.loading = false;
      }
    });
  }

  cancelar() {
    this.router.navigate(['/clientes']);
  }
}