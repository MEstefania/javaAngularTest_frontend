import { Routes } from '@angular/router';
import { ClienteList } from './features/clientes/components/cliente-list/cliente-list';
import { ClienteForm } from './features/clientes/components/cliente-form/cliente-form';

export const routes: Routes = [
    //{ path: 'clientes', component: ClienteList },
    { path: '', redirectTo: 'clientes', pathMatch: 'full' },
    { path: 'clientes', component: ClienteList },
    { path: 'clientes/nuevo', component: ClienteForm },
    { path: 'clientes/editar/:id', component: ClienteForm },
    //{ path: 'clientes/:id', component: ClienteDetailComponent },
];
