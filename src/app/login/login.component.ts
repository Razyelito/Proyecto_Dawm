import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  constructor() { }

  ngOnInit() {
  }

  clickAddTodo(bandera){
    console.log("boton");
    document.getElementById("menuNavegacion").innerHTML='';
  }

}
