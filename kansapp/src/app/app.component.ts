import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserService } from './services/user.services';
import { PrincipalPage } from '../pages/principal/principal';
import { HomePage } from '../pages/home/home';
import { MiCuenta } from '../pages/mi_cuenta/mi_cuenta';
import { ContrasenaPage } from '../pages/contrasena/contrasena';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = HomePage;
  @ViewChild('NAV') nav: Nav;

  public pages: Array<{ titulo: string, component: any, icon: string }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _userService: UserService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if (_userService.getIdentity()) {
      this.rootPage = PrincipalPage;
    } else {
      this.rootPage = HomePage;
    }    
  }


  ngOnInit() {
    this.pages = [
      { titulo: 'Home', component: PrincipalPage, icon: 'iconoMenuPrincipal.png' },
      { titulo: 'My Account', component: MiCuenta, icon: 'iconoMiCuenta.png' },
      { titulo: 'Password', component: ContrasenaPage, icon: 'iconoMiCuenta.png' }
    ];
  }

  goToPage(page) {
    this.nav.setRoot(page);
  }

  Logout() {
    this._userService.logout();
    this.nav.setRoot(HomePage);
  }
}
