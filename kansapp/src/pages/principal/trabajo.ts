import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav,  } from 'ionic-angular';
import { NavController, AlertController } from "ionic-angular";
import { UserService } from "../../app/services/user.services";
import { PublicistaPage } from '../publicista/publicista';

import { Observable } from "rxjs";

@Component({
  selector: "page-principal",
  templateUrl: "principal.html"
})

export class PrincipalPage {
 
  
  @ViewChild('NAV') nav: Nav;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  
  }


  goToPublicistaPage() {
    this.navCtrl.push(PublicistaPage);
  }

  
}