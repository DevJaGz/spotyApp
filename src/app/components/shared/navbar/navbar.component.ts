import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  user: IUser = {} as IUser;
  constructor(private _serviceAuth: AuthService, private _router: Router) {
    this.user = _serviceAuth.user;
  }

  ngOnInit(): void {

  }


  logout() {
    this._serviceAuth.logout().then(() => {
      this._router.navigate(['user'])
    });
  }
}
