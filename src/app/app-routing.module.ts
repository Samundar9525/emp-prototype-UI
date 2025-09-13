import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { DepartmentDashboardComponent } from './department-dashboard/department-dashboard.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'department-dashboard', pathMatch: 'full' },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'department-dashboard', component: DepartmentDashboardComponent },
  { path: 'employee-details', component: EmployeeDetailComponent },
  { path: '**', redirectTo: 'department-dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
