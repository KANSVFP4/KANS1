import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Administrador } from "../../app/models/administrador";

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {
  
    secretaria_register: Administrador;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.secretaria_register = new Administrador("", "", "", "", "", "", "");
    
  }

}
