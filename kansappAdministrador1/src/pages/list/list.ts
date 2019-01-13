import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SolicitudesService } from "../../app/services/solicitudes.services";
import { AdministradorService } from "../../app/services/administrador.services";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  public  vectorMyOfertas: any;
   public banderNewOffert: any;
   public banderMyOffert: any;
   public vectorOfertas: any;
   public arrayDeCadenas: any;
  constructor(public _administradorService:AdministradorService, public _solicitudesService: SolicitudesService, public navCtrl: NavController, public navParams: NavParams) {

  }



  NuevasSolicitudes() {
    this.vectorMyOfertas = null;
    this.banderNewOffert = true;
    this.banderMyOffert = false;

    this._solicitudesService.getSolicitudes(this._administradorService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorOfertas = response.messagess;
       
       // console.log(arrayDeCadenas);
        //this.darvuelta();
        console.log("trayendo solicitudes de viajes", this.vectorOfertas);
        //localStorage.setItem("vectorViajesMios", JSON.stringify(this.vectorViajes));
        
       
      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );
  }
}



