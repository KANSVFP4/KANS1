import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav,  } from 'ionic-angular';
import { NavController, AlertController,NavParams, Tabs } from "ionic-angular";
import { UserService } from "../../app/services/user.services";

import { Observable } from "rxjs";

@Component({
  selector: "page-publicista",
  templateUrl: "publicista.html"
})

export class PublicistaPage {
 
  
  @ViewChild('NAV') nav: Nav;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,navParams: NavParams) {
  
  }


  goToPage(page) {
    this.nav.setRoot(page);
  }

  
}



  
