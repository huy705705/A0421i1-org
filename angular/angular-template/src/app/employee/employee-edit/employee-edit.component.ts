import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employee: any;
  employeeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private employeeService: EmployeeService, private router: Router) {
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('employeeId');
      // tslint:disable-next-line:no-shadowed-variable
      employeeService.findById(Number(id)).subscribe( next => {
        this.employee = next;
        console.log(next);
        this.employeeForm = new FormGroup({
          employeeId      : new FormControl(this.employee.employeeId, [Validators.required]),
          employeeName    : new FormControl(this.employee.name, [Validators.required, Validators.minLength(10)]),
          accountId       : new FormControl(this.employee.accountId),
          birthday        : new FormControl(this.employee.birthday),
          email           : new FormControl(this.employee.email),
          gender          : new FormControl(this.employee.gender),
          idCard          : new FormControl(this.employee.idCard),
          address         : new FormControl(this.employee.phone),

        });
      });
    }, error => {

    }, () => {

    });
  }

  ngOnInit(): void {
  }

  updateEmployee() {
    this.employeeService.updateCustomer(this.employeeForm.value.id, this.employeeForm.value).subscribe();
    this.router.navigate(['/employee']);
  }
}
