import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next =>
    this.alertify.success('Logged in successfully'),
    error => { this.alertify.error(error);
    });
  }

  loggedin() {
    return this.authService.loggedin();
  }

  loggedout() {
    localStorage.removeItem('token');
    this.model.username = '';
    this.model.password = '';
    this.alertify.message('Logged out');
  }
}
