import { Component } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  //user entering data
  email:string="" 
  password:string=""
  
  adminDetails:any = {} //to hold admin details

  constructor (private api:AdminApiService, private router:Router){}

  login(){
    if (this.email=="" || this.password=="") {
      alert("Please fill the form.")
    } else {
      this.api.Authendicate().subscribe({
        next:(res:any)=>{
          const {email,password} = res  //data from the server
          if (email === this.email && password == this.password) {
            alert("Login success")
            console.log(res); //object - {id, name, email, password}
            this.adminDetails = res;
            localStorage.setItem('adminName', this.adminDetails.name) //login user email set to local storage
            localStorage.setItem('adminPassword', this.adminDetails.password)
            this.router.navigateByUrl('dashboard')
          } else {
            alert("Invalid data")
          }
        },
        error:(res:any)=>{
          console.log(res); //error from the server
        }
      })
    }
  }

}
