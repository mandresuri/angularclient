import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entities/usuario';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  formData: Usuario;

  constructor(private router: Router, private authService: AuthService) {
    this.formData = new Usuario();
  }

  ngOnInit() {
  }

  async login() {
    const usuarioData: Usuario = await this.authService.login(this.formData);

    if (usuarioData == null) {
      console.info("usuario o contraseña incorrecto");

    } else {
      this.router.navigate(['/main']);
    }

  }
}
