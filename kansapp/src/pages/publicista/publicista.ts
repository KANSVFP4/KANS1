import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav,  } from 'ionic-angular';
import { NavController, AlertController,NavParams, ModalController,Tabs } from "ionic-angular";
import { UserService } from "../../app/services/user.services";
import { NuevaOfertaService } from "../../app/services/ofertas.services";

import { Observable } from "rxjs";

import { NuevaOfertaPage } from '../../pages/nueva_oferta/nueva_oferta';
@Component({
  selector: "page-publicista",
  templateUrl: "publicista.html"
})



export class PublicistaPage {
 
  public vectorOfertas;
  public vectorMyOfertas;
  public banderLinks =false;
  
  @ViewChild('NAV') nav: Nav;

  constructor(public _userService: UserService, public _nuevaOfertaService : NuevaOfertaService , public navCtrl: NavController, public alertCtrl: AlertController,navParams: NavParams, public modalCtrl: ModalController) {
  
  }

  mostrarLinks()
  {
   this.banderLinks= !this.banderLinks;
  }

  goToNuevaOferta() {
    this.navCtrl.push(NuevaOfertaPage);
  }


  getAllNuevasOfertas()
  {
  
    this._nuevaOfertaService.getOfertas(this._userService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion"+ JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorOfertas = response.messagess;
        //this.darvuelta();
        console.log("todos los viajes", this.vectorOfertas);
        //localStorage.setItem("vectorViajesMios", JSON.stringify(this.vectorViajes));


      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  
  getMyNuevasOfertas()
  {
  
    this._nuevaOfertaService.getMyOfertas(this._userService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion"+ JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorMyOfertas = response.messagess;
        //this.darvuelta();
        console.log("viajes mios", this.vectorMyOfertas);
        //localStorage.setItem("vectorViajesMios", JSON.stringify(this.vectorViajes));


      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }
  
}



  
