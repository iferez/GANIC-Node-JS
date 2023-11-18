import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProductoCreado } from 'src/app/interfaces/productos';
import { SandwitchService } from 'src/app/services/sandwitch.service';

@Component({
  selector: 'app-ingesar-sandwich',
  templateUrl: './ingesar-sandwich.component.html',
  styleUrls: ['./ingesar-sandwich.component.css']
})
export class IngesarSandwichComponent {
  form: FormGroup;
  Preferencias: string[] = ['Clásico', 'Vegetariano', 'Vegano', 'Especial'];
  selectedFile: File;

  constructor(
     private formBuilder: FormBuilder,
     private _sandwitchService: SandwitchService,
     private Toast: ToastrService
  ) { 
    this.form = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.minLength(3)]],
      precio: ['',[Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      preferencia: ['',[Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });
    this.selectedFile = new File([''], '');
  }

  imagenSeleccionada(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  agregarSandwich(): void{
    const router = inject(Router);
    const nuevoProducto: IProductoCreado = {
      nombre: this.form.get('nombre')?.value as string,
      precio: this.form.get('precio')?.value as number,
      clasificacion: this.form.get('preferencia')?.value as string,
      descripcion: this.form.get('descripcion')?.value as string,
    }
    const formData = new FormData();
    formData.append('imagen', this.selectedFile);
    this._sandwitchService.crearSandwich({ producto: nuevoProducto, imagen: formData }).subscribe({
      next: _data => {
        this.Toast.success('Producto creado correctamente, Redirigiendo ...', 'Producto creado');
        setTimeout(() => {
          router.navigate(['/home']);
        }, 2000);
      },
      error: (error: any) => {
        console.log(error?.mensaje);
        this.Toast.error('Error al crear el producto', 'Error');
      },
      complete: () => {
        console.log('Completado');
      }
    });
  }

}
