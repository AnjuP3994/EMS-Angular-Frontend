import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { UserApiService } from '../modules/users/user-api.service';
import { AdminApiService } from '../services/admin-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName:string = ""; //to hold login user name

  //to hold email and password
  admName:any = "";
  admPswd:any = "";
  adminDetails:any = {};

  usersCount:string = ""; //to hold total user count

  ngOnInit(): void {
    this.getUserCount();
    this.admName = localStorage.getItem("adminName") || "";
    this.admPswd = localStorage.getItem("adminPassword") || "";
    this.adminApi.Authendicate().subscribe((res:any)=>{
      this.adminDetails = res;  //admin details
    })
  }

  selected: Date | null = new Date();

  showSidebar:boolean = true;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {};

  constructor(private api:UserApiService, private adminApi:AdminApiService){
    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
          text: 'Employee Statistics'
      },
      tooltip: {
          valueSuffix: '%'
      },
      subtitle: {
          text:
          'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
      },
      plotOptions: {
          series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                  enabled: true,
                  distance: 20
              }, {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10
                  }
              }]
          }
      },
      credits:{
        enabled: false
      },
      series: [
          {
              name: 'Percentage',
              colorByPoint: true,
              data: [
                  {
                      name: 'Performance',
                      y: 55.02
                  },
                  {
                      name: 'Dedication',
                      sliced: true,
                      selected: true,
                      y: 26.71
                  },
                  {
                      name: 'Working',
                      y: 15.5
                  }
              ]
          }
      ]

    }
    HC_exporting(Highcharts);
  }



  btnClicked(){
    this.showSidebar = !this.showSidebar;
  }


  //total user count
  getUserCount(){
    this.api.getAllUsers().subscribe((res:any)=>{
        console.log(res.length);
        this.usersCount = res.length;
      })
  }


  //Update Employee Details
  updateAdm(){
    this.adminApi.updateAdmin(this.adminDetails).subscribe((admin:any)=>{
      alert("Admin Updated.")
      localStorage.setItem('adminName', admin.name) //login user email set to local storage
      localStorage.setItem('adminPassword', admin.password)
    })
  }


}
