import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/entities/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: Array<Cliente>;

  constructor(private clientesService: ClientesService) {
    this.clientes = [];
  }

  ngOnInit() {

    this.load();
  }

  /**
   * Funcion que permite cambiar de paginación 
   * @param pageOfItems 
   
  onChangePage(pageOfItems: Array<Cliente>){
      this.clientes = pageOfItems;
  }*/

  /**
   * Funcion que permite traer todoa la informacion de los clientes
   */
  private load() {
    this.clientesService.getAll().subscribe((response: Array<Cliente>) => {
      this.clientes = response;
    })
  }

}
