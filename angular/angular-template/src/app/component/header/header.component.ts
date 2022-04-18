import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  role: string;
  isLoggedIn: boolean;

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private shareService : ShareService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    })
  }

  ngOnInit(): void {
    this.loadHeader()
  }

  logOut() {
      this.tokenStorageService.logOut();
      this.router.navigate(['/login']);
      this.ngOnInit();
  }

  private loadHeader():void {
    if (this.tokenStorageService.getUser() !== null) {
      this.username = this.tokenStorageService.getUser().name;
    }
    this.isLoggedIn = (this.username !== null);
  }
}
