import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http'



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styles: [
  ]
})
export class UserLoginComponent implements OnInit {

  loginForm = new FormGroup({});
  showPassword = false;
  isInRequest = false;
  errorMessage = "";

  private emailPattern = /\S+@\S+\.\S+/;


  constructor(
    private _fb: FormBuilder,
    private _serviceAuth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  controlIsValid(controlName: string): boolean {
    return this.loginForm.get(controlName)!.invalid && this.loginForm.get(controlName)!.touched
  }

  loginGoogle(): void {
    this._serviceAuth.loginGoogle()
      .then((res) => {
        console.log(res);
        this.saveSpotifyToken()
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onSubmit(): void {
    this.errorMessage = "";
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.sendFormValues();
  }

  sendFormValues() {
    this.isInRequest = true;
    const { email, password } = this.loginForm.value;

    this._serviceAuth.loginEmailPass(email, password)
      .then((res) => {
        console.log(res);
        this.saveSpotifyToken()
      })
      .catch((error) => {
        console.log(error);
        this.isInRequest = false;
        this.errorMessage = `CODE: ${error.code} MESSAGE: ${error.message}`
      })

  }

  saveSpotifyToken() {
    this._serviceAuth.getSpotifyToken$().subscribe({
      next: (res) => {
        if (res && res.access_token && res.access_token !== "") {
          this._serviceAuth.saveSessionStorage('token', res.access_token);
          this.navigateTo('home')
        } else {
          this.errorInSpotifyToken()
          this.errorMessage = `Lo sentimos, no se obtuvo el token por parte de spotity.`
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorInSpotifyToken()
        this.errorMessage = `CODE: ${error.status} MESSAGE: ${error.message}`
      },
      complete: () => {
        console.log("Completed saveSpotifyToken");
      }
    })
  }

  errorInSpotifyToken() {
    this.isInRequest = false;
    this._serviceAuth.logout();
  }

  navigateTo(path: string): void {
    this.router.navigate([path])
  }

}
