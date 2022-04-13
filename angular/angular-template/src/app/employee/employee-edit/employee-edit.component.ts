import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {birthdayValidator, checkDuplicateEmail} from "../validate";
import {Employee} from "../../model/employee";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employee: any;
  employeeId;
  employeeForm: FormGroup;
  employeeList: Employee[];

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('employeeId');
      console.log(id);
      // tslint:disable-next-line:no-shadowed-variable
      employeeService.findById(id).subscribe( next => {
        this.employee = next;
        console.log(next);
        this.employeeForm = new FormGroup({
          employeeId      : new FormControl("", [Validators.required]),
          employeeName    : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợở' +
            'ỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$'),
            Validators.maxLength(40)]),
          accountId       : new FormControl(),
          birthday        : new FormControl('', [Validators.required, birthdayValidator()]),
          email           : new FormControl('', [Validators.required]),
          // email           : new FormControl('', [Validators.required, checkDuplicateEmail(this.employeeList, this.employee)]),
          gender          : new FormControl(),
          idCard          : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}$')]),
          address         : new FormControl('', [Validators.required, Validators.maxLength(40)]),

        });
        this.employeeForm.patchValue(this.employee);
      });
    }, error => {

    }, () => {

    });
  }

  ngOnInit(): void {
    // this.employeeForm = this.formBuilder.group({
    //   employeeId      : new FormControl("", [Validators.required]),
    //   employeeName    : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợở' +
    //     'ỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$'),
    //     Validators.maxLength(40)]),
    //   accountId       : new FormControl(),
    //   birthday        : new FormControl('', [Validators.required, birthdayValidator()]),
    //   email           : new FormControl('', [Validators.required]),
    //   // email           : new FormControl('', [Validators.required, checkDuplicateEmail(this.employeeList, this.employee)]),
    //   gender          : new FormControl(),
    //   idCard          : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}$')]),
    //   address         : new FormControl('', [Validators.required, Validators.maxLength(40)]),
    //
    // });
    //
    // this.activatedRoute.paramMap.subscribe((data :ParamMap) => {
    //   this.employeeId = data.get('employeeId');
    //   this.employeeService.findById(this.employeeId).subscribe(data => {
    //     this.employee = data;
    //     this.employeeForm.patchValue(data);
    //   });
    // });
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.employeeForm.value.id, this.employeeForm.value).subscribe((data) => {
      console.log(data);
      this.employee = data['content'];
    });
    this.router.navigate(['/employee']);
  }
}
