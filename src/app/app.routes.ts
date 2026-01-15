import { Routes } from '@angular/router';
import { ClienteList } from './features/clientes/components/cliente-list/cliente-list';
import { ClienteForm } from './features/clientes/components/cliente-form/cliente-form';
import { CuentaList } from './features/cuentas/components/cuenta-list/cuenta-list';
import { MovimientoList } from './features/movimientos/components/movimiento-list/movimiento-list';

export const routes: Routes = [
    //{ path: 'clientes', component: ClienteList },
    { path: '', redirectTo: 'clientes', pathMatch: 'full' },
    { path: 'clientes', component: ClienteList },
    { path: 'clientes/nuevo', component: ClienteForm },
    { path: 'clientes/editar/:id', component: ClienteForm },
    //{ path: 'clientes/:id', component: ClienteDetailComponent },
    { path: 'cuentas', component: CuentaList },
    { path: 'movimientos', component: MovimientoList },
];
