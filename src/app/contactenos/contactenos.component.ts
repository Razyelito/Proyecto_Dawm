import { Component, OnInit } from '@angular/core';
import { ContactenosService } from '../servicios/contactenos.service';
import swal from'sweetalert2'

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.css']
})
export class ContactenosComponent implements OnInit {
 
  constructor(private ContactenosService:ContactenosService) { }

  ngOnInit(): void {
  }

  enviarCorreo(formulario){    
    this.ContactenosService.enviarFormulario(formulario).subscribe(() => {
      swal.fire("Formulario de contacto", "Mensaje enviado correctamente", 'success');
      });
  }


/*
  enviarCorreo(){        
    fetch('http://localhost:3001/api/formulario/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        formulario: {
          nombre:this.nombre,
          apellido:this.apellido,
          fecha_nacimiento:this.fecha_nacimiento,
          pais:this.pais,
          correo:this.correo,
          comentarios:this.comentarios
        }
      })
    });
  }*/
}
