import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../service/employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList = [];

  constructor(private employeeService: EmployeeService, private router: Router){
    employeeService.findAll().subscribe(next => {

      this.employeeList = next;
    });
  }

  ngOnInit(): void {
  }

  detailCustomer(employee: any) {
    this.router.navigate(['/employee', employee.id]);
  }

  updateEmployee(employee: any) {
    this.router.navigate(['/employee/update', employee.id]);
  }
}
