import { Component, OnInit } from '@angular/core';
import { ContactenosService } from '../servicios/contactenos.service';
import swal from 'sweetalert2'

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
}
