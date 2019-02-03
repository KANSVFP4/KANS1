import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav,  } from 'ionic-angular';
import { NavController, AlertController,NavParams, ModalController,Tabs } from "ionic-angular";
import { UserService } from "../../app/services/user.services";
import { NuevaOfertaService } from "../../app/services/ofertas.services";
import { VerPerfil } from '../ver_perfil/ver_perfil';
import { Observable } from "rxjs";

import { NuevaOfertaPage } from '../../pages/nueva_oferta/nueva_oferta';
@Component({
  selector: "page-publicista",
  templateUrl: "publicista.html"
})



export class PublicistaPage {
 
  public vectorOfertas;
  public vectorMyOfertas;
  public vectorMyOfertasPendientes;
  public banderLinks =false;
 public banderMyOffert =false;
 public banderNewOffert = false;
  
  @ViewChild('NAV') nav: Nav;

  constructor(public _userService: UserService, public _nuevaOfertaService : NuevaOfertaService , public navCtrl: NavController, public alertCtrl: AlertController,navParams: NavParams, public modalCtrl: ModalController) {
  this.getAllNuevasOfertas();
  this.getAllNuevasOfertas();

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
    this.vectorMyOfertas=null;
    this.banderNewOffert= true;
    this.banderMyOffert=false;
  
    this._nuevaOfertaService.getOfertas(this._userService.getToken()).subscribe(response => {

      
      if (response.messagess[0] != undefined) {
       // this.vectorOfertas=null;
        this.vectorOfertas = this.darvueltaNuevasOfertas(response.messagess);
        console.log("dado la vuelta", this.vectorOfertas);
       
        
        //localStorage.setItem("vectorViajesMios", JSON.stringify(this.vectorViajes));


      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  
  getMyNuevasOfertas()
  {
  this.vectorOfertas=null;
  this.banderNewOffert= false;
  this.banderMyOffert=true;
    this._nuevaOfertaService.getMyOfertas(this._userService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion"+ JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorMyOfertas=null;
        this.vectorMyOfertas = response.messagess;
        this.darvueltaMyNuevasOfertas();
        console.log("viajes mios", this.vectorMyOfertas);
        //localStorage.setItem("vectorViajesMios", JSON.stringify(this.vectorViajes));


      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }
  
  verPerfil(perfil)
  {
    console.log("este es el perfil que voy a mostrar"+ JSON.stringify(perfil));
    localStorage.removeItem("ver_perfil");
    localStorage.setItem("ver_perfil",JSON.stringify(perfil));
    this.navCtrl.push(VerPerfil);
  
  }

public aux;
public c;
public medio;
public up

  darvueltaNuevasOfertas(vector) {
    this.aux;
    vector.forEach(() => {
      this.c += 1;
    });
    this.medio = (this.c) / 2;
    this.up = (this.c) - 1;
    for (var i = 0; i < this.medio; i++) {
      this.aux = vector[i];
      vector[i] = vector[this.up];
      vector[this.up] = this.aux;
      this.up--;
      this.vectorOfertas=vector;
    }
    this.c = 0;
    return vector;
  }


  darvueltaMyNuevasOfertas() {
    this.aux;
    this.vectorMyOfertas.forEach(() => {
      this.c += 1;
    });
    this.medio = (this.c) / 2;
    this.up = (this.c) - 1;
    for (var i = 0; i < this.medio; i++) {
      this.aux = this.vectorMyOfertas[i];
      this.vectorMyOfertas[i] = this.vectorMyOfertas[this.up];
      this.vectorMyOfertas[this.up] = this.aux;
      this.up--;
    }
    this.c = 0;
  }

  MyOfertasPendientesPublicista() {
    this.vectorMyOfertas = null;
    this.vectorOfertas=null;
this.vectorMyOfertasPendientes=null;

    
    this._nuevaOfertaService.getMyOfertasPendientesPublicista(this._userService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion  my ofertas pendientes" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        
       
        this.vectorMyOfertasPendientes = response.messagess;
       
        //this.darvuelta();
        console.log("mis pendientes soy publicista", this.vectorMyOfertasPendientes);
        //localStorage.setItem("vectorViajesMios", JSON.stringify(this.vectorViajes));


      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }
  
}



  
