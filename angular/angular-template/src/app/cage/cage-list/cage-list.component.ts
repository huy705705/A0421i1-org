import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cage-list',
  templateUrl: './cage-list.component.html',
  styleUrls: ['./cage-list.component.css']
})
export class CageListComponent implements OnInit {
  pages: Array<number>;

  constructor() {
    this.pages=[1,2,3];
  }

  ngOnInit(): void {

  }
  setPage(i, event: any) {
    event.preventDefault();

  }
}
