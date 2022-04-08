import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../service/authentication.service";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  accountName: string;
  // errorMessage = '';
  roles: string[] = [];


  constructor(private formBuild: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private authService: AuthenticationService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      accountName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.accountName = this.tokenStorageService.getUser().username;
    }
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(
      next => {
        this.tokenStorageService.saveTokenSession(next.accessToken);
        this.tokenStorageService.saveUserLocal(next);

        this.authService.isLoggedIn = true;
        this.accountName = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.formGroup.reset();
        this.router.navigateByUrl("") /* url to homepage*/
      },
      error => {
        // this.errorMessage = error.error().message;
        this.authService.isLoggedIn = false;
        this.toastr.error("Tên đăng nhập hoặc mật khẩu không đúng", "Đăng nhập thất bại", {
          timeOut: 3000,
          extendedTimeOut: 1500
        });
      }
    );

  }
}
