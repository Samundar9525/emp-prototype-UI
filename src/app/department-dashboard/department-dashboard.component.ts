import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-dashboard',
  templateUrl: './department-dashboard.component.html',
  styleUrls: ['./department-dashboard.component.scss']
})
export class DepartmentDashboardComponent {
  data: any[] = [];
  totalemployee = 0;

  constructor(private dashboardService: DashboardService,private router:Router) {
    this.dashboardService.getDeptDashboardData().subscribe(res => {
      this.totalemployee = 0;
      this.data = res.map((item: any) => {
        this.totalemployee += item.total_employees;
        return {
          id: item.dept_no,
          content: item.dept_name,
          count: item.total_employees,
          height: 110,
          width: 150
        };
      });
    });
  }

  cardClicked(ev:any){
    console.log(ev)
    this.router.navigate(['/employee-dashboard'],  { queryParams: { deptNo: ev.id,deptName: ev.content } });
  }
}
