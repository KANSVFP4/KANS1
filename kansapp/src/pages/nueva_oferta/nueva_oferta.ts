import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, } from 'ionic-angular';
import { NavController, AlertController } from "ionic-angular";
import { UserService } from "../../app/services/user.services";
import { PublicistaPage } from '../publicista/publicista';

import { Observable } from "rxjs";



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
  public tiempoO;
  public precioO;
  public alcanceO;
  public inf_adicional;


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
    link:null,
    categoria:null,
    faceboock:null,
    instagram:null,
    twiter:null,
    otro:null,
    tiempo:null,
    precio:null,
    alcance:null,
    inf_extra:null,
  };


  @ViewChild('NAV') nav: Nav;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

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

    if(btnT=='1')
    {
     this.btnTwiterAct =  !this.btnTwiterAct;
     this.btnTwiter = !this.btnTwiter;

    }

  }
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;

    if(this.isActiveToggleTextPassword)
      {
        this.banderOtro=true;
      }else
      {
        this.banderOtro=false;
      }
  }





  goToPublicistaPage() {
    this.navCtrl.push(PublicistaPage);
  }


}