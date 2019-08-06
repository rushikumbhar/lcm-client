import { ToastrService } from 'ngx-toastr';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails;
  lcmHistory;
  lcm;

  constructor(private router: Router, private service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );

    this.service.getLcmHistory().subscribe(
      res => {
        this.lcmHistory = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onCalculate(nums) {
    const x = nums.replace(' ', '');
    const arr = x.split(',');
    this.service.calculateLcm(arr).subscribe(
      (res: any) => {
        this.lcm = res;
      },
      err => {
        if (err.status === 400) {
          this.toastr.error('Enter values seperated by comma', 'Invalid Input');
          this.lcm = '';
        } else {
          console.log(err);
        }
      }
    );
  }

}
