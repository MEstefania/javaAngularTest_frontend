import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../../core/services/clienteService';
import { Cliente } from '../../../../models/cliente';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.css',
})
export class ClienteList implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  cargando = false;
  private subscription: Subscription = new Subscription();

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.cargarClientes();
    // Suscribirse a cambios en la lista de clientes
    this.subscription.add(
      this.clienteService.clientes$.subscribe(clientes => {
        this.clientes = clientes;
        console.log('Clientes actualizados:', this.clientes);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.clienteService.obtenerTodos().subscribe({
      next: (data) => {
        this.clientes = data;
        console.log('Clientes cargados:', this.clientes);
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar los clientes', error);
        this.cargando = false;
      }
    });
  }

  eliminarCliente(cliente: Cliente): void {
    const confirmacion = confirm(
      `¿Está seguro de eliminar al cliente "${cliente.nombre}"?\n` +
      `Identificación: ${cliente.identificacion}\n\n` +
      `Esta acción no se puede deshacer.`
    );

    if (!confirmacion) {
      return;
    }

    this.cargando = true;

    this.clienteService.eliminar(cliente.id).subscribe({
      next: (response) => {
        console.log('Cliente eliminado:', response);
        alert(`Cliente "${cliente.nombre}" eliminado correctamente`);
        // Recargar la lista
        this.cargarClientes();
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error al eliminar:', err);
        alert(`Error al eliminar el cliente: ${err.message}`);
      }
    });
  }

  editarCliente(id: string): void {
    console.log('Navegando a editar cliente con ID:', id);
    this.router.navigate(['/clientes/editar', id]);
  }
}
