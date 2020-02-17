import { Injectable } from '@angular/core';
import { Admin } from "../entities/admin";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private http: HttpClient) {

   }

   public save(formData: Admin){
    if (typeof formData.id=== 'undefined' || formData.id===null) {
      //como vamos a registrar un usuario, eliminamos el id del formulario
      delete formData.id;
      return this.add(formData);
    }

    //return this.edit(formData);
   }

   public add(formData: Admin){
    return this.http.post(environment.apiUrl.admins, formData);
   }
}
