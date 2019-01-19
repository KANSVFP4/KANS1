import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, } from 'ionic-angular';
import { NavController, AlertController, NavParams, ModalController, Tabs } from "ionic-angular";
import { UserService } from "../../app/services/user.services";
import { NuevaOfertaService } from "../../app/services/ofertas.services";
import { PayPalService } from "../../app/services/paypal.service";
import { Observable } from "rxjs";
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NuevaOfertaPage } from '../nueva_oferta/nueva_oferta';
@Component({
  selector: "page-contratista",
  templateUrl: "contratista.html"
})



export class ContratistaPage {

  public vectorOfertas;
  public vectorMyOfertas;
  public vectrOfertasRealizadas;
  public banderLinks = false;
  public banderMyOffert = false;
  public banderNewOffert = false;
  public banderComplido=false;

  @ViewChild('NAV') nav: Nav;

  constructor(private iab: InAppBrowser, public _paypalservice: PayPalService, public _userService: UserService, public _nuevaOfertaService: NuevaOfertaService, public navCtrl: NavController, public alertCtrl: AlertController, navParams: NavParams, public modalCtrl: ModalController) {
    this.getAllNuevasOfertas();
  }

  mostrarLinks() {
    this.banderLinks = !this.banderLinks;
  }




  getAllNuevasOfertas() {
    this.vectorMyOfertas = null;
    this.vectorOfertas=null;
    this.vectrOfertasRealizadas=null;
    this.banderNewOffert = true;
    this.banderMyOffert = false;
    this.banderComplido=false;

    this._nuevaOfertaService.getOfertas(this._userService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorOfertas = response.messagess;
        //this.darvuelta();
        console.log("todos los viajes", this.vectorOfertas);
        //localStorage.setItem("vectorViajesMios", JSON.stringify(this.vectorViajes));


      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }




  pago(vector) {

    let data =
    {
      contratista: this._userService.getIdentity(),
      amount: vector.Precio,
      idViaje: vector._id,
      pagoDe: 'advertising service'
    }




    this._paypalservice.payment(data).subscribe(
      response => {
        console.log("response for server", response.links[1].href);
        var browser = this.iab.create(response.links[1].href);

      }, error => { }
    );
    //this.navCtrl.push(PagoOnlinePage);
  }


  confirmarPagoViaje(vector) {
    console.log("este vector pase al pago" + JSON.stringify(vector));
    const confirm = this.alertCtrl.create({
      title: 'Atención',
      message: 'Si elige esta opción podrá pagar por medio de la plataforma PAYPAL. Caso contrario cancele y espere pagar en efectivo al chofer',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Boton cancelar');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Boton continuar');
            this.pago(vector);
          }
        }
      ]
    });
    confirm.present();
  }


  getMyOfertasPendientes() {
    this.vectorMyOfertas = null;
    this.vectorOfertas=null;
    this.vectrOfertasRealizadas=null;
    this.banderNewOffert = false;
    this.banderMyOffert = true;
    this.banderComplido=false;
    this._nuevaOfertaService.getMyOfertasPendientes(this._userService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorMyOfertas = response.messagess;
        //this.darvuelta();
        console.log("viajes mios", this.vectorMyOfertas);
        //localStorage.setItem("vectorViajesMios", JSON.stringify(this.vectorViajes));


      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }



  getMyOfertasRealizadas() {
    this.vectorMyOfertas = null;
    this.vectorOfertas=null;
    this.vectrOfertasRealizadas=null;
    this.banderNewOffert = false;
    this.banderMyOffert = false;
    this.banderComplido=true;
    this._nuevaOfertaService.getMyOfertasRealizadas(this._userService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectrOfertasRealizadas = response.messagess;
        //this.darvuelta();
        console.log("Vector ofertas realizados", this.vectorMyOfertas);
        //localStorage.setItem("vectorViajesMios", JSON.stringify(this.vectorViajes));


      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }




  cumplido(vector) {
    let data =
    {
      _id: vector._id,
      estado: '1'
    }


    this._nuevaOfertaService.OfertaCumplida(data, this._userService.getToken()).subscribe(
      response => {
        this.vectorMyOfertas =null;
        this.getMyOfertasPendientes();
      
        if (!response.ofertaCumplida) {
          var errorMessage = "La oferta no se actualizo";
        } else {

          console.log("entre a la oferta cumplida");

        }
      },
      err => {
        var errorMessage = <any>err;
        if (errorMessage) {
          console.log(errorMessage);

          try {
            var body = JSON.parse(err._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
          }

        }
      }
    );


  }

  OfertaCumplida(vector) {
    console.log("este vector pase al pago" + JSON.stringify(vector));
    const confirm = this.alertCtrl.create({
      title: 'Succes',
      message: 'Work done',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Boton cancelar');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Boton continuar');
            this.cumplido(vector);

           
          }
        }
      ]
    });
    confirm.present();
  }

}



