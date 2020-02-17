import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/entities/cliente';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {

  clientes: Array<Cliente>;
  constructor(private clientesService: ClientesService) {
    this.clientes = [];
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.clientesService.getAll().subscribe((response: Array<Cliente>) => {
      this.clientes = response;
    })
  }
}
