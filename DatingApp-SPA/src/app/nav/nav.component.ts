import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next =>
      this.alertify.success('Logged in successfully'),
      error => {
        this.alertify.error(error);
      },
      () => {
          this.router.navigate(['/members']);
      }
    );
  }

  loggedin() {
    return this.authService.loggedIn();
  }

  loggedout() {
    localStorage.removeItem('token');
    this.model.username = '';
    this.model.password = '';
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }
}
