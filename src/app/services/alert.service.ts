import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(title: string, message: string) {
    Swal.fire({
      title: title,
      html: message,
      icon: 'success',
      confirmButtonText: 'Ok',
      customClass: { confirmButton: "bg-dark" },
      background: "#000000F7",
      color: "#fff"
    })
  }

  error(title: string, message: string) {
    Swal.fire({
      title: title,
      html: message,
      icon: 'error',
      confirmButtonText: 'Ok',
      customClass: { confirmButton: "bg-dark" },
      background: "#000000F7",
      color: "#fff"
    })
  }


  warning(title: string, message: string) {
    Swal.fire({
      title: title,
      html: message,
      icon: 'warning',
      confirmButtonText: 'Ok',
      customClass: { confirmButton: "bg-dark" },
      background: "#000000F7",
      color: "#fff"
    })
  }
}
