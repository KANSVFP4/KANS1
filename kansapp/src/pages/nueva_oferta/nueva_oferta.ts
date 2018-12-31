import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, } from 'ionic-angular';
import { NavController, AlertController } from "ionic-angular";
import { UserService } from "../../app/services/user.services";
import { NuevaOfertaService } from "../../app/services/ofertas.services";
import { PublicistaPage } from '../publicista/publicista';

import { Observable } from "rxjs";
import { IfObservable } from 'rxjs/observable/IfObservable';

import { ToastController } from 'ionic-angular';

@Component({
  selector: "page-newOfert",
  templateUrl: "nueva_oferta.html"
})

export class NuevaOfertaPage {




  public bander = false;
  public banderOtro = false;

  //Activar botones de redes sociales
  public btnFaceboockAct = true;
  public btnFaceboock = false;

  public btnInstagramAct = true;
  public btnInstagram = false;

  public btnTwiterAct = true;
  public btnTwiter = false;
  public isActiveToggleTextPassword = false;

  // variables para llenar el objeto

  public links_to_work;
  public Categoria;
  public OtraCategoria = null;
  public tiempoO;
  public precioO;
  public alcanceO;
  public inf_adicional;
  public OtraRed = null;

  public categoriaV: any[] = [{ "categoria": "Educacion" },
  { "categoria": "Ciencia" },
  { "categoria": "Tecnologia" },
  { "categoria": "Arte" },
  { "categoria": "Cultura" },
  { "categoria": "Gastronomia" },
  { "categoria": "Medicina" },
  { "categoria": "Otro" },
  ];


  public objNuevaOferta = {
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
  };


  @ViewChild('NAV') nav: Nav;

  constructor(public _userService: UserService, public _nuevaOfertaService: NuevaOfertaService, public navCtrl: NavController, public alertCtrl: AlertController, private toastCtrl: ToastController) {

  }



  /*clickMensaje(Categoria)
  {
  console.log(Categoria);
  if(Categoria=="Otro")
  {
    this.bander=true;
  }
  }*/


  activarOtro() {

    if (this.Categoria == "Otro") {
      this.bander = true;
    } else {
      this.bander = false;
      console.log(this.Categoria);
    }
  }


  // funcion para activar botones
  activarBotonesredesSociales(btnF, btnI, btnT) {
    if (btnF == '1') {
      this.btnFaceboockAct = !this.btnFaceboockAct;
      this.btnFaceboock = !this.btnFaceboock;
    }

    if (btnI == '1') {
      this.btnInstagramAct = !this.btnInstagramAct;
      this.btnInstagram = !this.btnInstagram;

    }

    if (btnT == '1') {
      this.btnTwiterAct = !this.btnTwiterAct;
      this.btnTwiter = !this.btnTwiter;

    }

  }
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;

    if (this.isActiveToggleTextPassword) {
      this.banderOtro = true;
    } else {
      this.banderOtro = false;
    }
  }





  goToPublicistaPage() {
    this.navCtrl.push(PublicistaPage);
  }



  presentToast(Mensaje) {
    let toast = this.toastCtrl.create({
      message: Mensaje,
      duration: 3000,
      position: 'botton'
    });

    toast.onDidDismiss(() => {
      console.log('Faltan campos por Llenar');
    });

    toast.present();
  }




  showAlertConfirmado() {

    let alert = this.alertCtrl.create({
      title: "<center><h3>IMPORTANT</h3></center>",
    
      message: '<p align="justify">The new offer has been created correctly.</p>',
      buttons: ["OK"],
      cssClass: 'customLoader'
    });
    alert.present();
  }
  

  enviarNuevaOferta() {
    if (this.links_to_work != null && this.tiempoO && this.precioO && this.alcanceO) {
      this.objNuevaOferta.Links_to_work = this.links_to_work;

      this.objNuevaOferta.OtraRed = this.OtraRed;
      this.objNuevaOferta.Tiempo = this.tiempoO;
      this.objNuevaOferta.Precio = this.precioO;
      this.objNuevaOferta.Alcance = this.alcanceO;
      this.objNuevaOferta.Inf_extra = this.inf_adicional;
    } else {
      this.presentToast("Complete all the necessary fields");
    }

    if (this.Categoria != null || this.OtraCategoria !== null) {
      this.objNuevaOferta.Categoria = this.Categoria;
      this.objNuevaOferta.OtraCategoria = this.OtraCategoria;
    } else {
      this.presentToast("The categories  in which you are going to work is not clear yet");
    }

    if (this.btnFaceboock == true) {
      this.objNuevaOferta.Faceboock = "Si";
    } else {
      this.objNuevaOferta.Faceboock = "No";
    }

    if (this.btnInstagram == true) {
      this.objNuevaOferta.Instagram = "Si";
    } else {
      this.objNuevaOferta.Instagram = "No";
    }

    if (this.btnTwiter == true) {
      this.objNuevaOferta.Twiter = "Si";
    } else {
      this.objNuevaOferta.Twiter = "No";
    }

    if (this.btnFaceboock == false && this.btnInstagram == false && this.btnTwiter == false && this.OtraRed==null) {
      this.presentToast("the social network in which you are going to work is not clear yet");
    }else
    {
      this.objNuevaOferta.OtraRed=this.OtraRed;
    }


 console.log(this.objNuevaOferta);


 let alert = this.alertCtrl.create({
  title: '<center><h3>IMPORTANT</h3></center>',
  subTitle: '<center>¿WISH YOU TO CREATE A NEW OFFER?</center>',
  message: '<p align="justify">THE NEW OFFER WILL BE CREATED CORRECTLY WAIT FOR CONFIRMATION.</p>',
  buttons: [
    {
      text: 'Cancel',
      handler: data => {
        console.log('Solicitud Cancelada');
      }
    },
    {
      text: 'OK',
      handler: data => {
       
   
        this._nuevaOfertaService.saveNuevaOferta(this._userService.getToken(), this.objNuevaOferta).subscribe(
          response => {
            console.log("hola" + response);
            
            this.showAlertConfirmado();
            this.navCtrl.push(PublicistaPage);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  ],
  cssClass: 'customLoader'
});
alert.present();



  }
}