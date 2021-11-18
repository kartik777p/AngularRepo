import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserClass } from '../model/UserClass';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  
  UserModelObj:UserClass = new UserClass();
  formVal!: FormGroup;
  employeeData!:any;
  constructor(private api:ApiServiceService,private formBuilder: FormBuilder) { }

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
  getUser(){
    this.api.getUser().subscribe(res=>{
      this.employeeData  = res;
    })
  }
  showAdd!:boolean;
  showUpdate!:boolean;
  postUserDetails(){
    this.UserModelObj.name = this.formVal.value.name;
    this.UserModelObj.gender = this.formVal.value.gender;
    this.UserModelObj.aadhar = this.formVal.value.aadhar;
    this.UserModelObj.phone = this.formVal.value.phone;
    this.UserModelObj.address = this.formVal.value.address;

    this.api.postUser(this.UserModelObj)
    .subscribe(res=>{
      console.log(res);
      this.formVal.reset();
      this.getUser();
    },
    err=>{
      alert("Error!");
    }
    )
  }
  updateEmployeeDetails(){
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
