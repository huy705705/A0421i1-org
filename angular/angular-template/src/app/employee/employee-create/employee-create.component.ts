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
  employeeIdRendered: string;
  employeeForm: FormGroup;

  validationMessages = {
    employeeName: [
      {type: 'required', message: 'Tên nhân viên không được trống!'},
      {type: 'maxlength', message: 'Tên nhân viên không dài hơn 40 kí tự !'},
      {type: 'minlength', message: 'Tên nhân viên không nhỏ hơn 3 kí tự !'},
      {type: 'pattern', message: 'Tên nhân viên không được chứa ký tự đặc biệt!'}
    ],
    accountName: [
      {type: 'required', message: 'Tên tài khoản không được trống!'},
      {type: 'maxlength', message: 'Tên tài khoản không dài hơn 40 kí tự !'},
      {type: 'minlength', message: 'Tên tài khoản không nhỏ hơn 3 kí tự !'},
      {type: 'pattern', message: 'Tên tài khoản không được chứa ký tự đặc biệt!'}
    ],
    password: [
      {type: 'required', message: 'Mật khẩu không được trống!'},
      {type: 'maxlength', message: 'Mật khẩu khoản không dài hơn 40 kí tự !'},
      {type: 'minlength', message: 'Mật khẩu khoản không nhỏ hơn 3 kí tự !'}
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
    gender: [
      {type: 'required', message: 'Giới tính không được trống!'},
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
        Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$'),
        Validators.maxLength(40)]),
      accountName     : new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)]),
      password        : new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)]),
      birthday        : new FormControl('', [
        Validators.required,
        birthdayValidator()]),
      // avatar         : new FormControl(),
      email           : new FormControl('', [
        Validators.required,
        Validators.email]),
      gender          : new FormControl(Validators.required),
      idCard          : new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{9}$')]),
      address         : new FormControl('', [
        Validators.required,
        Validators.maxLength(40)]),
      isDelete        : new FormControl(),

    });
    this.getEmployeeId();
  }

  createEmployee() {
    console.log(this.employeeForm);
    if (this.employeeForm.invalid) {
      this.toast.error('Vui lòng nhập đúng tất cả các trường', 'Cảnh báo:');
      return;
    }
    this.employeeService.createEmployee(this.employeeForm.value).subscribe(() => {
      this.router.navigate(['/admin/employee']);
      this.toast.success("Thêm mới nhân viên thành công!", "Thành công: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    });
  }

  getEmployeeId() {
    this.employeeService.getEmployeeId().subscribe((data) => {
      console.log(data);
      if(data<10){
        this.employeeIdRendered= "N00"+data;
      }
      else if(data<100) {
        this.employeeIdRendered= "N0"+data;
      }
      else {
        this.employeeIdRendered= "N"+data;
      }
      if(data!=null){
        this.employeeForm.patchValue({
          employeeId:this.employeeIdRendered,
        })
      }
    })
  }

}
