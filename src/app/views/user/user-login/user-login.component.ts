import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http'
import { AlertService } from 'src/app/services/alert.service';
import { BlockUIService } from 'ng-block-ui';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styles: [
  ]
})
export class UserLoginComponent implements OnInit {

  loginForm = new FormGroup({});
  showPassword = false;



  private emailPattern = /\S+@\S+\.\S+/;


  constructor(
    private _fb: FormBuilder,
    private _serviceAuth: AuthService,
    private router: Router,
    private _blockUIService: BlockUIService,
    private _alertService: AlertService
  ) { }

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
    this._blockUIService.start('blockRef', 'Ingresando...')
    this._serviceAuth.loginGoogle()
      .then((res) => {
        this._blockUIService.stop('blockRef')
        console.log(res);
        this.saveSpotifyToken()
      })
      .catch((error) => {
        this._blockUIService.stop('blockRef')
        console.log(error);
      })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.sendFormValues();
  }

  sendFormValues() {
    const { email, password } = this.loginForm.value;
    this._blockUIService.start('blockRef', 'Ingresando...')
    this._serviceAuth.loginEmailPass(email, password)
      .then((res) => {
        this._blockUIService.stop('blockRef')
        console.log(res);
        this.saveSpotifyToken()
      })
      .catch((error) => {
        this._blockUIService.stop('blockRef')
        this._alertService.error("SpotyApp", `El siguiente problema se presento al <b>ingresar</b>: <br><br> ${error.name} - ${error.code} <br><br> <b>Por favor comuníquese con el administrador</b>`)
        // console.log(JSON.stringify(error, null, 2));
      })

  }

  saveSpotifyToken() {
    this._blockUIService.start('blockRef', 'Obteniendo Token...')
    this._serviceAuth.getSpotifyToken$().subscribe({
      next: (res) => {
        this._blockUIService.stop('blockRef')
        if (res && res.access_token && res.access_token !== "") {
          this._serviceAuth.saveSessionStorage('token', res.access_token);
          this.navigateTo('home')
        } else {
          this.errorInSpotifyToken()
        }
      },
      error: ({ message }: HttpErrorResponse) => {
        this._blockUIService.stop('blockRef')
        this._alertService.error("SpotyApp", `El siguiente problema se presento al solicitar el <b>token</b>: <br><br> ${message} <br><br> <b>Por favor comuníquese con el administrador</b>`)
        this.errorInSpotifyToken()
      },
      complete: () => {
        console.log("Completed saveSpotifyToken");
      }
    })
  }

  errorInSpotifyToken() {
    this._serviceAuth.logout();
  }

  navigateTo(path: string): void {
    this.router.navigate([path])
  }

}
