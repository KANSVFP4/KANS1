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

  public Categoria;
  public DescripcionNuevaCategoria;

  public tiempoO;
  public precioO;
  public alcanceO;
  public inf_adicional;

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

  public categoriaV: any[] = [{ "categoria": "Educacion" },
  { "categoria": "Ciencia" },
  { "categoria": "Tecnologia" },
  { "categoria": "Arte" },
  { "categoria": "Cultura" },
  { "categoria": "Gastronomia" },
  { "categoria": "Medicina" },
  { "categoria": "Otro" },
  ];



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