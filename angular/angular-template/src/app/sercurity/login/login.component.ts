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
  actualRole: string [] = [];
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
    // this.formGroup = new FormGroup({
    //   accountName: new FormControl('', [Validators.required]),
    //   password: new FormControl('', [Validators.required]),
    // })

    this.formGroup = this.formBuild.group({
      accountName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember_account: false
    });


    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.accountName = this.tokenStorageService.getUser().name;
    }
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(
      next => {
        // this.tokenStorageService.saveTokenSession(next.accessToken);
        // this.tokenStorageService.saveUserLocal(next);

        if (this.formGroup.value.remember_account === true) {
          this.tokenStorageService.saveTokenLocal(next.accessToken);
          this.tokenStorageService.saveUserLocal(next);
        } else {
          this.tokenStorageService.saveTokenSession(next.accessToken);
          this.tokenStorageService.saveUserSession(next);
        }

        this.authService.isLoggedIn = true;
        this.accountName = this.tokenStorageService.getUser().name;
        this.roles = this.tokenStorageService.getUser().roles;
        this.formGroup.reset();


        for (let role of this.roles){
          this.actualRole.push(role['authority']);
        }


        // navigate to url depend on which role user log in
        if (this.actualRole.indexOf("ROLE_EMPLOYEE") !== -1) {
          this.router.navigate(['/employee/entities']);
          // this.shareService.sendClickEvent();
        }
        // else {
        //   this.router.navigate(['admin/employee/list']);
        //   this.shareService.sendClickEvent();
        // }

        // this.router.navigateByUrl("") /* url to homepage*/
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
