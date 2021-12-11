import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';




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
      .then(() => {
        this.navigateTo('home')
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

  sendFormValues(): void {
    this.isInRequest = true;
    const { email, password } = this.loginForm.value;
    this._serviceAuth.loginEmailPass(email, password)
      .then((res) => {
        console.log(res);
        this.navigateTo('home')
      })
      .catch((error) => {
        this.isInRequest = false;
        this.errorMessage = "No fue posible autenticar el acceso con el email y la contraseña ingresados."
        console.log(error);
      })
  }

  navigateTo(path: string): void {
    this.router.navigate([path])
  }

}
