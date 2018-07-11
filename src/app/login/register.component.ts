import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( public usuarioService: UsuarioService,
               public router: Router) { }

  validarIguales(campo1: string, campo2: string){

    return (group: FormGroup) =>{
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if( pass1 === pass2 ){
        return null;
      }

        return {
          sonIguales: true
        };
    };
  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      notificaciones: new FormControl(false,  Validators.required),
      condiciones: new FormControl(true),
    }, { validators: this.validarIguales('password', 'password2')});


    /*
    ///LLENAR FORMULARIO CON DATOS DE PRUEBA
    this.forma.setValue({
      nombre: 'Test 1',
      email: 'test1@test.com',
      password: '123456',
      password2: '123456',
      condiciones: false,
      notificaciones:false
    });
    */
  }

  registrarUsuario(){
    if(this.forma.invalid){
      return;
    }

    if(!this.forma.value.condiciones){
      swal("Importante!", "Debes aceptar las condiciones!", "warning");
      return;
    }


    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password,
      null,
      null,
      null,
      null,
      null,
      null,
      this.forma.value.notificaciones,
      this.forma.value.condiciones
    );

    this.usuarioService.crearUsuario(usuario)
        .subscribe((resp:any)=>{
          console.log(resp);
          if(resp.error){
            return;
          }
          this.router.navigate(['/login']);
        });
  }

}
