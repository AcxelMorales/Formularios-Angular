import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent {

  usuario = {
    nombre: null,
    apellido: null,
    email: null,
    pais: '',
    sexo: '',
    acepta: false
  };

  paises = [{
    codigo: 'MEX',
    pais: 'México'
  }, {
    codigo: 'CRI',
    pais: 'Costa Rica'
  }, {
    codigo: 'ESP',
    pais: 'España'
  }];

  sexos: string[] = ['Masculino', 'Femenino'];

  constructor() { }

  guardar(forma: NgForm) {
    console.log('NgForm: ', forma);
    console.log('Valores: ', forma.value);
    console.log('Usuario: ', this.usuario);
  }

}
