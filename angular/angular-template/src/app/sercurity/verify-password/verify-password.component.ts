import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../service/authentication.service";
import {AuthGuard} from "../auth.guard";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.css']
})
export class VerifyPasswordComponent implements OnInit {
  formGroup: FormGroup;
  isSuccessful: boolean;
  token: string;
  editPassDate: string;





  constructor(private route: ActivatedRoute,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
            ) {
    this.formGroup = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
      confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
    });
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      this.token = token;
      if (token == null) {
        this.isSuccessful = false;
        // mới thêm
      }else if (!this.authService.isAuthenticated(token)){
        this.toastr.error("Thời hạn đổi mật khẩu của bạn đã hết. Vui lòng thực hiện lại!", "Lỗi: ", {
          timeOut: 7000,
          extendedTimeOut: 1500
        })
        this.isSuccessful = false;
      }  else {
        this.isSuccessful = false;
        this.authService.verifyPassword(token).subscribe(
          data => {
            this.isSuccessful = (data.message === 'accepted');
          },
          err => {
            this.isSuccessful = false;
            this.toastr.error("Đã có lỗi trong quá trình xác thực. Vui lòng thực hiện lại!", "Lỗi: ", {
              timeOut: 7000,
              extendedTimeOut: 1500
            })
          }
        );
      }
    });
  }

  onSubmit() {
    console.log("new pass " + this.formGroup.value.newPassword)
    console.log("re new pass " + this.formGroup.value.confirmNewPassword)
    if(this.formGroup.invalid){
      this.toastr.error("Trường nhập lại mật khẩu và mật khẩu không đúng yêu cầu!", "Lỗi: ", {
        timeOut: 5000,
        extendedTimeOut: 1500
      })
    }

    // mới thêm
    else if (this.formGroup.value.newPassword !== this.formGroup.value.confirmNewPassword){
      this.toastr.error("Trường nhập lại mật khẩu và mật khẩu không giống nhau!", "Lỗi: ", {
        timeOut: 5000,
        extendedTimeOut: 1500
      })
    } else
    {
      this.authService.doResetPassword(this.formGroup.value.newPassword, this.token).subscribe(data => {
        this.toastr.success('Mật khẩu đã được thay đổi!', "Thành công",{
            timeOut: 5000,
            extendedTimeOut: 1500
          });
        this.router.navigate(["/login"])
      },(error) => {
        console.log("editDate ", error.error.message)
        this.editPassDate = error.error.message;
        let lastUsedTime = this.calculateDay(this.editPassDate)

        this.toastr.error('Mật khẩu này đã được sử dụng cách đây ' + lastUsedTime + ". Vui lòng sử dụng mật khẩu khác!", "Thất bại",{
          timeOut: 5000,
          extendedTimeOut: 1500
        })
      })
    }
  }

  calculateDay(d){
    let months = 0, years = 0, days = 0, weeks = 0;
    while(d){
      if(d >= 365){
        years++;
        d -= 365;
      }else if(d >= 30){
        months++;
        d -= 30;
      }else if(d >= 7){
        weeks++;
        d -= 7;
      }else{
        days++;
        d--;
      }
    }

    if (years > 0){
      return years + " năm "
    } else if (months > 0){
      return months + " tháng "
    } else if (weeks > 0 ){
      return weeks + " tuần "
    } else {
      return days + " ngày "
    }
  }

}
