import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserClass } from '../model/UserClass';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  formVal!: FormGroup;
  //Created object of class to post data
  UserModelObj:UserClass = new UserClass();

  UserData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formBuilder: FormBuilder, private api:ApiServiceService) {
    
   }

  ngOnInit(): void {

    this.formVal = this.formBuilder.group({
      name: [''],
      gender: [''],
      aadhar: [''],
      phone: [''],
      address: ['']
    });
    this.getUser();
  }
  postUserDetails(){
    this.UserModelObj.name = this.formVal.value.name;
    this.UserModelObj.gender = this.formVal.value.gender;
    this.UserModelObj.aadhar = this.formVal.value.aadhar;
    this.UserModelObj.phone = this.formVal.value.phone;
    this.UserModelObj.address = this.formVal.value.address;

    this.api.postUser(this.UserModelObj)
    .subscribe(res=>{
      console.log(res);
      // alert("Material Added");
      let cancl = document.getElementById('cancel');
      cancl?.click();
      //Resetting the form
      this.formVal.reset();
      this.getUser();
    },
    err=>{
      alert("Error!");
    }
    )
  }
  clickAddUser(){
    this.formVal.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getUser(){
    this.api.getUser().subscribe(res=>{
      this.UserData = res;

    })
  }
  deleteUser(a:any){
    this.api.deleteUser(a.id).subscribe(res=>{
      
      this.getUser();
    })
  }

  onEdit(a:any){
    
    this.UserModelObj.id = a.id;
    this.formVal.controls['name'].setValue(a.name);
    this.formVal.controls['gender'].setValue(a.gender);
    this.formVal.controls['aadhar'].setValue(a.aadhar);
    this.formVal.controls['phone'].setValue(a.phone);
    this.formVal.controls['address'].setValue(a.address);
  }
  updateUserDetails(){
    this.UserModelObj.name = this.formVal.value.name;
    this.UserModelObj.gender = this.formVal.value.gender;
    this.UserModelObj.aadhar = this.formVal.value.aadhar;
    this.UserModelObj.phone = this.formVal.value.phone;
    this.UserModelObj.address = this.formVal.value.address;

    this.api.updateUser(this.UserModelObj,this.UserModelObj.id)
    .subscribe((res: any)=>{
      // alert("Updated");
      let cancl = document.getElementById('cancel');
      cancl?.click();
      //Resetting the form
      this.formVal.reset();
      this.getUser();
    })

  }

}
