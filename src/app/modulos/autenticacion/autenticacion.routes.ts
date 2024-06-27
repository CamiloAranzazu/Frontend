import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const AUTENTICACION_ROUTES: Routes = [
    {
        path: 'login', component: LoginComponent
    }
];