import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav,  } from 'ionic-angular';
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

    public bander = false;
    
    public isActiveToggleTextPassword=false;
    
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


  activarOtro()
  {
  
  if(this.Categoria=="Otro")
  {
    this.bander=true;
  }else
  {
    this.bander=false;
  }
  }

  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }


  goToPublicistaPage() {
    this.navCtrl.push(PublicistaPage);
  }

  
}