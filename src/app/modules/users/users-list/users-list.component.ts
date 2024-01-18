import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { UserModel } from '../models/users.models';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  p: number = 1;  //page number starts from 1

  searchUser:string = "";  //To hold the search key value

  adminLoginTime:any = new Date(); //To hold current login time

  allUsers:UserModel[] = [] //to hold user details from the api fetch request

  ngOnInit(): void {
    this.getAllUsers()
  }

  constructor (private api:UserApiService) {}


  //Get the list of users from the server
  getAllUsers(){
    this.api.getAllUsers().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allUsers = res;
      },
      error:(err:any)=>{
        console.log(err); 
      }
    })
  }


  //Delete a user from the server
  deleteAUser(id:any){
    this.api.deleteUserApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert("User deleted successfully.")
        this.getAllUsers()
      },
      error:(err:any)=>{
        console.log(err);  
      }
    })
  }


  //sort users by Id
  sortUsersById(){
    this.allUsers.sort((a:any,b:any)=>a.id-b.id)
  }

  //sort users by Name
  sortUsersByName(){
    this.allUsers.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }


  //to convert pdf
  generatePDF(){
    let pdf = new jsPDF()
    let head = [['id','name','email','password']]
    let body:any = [];
    this.allUsers.forEach((item:any)=>{
      body.push([item.id, item.name, item.email, item.password])
    })
    pdf.text("AllUsersList",10,10)
    autoTable(pdf,{head,body})
    pdf.output("dataurlnewwindow")
    pdf.save("alluserslist.pdf")
  }


}



