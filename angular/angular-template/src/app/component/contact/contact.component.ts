import { Component, OnInit } from '@angular/core';
import {ContactService} from "../../service/contact.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup} from "@angular/forms";
import {Province} from "../../model/category/province";
import {District} from "../../model/category/district";
import {Ward} from "../../model/category/ward";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm : FormGroup;
  provinceList : Province[];
  districtList : District[];
  wardlList : Ward[];

  constructor(private contactService: ContactService, private route : Router, private  toast : ToastrService) {
    this.contactService.getProvinceList().subscribe(data=>{
      this.provinceList=data;
      this.contactForm=new FormGroup({
        fullName : new FormControl(""),
        address : new FormControl(""),
        phone : new FormControl(""),
        email : new FormControl(""),
        message : new FormControl(""),
        province : new FormControl(""),
        district : new FormControl(""),
        ward : new FormControl("")
      })
    })

  }

  ngOnInit(): void {
  }
  getDistrict(){
    this.contactService.getDistrictList(this.contactForm.value.province).subscribe((data)=>{
      this.districtList=data;
    })
  }
  getWard(){
    this.contactService.getWardList(this.contactForm.value.district).subscribe((data)=>{
      this.wardlList=data;
    })
  }

}
