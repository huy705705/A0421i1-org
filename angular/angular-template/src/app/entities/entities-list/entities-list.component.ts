import {Component, OnInit} from '@angular/core';
import {EntitiesService} from "../../service/entities.service";
import {Router} from "@angular/router";
import {Entities} from "../../model/entities";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.css']
})
export class EntitiesListComponent implements OnInit {
  entitiesForm: FormGroup;
  private page: number = 0;
  entities2: Array<any>;
  pages: Array<number>;
  entities: any;
  inDate = '';
  emptyMessenger = '';
  cage = '';
  isSubmitted:boolean;

  constructor(private entitiesService: EntitiesService, private router: Router) {
    // this.entitiesService.findAll().subscribe((data) => {
    //   console.log(data);
    //   this.entities = data['content'];
    // });

  }

  ngOnInit(): void {
    this.findAllPageable()
  }

  findAllPageable() {
    this.entitiesService.findAllPageable(this.page).subscribe(
      data => {
        this.entities2 = data['content']
        this.pages = new Array(data['totalPages'])

      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  deleteEntities(id: number) {
    // this.entitiesService.deleteEntitiesById(id).subscribe(()=>{
    //   this.findAllPageable()
    // })
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.findAllPageable();
    this.search();
  }

  updateEntities(entity: any) {

  }

  search() {
    console.log(this.inDate)
    this.entitiesService.searchEntities(this.inDate, this.cage).subscribe(
      data => {
        console.log(data);
        if (data) {
          this.entities2 = data['content']
          this.pages = new Array(data['totalPages'])
          this.isSubmitted=true;
        } else {
          this.isSubmitted=false;
          this.emptyMessenger = 'Không tìm thấy từ khoá';
        }
      }
    );
  }
}
