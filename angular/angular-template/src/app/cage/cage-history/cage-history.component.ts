import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {CageService} from "../../service/cage.service";
import {LogCage} from "../../model/logCage";

@Component({
  selector: 'app-cage-history',
  templateUrl: './cage-history.component.html',
  styleUrls: ['./cage-history.component.css']
})
export class CageHistoryComponent implements OnInit {
  logList: Array<LogCage>;
  isEmpty = true;
  result: string

  constructor(private cageService: CageService, private router: Router,
              public dialogRef: MatDialogRef<CageHistoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    console.log("cageID la: "+data)
    cageService.getEditLog(data).subscribe(next=> {
      console.log("logList: " + next)
      this.logList = next;
      if (this.logList !== null){
        this.isEmpty = false;
      }
    })
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
