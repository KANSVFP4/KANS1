import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AdministradorService } from './services/administrador.services';
import { SolicitudesService } from './services/solicitudes.services';
import { EnvioEmail } from './services/correo.service';

//mis paginas
import { RegistroPage} from '../pages/registro/registro';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdministradorService,
    SolicitudesService,
    EnvioEmail,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
