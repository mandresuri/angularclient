import { Injectable } from '@angular/core';
import { Usuario } from '../entities/usuario';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userLogged: Usuario;
  constructor(private http: HttpClient) {
    this.userLogged = null;
  }

  public login(usuario: Usuario): Promise<Usuario | null> {
    return new Promise((resolve) => {
      this.http.post(environment.apiUrl.login + '/login', usuario).subscribe((data) => {
        this.userLogged = new Usuario();
        this.userLogged.id = data['user'].id;
        this.userLogged.id = data['user'].username;
        this.userLogged.id = data['user'].password;

        this.save();
        resolve(this.userLogged);
      }, (error)=>{
        resolve(null);
      });
    });
  }
  //para guardar en la variable localstorage
  private save(){
    if(this.userLogged!==null){
      localStorage.setItem('userLogged', JSON.stringify(this.userLogged));
    }
  }
}
