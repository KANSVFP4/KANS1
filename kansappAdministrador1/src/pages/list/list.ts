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

  public vectorMyOfertas: any;
  public banderNewOffert: any;
  public banderMyOffert: any;
  public vectorOfertas: any;
  public arrayDeCadenas: any;

  public Categoria;

  public objUpdateOferta = {
    estado:null,
    Links_to_work: null,
    Categoria: null,
    OtraCategoria: null,
    Faceboock: null,
    Instagram: null,
    Twiter: null,
    OtraRed: null,
    Tiempo: null,
    Precio: null,
    Alcance: null,
    Inf_extra: null,
    emitter:null
  };

  
  constructor(public _administradorService: AdministradorService, public _solicitudesService: SolicitudesService, public navCtrl: NavController, public navParams: NavParams) {




  }

  activarOtro() {

    if (this.Categoria == "Otro") {
      //this.bander = true;
    } else {
      //this.bander = false;
      console.log(this.Categoria);
    }
  }

  NuevasSolicitudes() {
    this.vectorMyOfertas = null;
    this.banderNewOffert = true;
    this.banderMyOffert = false;

    this._solicitudesService.getSolicitudes(this._administradorService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorOfertas = response.messagess;

        console.log("trayendo solicitudes de viajes", this.vectorOfertas);

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );
  }

  AceptarOfertaNueva(Vector,estado)
  {

console.log("vector ofertas deve venir al que di click"+JSON.stringify(Vector));
this.objUpdateOferta.estado=estado;
this.objUpdateOferta.Links_to_work=Vector.Links_to_work;
this.objUpdateOferta.Categoria =this.Categoria;
this.objUpdateOferta.Inf_extra=Vector.Inf_extra;
this.objUpdateOferta.emitter=Vector.emitter._id;
   

   
  
    
  }

 
  

}



