
import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { EmployeeForm } from './components/employee-form/employee-form';
import { EmployeeList } from './components/employee-list/employee-list';

export const routes: Routes = [
	{
		path: '',
		component: Layout,
		children: [
			{ path: '', redirectTo: 'empleados', pathMatch: 'full' },
			{ path: 'empleados', component: EmployeeList },
			{ path: 'empleados/nuevo', component: EmployeeForm },
			{ path: 'empleados/editar/:id', component: EmployeeForm }
		]
	}
];
