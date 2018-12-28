import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav,  } from 'ionic-angular';
import { NavController, AlertController,NavParams, ModalController,Tabs } from "ionic-angular";
import { UserService } from "../../app/services/user.services";

import { Observable } from "rxjs";

import { NuevaOfertaPage } from '../../pages/nueva_oferta/nueva_oferta';
@Component({
  selector: "page-publicista",
  templateUrl: "publicista.html"
})

export class PublicistaPage {
 
  
  @ViewChild('NAV') nav: Nav;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,navParams: NavParams, public modalCtrl: ModalController) {
  
  }


  goToNuevaOferta() {
    this.navCtrl.push(NuevaOfertaPage);
  }

  
}



  
