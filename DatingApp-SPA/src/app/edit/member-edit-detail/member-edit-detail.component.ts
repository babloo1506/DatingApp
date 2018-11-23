import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-edit-detail',
  templateUrl: './member-edit-detail.component.html',
  styleUrls: ['./member-edit-detail.component.css']
})
export class MemberEditDetailComponent implements OnInit {
user: User;
  constructor(private route: ActivatedRoute, private alertify: AlertifyService) {
    this.alertify.message('member edit component called');
   }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

  }

}
