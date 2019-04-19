import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;

  // usuario: Object = {
  //   nombrecompleto: {
  //     nombre: 'Acxel',
  //     apellido: 'Morales'
  //   },
  //   correo: 'acxelmorales97@gmail.com'
  // };

  usuario: any = {
    nombre: 'Acxel',
    apellido: 'Morales',
    email: 'acxelmorales97@gmail.com',
    // pasatiempos: ['Programar', 'Jugar', 'Comer']
  };

  constructor() {
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido': new FormControl('', [Validators.required/*, this.noMorales*/]),
      'email': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'pasatiempos': new FormArray([
        new FormControl('Programar', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    // this.forma.setValue(this.usuario); // con esta forma seteamos los valores a los input
    // Seteamos Validaciones a el password2
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.validaPassword.bind(this.forma)
    ]);

    // escuchamos los cambios de un campo
    this.forma.controls['username'].valueChanges
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      )
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl(null, Validators.required)
    );
  }

  // noMorales(control: FormControl): { [s: string]: boolean } {
  //   if (control.value === 'morales') {
  //     return {
  //       nomorales: true
  //     }
  //   }

  //   return null;
  // }

  validaPassword(control: FormControl): { [s: string]: boolean } {
    let forma: any = this;
    if (control.value !== forma.controls['password1'].value) {
      return {
        noigual: true
      }
    }

    return null;
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    let promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'angular') {
          resolve({
            existe: true
          });
        } else {
          resolve(null);
        }
      }, 3000);
    });

    return promesa;
  }

  guardar(): void {
    this.forma.reset();
  }

}
