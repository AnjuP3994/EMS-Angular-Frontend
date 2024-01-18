import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './models/users.models';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  server_url="https://ems-angular-backend-kawb.onrender.com"

  constructor(private http:HttpClient) { }

  //Add a user API call - post - data send to the server (user)
  addUserApi(user:UserModel){
    return this.http.post(`${this.server_url}/users`, user)
  }

  //Get all users API call - get
  getAllUsers(){
    return this.http.get(`${this.server_url}/users`)
  }

  //Delete a user API call - delete
  deleteUserApi(id:any){
    return this.http.delete(`${this.server_url}/users/${id}`)
  }

  //View a user API call - get
  viewAUserApi(id:any){
    return this.http.get(`${this.server_url}/users/${id}`)
  }

  //Edit a user API call - update
  updateUserApi(id:any,user:UserModel){
    return this.http.put(`${this.server_url}/users/${id}`, user)
  }

}
