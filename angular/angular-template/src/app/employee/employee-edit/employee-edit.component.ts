import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {ToastrService} from "ngx-toastr";
import {IEmployeeDTO} from "../../model/IEmployeeDTO";
import {checkBirthDay} from "../../validator/checkBirthDay";
import {checkPassword} from "../../validator/check-password";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employee: IEmployeeDTO;
  employeeId;
  employeeForm: FormGroup;
  currentPass: string;
  changePass: boolean = true;
  ref: TemplateRef<any>;

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
              private toast : ToastrService,
              private dialog: MatDialog,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe(next => {
      this.employeeId = next.get('employeeId');
      console.log(this.employeeId);
      console.log("messsageArray:" + this.validationMessages);
      // tslint:disable-next-line:no-shadowed-variable
      employeeService.findById(this.employeeId).subscribe( next => {
        this.employee = next;
        this.currentPass = this.employee.password;
        console.log(this.currentPass);
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
            Validators.minLength(3)]),
          confirmPassword : new FormControl('', [Validators.required]),
          birthday        : new FormControl('', [
            Validators.required,
            checkBirthDay]),
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
          avatar          : new FormControl(Validators.required),
          isDelete        : new FormControl(),
        },{validators: checkPassword});
        this.employeeForm.patchValue(this.employee);
        this.cancelChange();
        console.log(this.employeeForm.value.password);
      });
    }, error => {

    }, () => {

    });
  }

  openDialogWithRef(ref) {
    this.dialog.open(ref);
  }

  changePassWord() {
    this.changePass = true;
  }

  cancelChange() {
    this.changePass = false;
  }

  ngOnInit(): void {
  }

  confirmChange() {
    if (this.currentPass == this.employeeForm.value.password){
      this.toast.warning("Trùng khớp với mật khẩu cũ, vui lòng nhập mật khẩu mới!", "Cảnh báo: ");
      return;
    } else {
      this.toast.success("Mật khẩu thoả mãn yêu cầu!", "Thành công: ", {
        timeOut: 4000,
        extendedTimeOut: 1000
      })
    }
  }

  updateEmployee() {
    if (this.changePass == true && this.currentPass == this.employeeForm.value.password){
      this.toast.warning("Trùng khớp với mật khẩu cũ, vui lòng nhập mật khẩu mới!", "Cảnh báo: ");
      return;
    }
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

  selectedImage: any = null;
  loading = false;

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.loading = true;
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.employeeForm.patchValue({image: url});
          this.loading = false;
          this.employee.avatar = url;

          // Call API

        });
      })
    ).subscribe();
  }
}
