import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  employeeForm: FormGroup;
  hikesData :any;
  timelineData:any = []

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    public router:Router,
    private dashboardService: DashboardService) {
    this.employeeForm = this.fb.group({
      emp_no: [''],
      birth_date: [''],
      first_name: [''],
      last_name: [''],
      gender: [''],
      hire_date: [''],
      dept_name: [''],
      current_salary: [''],
      title: ['']
    });
    this.employeeForm.disable();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const empNo = params.get('empNo');
      if (empNo) {
        this.dashboardService.getEmployeeDetails(empNo).subscribe(res=>{
          this.bindData(res)
        });
        this.dashboardService.getEmployeeDepartment(empNo).subscribe(res=>{
          this.employeeForm.patchValue({
            dept_name:res.department_name
          })
        })
        this.dashboardService.getEmployeeHikesDetails(empNo).subscribe(res=>{
          this.createHikeChart(empNo,res)
        })
        this.dashboardService.getEmployeeTimelineDetails(empNo).subscribe(res=>{
          this.timelineData = res
        })
      }
    });
  }
  onSubmit(): void {
    console.log(this.employeeForm.value);
  }

  bindData(data:any){
    this.employeeForm.patchValue({
      emp_no: data.emp_no,
      birth_date: data.birth_date,
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender,
      hire_date: data.hire_date,
      current_salary: data.current_salary,
      title: data.current_title
    });
  }

  createHikeChart(empNo:any,data:any){
    this.hikesData = {
      id: empNo,
      dataSource:{
        values:[{
          x: data.map((res:any)=>{return res.from_date}),
          y: data.map((res:any)=>{return res.hike_percentage}),
          type: 'bar'
        }],
        layout:{
          height:350,
          autosize:true,
          title: 'Employee Yearly Hikes Details',
          xaxis: {
            range: ['1989-07-01', '2005-12-31'],
            type: 'date'
          },
        },
        config: {responsive: true}
      }
    }
  }

}
