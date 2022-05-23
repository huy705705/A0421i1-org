import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../service/employee.service";
import {ToastrService} from "ngx-toastr";
import {IEmployeeDTO} from "../../model/IEmployeeDTO";
import {birthdayValidator} from "../validate";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  selectedImage: any = null;
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
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      employeeId      : new FormControl('', [Validators.required]),
      employeeName    : new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝýỶỸửữựỵ ỷỹ]*$'),
        Validators.maxLength(40)]),
      accountName     : new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)]),
      password        : new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)]),
      birthday        : new FormControl('', [
        Validators.required,
        birthdayValidator()]),
      avatar         : new FormControl(Validators.required),
      email           : new FormControl('', [
        Validators.required,
        Validators.email]),
      gender          : new FormControl(Validators.required),
      idCard          : new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{9}$')]),
      address         : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$'),
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
    console.log("save(): ")
    console.log(this.employeeForm.value)
    // upload image to firebase
    // const nameImg = this.getCurrentDateTime();
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    console.log("nameImg " + nameImg)
    console.log("fileRef " + fileRef)

    console.log(fileRef)

    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {

          this.employeeForm.patchValue({avatar: url});

          // Call API to create notification
          this.employeeService.createEmployee(this.employeeForm.value).subscribe(() => {
            this.router.navigate(['/admin/employee']);
            this.toast.success("Thêm mới nhân viên thành công!", "Thành công: ", {
              timeOut: 4000,
              extendedTimeOut: 1000
            })
          }, error => {
            this.toast.error("Tài khoản đã được sử dụng!","Thất bại: ",{
              timeOut: 4000,
              extendedTimeOut: 1000
            })
          })
        });
      })
    ).subscribe();
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

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    // if (event.target.files) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(event.target.files[0]);
    //   reader.onload = (event: any) => {
    //     this.selectedImage = event.target.result;
    //   };
    // }
    // console.log(this.selectedImage);
  }

}


