import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav,  } from 'ionic-angular';
import { NavController, AlertController } from "ionic-angular";
import { UserService } from "../../app/services/user.services";

import { Observable } from "rxjs";

@Component({
  selector: "page-principal",
  templateUrl: "publicista.html"
})

export class PublicistaPage {
 
  
  @ViewChild('NAV') nav: Nav;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  
  }


  goToPage(page) {
    this.nav.setRoot(page);
  }

  
}