import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
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
  right= true;
  result: any[]
  constructor(private cageService: CageService, private router: Router,
              public dialogRef: MatDialogRef<CageHistoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {

    cageService.getEditLog(data).subscribe((next) => {
      console.log("logList: " + next)
      this.logList = next;
      if (next !== null){
        for (let i =0; i < next[i].length; i++) {
          this.result.push(next[i].editedFields)
        }
      }
    })

    console.log(this.result)
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
