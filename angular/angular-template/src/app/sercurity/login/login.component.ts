import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../service/authentication.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  accountName: string;
  roles: string[] = [];

  private shareService: ShareService;


  constructor(private formBuild: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private authService: AuthenticationService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {

    this.formGroup = this.formBuild.group({
      accountName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember_account: false
    });


    if (this.tokenStorageService.getUser()) {
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.accountName = this.tokenStorageService.getUser().name;
    }

  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(
      next => {
        if (this.formGroup.value.remember_account === true) {
          this.tokenStorageService.saveUserLocal(next);
          this.tokenStorageService.saveTokenLocal(next.accessToken);
        } else {
          this.tokenStorageService.saveUserSession(next);
          this.tokenStorageService.saveTokenSession(next.accessToken);
        }

        this.authService.isLoggedIn = true;
        this.accountName = this.tokenStorageService.getUser().name;
        this.roles = this.tokenStorageService.getUser().roles;

        this.formGroup.reset();

        // actualRole contains all role of user from token storage
        const actualRole: string [] = [];
        for (let role of this.roles){
          actualRole.push(role['authority']);
        }

        console.log("accountName: "+ this.accountName + " role: " + actualRole )

        // navigate to url depend on which role user log in
        if (actualRole.includes("ROLE_ADMIN")) {
          this.router.navigate(['admin/employee/list']);
          // this.shareService.sendClickEvent();
        }
        else {
          this.router.navigate(['/employee/entities']);
          // this.shareService.sendClickEvent();
        }

        // clear all role in the array for the next log in
        actualRole.length = 0;
      },
      error => {
        this.authService.isLoggedIn = false;
        this.toastr.error("Tên đăng nhập hoặc mật khẩu không đúng", "Đăng nhập thất bại", {
          timeOut: 3000,
          extendedTimeOut: 1500
        });
      }
    );

  }
}
