import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(public usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
  }


}