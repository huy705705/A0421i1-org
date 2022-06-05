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
  editDes: string[] = [];

  constructor(private cageService: CageService, private router: Router,
              public dialogRef: MatDialogRef<CageHistoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {

    cageService.getEditLog(data).subscribe((next) => {
      this.logList = next;

      for (let log of this.logList){
        let desArr: string[]=[];
        desArr = log.editedFields.split(";")
        for (let desResult of desArr){
          this.editDes.push(desResult);
        }
      }

    })


  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
