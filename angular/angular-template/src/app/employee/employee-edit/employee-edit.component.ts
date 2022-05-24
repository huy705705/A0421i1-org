import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {ToastrService} from "ngx-toastr";
import {IEmployeeDTO} from "../../model/IEmployeeDTO";
import {checkBirthDay} from "../../validator/checkBirthDay";
import {checkPassword} from "../../validator/check-password";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employee: IEmployeeDTO;
  employeeId;
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
    confirmPassword: [
      {type: 'required', message: 'Xác nhận mật khẩu không được trống!'},
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
      {type: 'pattern', message: 'Địa chỉ không được chứa ký tự đặc biệt!'},
      {type: 'required', message: 'Địa chỉ không được trống!'},
      {type: 'maxlength', message: 'Địa chỉ không dài hơn 40 kí tự !'}
    ],
    avatar: [
      {type: 'required', message: 'Ảnh nhân viên không được trống!'},
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

    this.activatedRoute.paramMap.subscribe(next => {
      this.employeeId = next.get('employeeId');
      console.log(this.employeeId);
      console.log("messsageArray:" + this.validationMessages);
      // tslint:disable-next-line:no-shadowed-variable
      employeeService.findById(this.employeeId).subscribe( next => {
        this.employee = next;
        console.log(this.employee);
        this.employeeForm = new FormGroup({
          employeeId      : new FormControl({value: '', disabled: true}, [Validators.required]),
          employeeName    : new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$'),
            Validators.maxLength(40)]),
          accountId       : new FormControl(),
          accountName     : new FormControl({value: '', disabled: true}, [
            Validators.required,
            // Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"),
            Validators.minLength(3),
            Validators.maxLength(10)]),
          password        : new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10)]),
          confirmPassword : new FormControl('', [Validators.required]),
          birthday        : new FormControl('', [
            Validators.required,
            checkBirthDay]),
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
            Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝýỶỸửữựỵ ỷỹ]*$'),
            Validators.maxLength(40)]),
          isDelete        : new FormControl(),
        },{validators: checkPassword});
        this.employeeForm.patchValue(this.employee);
      });
    }, error => {

    }, () => {

    });
  }

  ngOnInit(): void {
  }

  updateEmployee() {
    console.log(this.employeeForm);
    if (this.employeeForm.invalid) {
      this.toast.error('Vui lòng nhập đúng tất cả các trường', 'Cảnh báo:');
      return;
    }
    this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe(() => {
      this.router.navigate(['/admin/employee']);
      this.toast.success("Cập nhật nhân viên thành công!", "Thành công: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    });
  }
}
