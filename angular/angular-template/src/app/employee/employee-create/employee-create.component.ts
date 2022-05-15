import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../service/employee.service";
import {ToastrService} from "ngx-toastr";
import {IEmployeeDTO} from "../../model/IEmployeeDTO";
import {birthdayValidator} from "../validate";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  employee: IEmployeeDTO;
  employeeId: string;
  employeeForm: FormGroup;

  validationMessages = {
    employeeName: [
      {type: 'required', message: 'Tên nhân viên không được trống!'},
      {type: 'maxlength', message: 'Tên nhân viên không dài hơn 40 kí tự !'},
      {type: 'minlength', message: 'Tên nhân viên không nhỏ hơn 3 kí tự !'},
      {type: 'pattern', message: 'Tên nhân viên không được chứa ký tự đặc biệt!'}
    ],
    birthday: [
      {type: 'required', message: 'Ngày sinh không được trống!'}

    ],
    email: [
      {type: 'required', message: 'Email không được trống!'},
      {type: 'email', message: 'Email chưa đúng dịnh dạng!'}
    ],
    idCard: [
      {type: 'required', message: 'CMND không được trống!'},
      {type: 'pattern', message: 'CMND phải là 9 số!'}
    ],
    address: [
      {type: 'required', message: 'Địa chỉ không được trống!'},
      {type: 'maxlength', message: 'Địa chỉ không dài hơn 40 kí tự !'}
    ],

  }

  genderList = [
    {
      id:1,
      name:'gender',
      value:'nam',
      label:'nam'
    },{
      id:2,
      name:'gender',
      value:'nữ',
      label:'nữ'
    },{
      id:3,
      name:'gender',
      value:'khác',
      label:'khác'
    }
  ]
  constructor(private activatedRoute: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router,
              private toast : ToastrService) {
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      employeeId      : new FormControl('', [Validators.required]),
      employeeName    : new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợở' +
          'ỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$'),
        Validators.maxLength(40)]),
      accountId       : new FormControl(),
      accountName     : new FormControl(),
      password        : new FormControl(),
      birthday        : new FormControl('', [
        Validators.required,
        birthdayValidator()]),
      // avatar         : new FormControl(),
      email           : new FormControl('', [
        Validators.required,
        Validators.email]),
      gender          : new FormControl(),
      idCard          : new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{9}$')]),
      address         : new FormControl('', [
        Validators.required,
        Validators.maxLength(40)]),
      isDelete        : new FormControl(),
    });
  }

  createEmployee() {
    console.log(this.employeeForm);
    // if (this.employeeForm.invalid) {
    //   this.toast.error('Vui lòng nhập đúng tất cả các trường', 'Cảnh báo:');
    //   return;
    // }
    this.employeeService.createEmployee(this.employeeForm.value).subscribe(() => {
      this.router.navigate(['/admin/employee']);
      this.toast.success("Thêm mới nhân viên thành công!", "Thành công: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    });
  }

}
