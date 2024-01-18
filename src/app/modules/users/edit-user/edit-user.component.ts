import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../user-api.service';
import { UserModel } from '../models/users.models';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user:UserModel = {}

  constructor (private route:ActivatedRoute, private api:UserApiService, private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe(para=>{
      console.log(para);  //object - {id:"1"}
      const {id}=para
      console.log(id);  //1

      //API call to fetch the details of an Id
      this.viewAUser(id)
    })
  }

  viewAUser(id:any){
    this.api.viewAUserApi(id).subscribe((res:any)=>{
      console.log(res);
      this.user = res
    })
  }

  updateAUSer(id:any){
    this.api.updateUserApi(id, this.user).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert("User data updated successfull.")
        this.router.navigateByUrl('/users')
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }


}
