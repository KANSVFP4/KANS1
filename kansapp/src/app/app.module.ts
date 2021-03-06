import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CustomFormsModule } from 'ng2-validation';
import { UserService } from './services/user.services';
import { NuevaOfertaService } from './services/ofertas.services';
import { PayPalService } from './services/paypal.service';
import { FormsModule } from '@angular/forms';
import { RegistroPage } from '../pages/registro/registro';
import { PrincipalPage } from '../pages/principal/principal';
import { MiCuenta } from '../pages/mi_cuenta/mi_cuenta';
import { PublicistaPage } from '../pages/publicista/publicista';
import { NuevaOfertaPage } from '../pages/nueva_oferta/nueva_oferta';
import { VerPerfil } from '../pages/ver_perfil/ver_perfil';
import { ContratistaPage } from '../pages/contratista/contratista';
import { ContrasenaPage } from '../pages/contrasena/contrasena';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistroPage,
    PrincipalPage,
    MiCuenta,
    PublicistaPage,
    NuevaOfertaPage,
    ContratistaPage,
    VerPerfil,
    ContrasenaPage
  ],
  imports: [

    BrowserModule,
    FormsModule,
    CustomFormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistroPage,
    PrincipalPage,
    MiCuenta,
    PublicistaPage,
    NuevaOfertaPage,
    ContratistaPage,
    VerPerfil,
    ContrasenaPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    NuevaOfertaService,
    PayPalService,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
