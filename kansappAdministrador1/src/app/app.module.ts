import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyDatePickerModule } from 'mydatepicker';

import { AdministradorService } from './services/administrador.services';
import { SolicitudesService } from './services/solicitudes.services';
import { EnvioEmail } from './services/correo.service';

//mis paginas
import { RegistroPage} from '../pages/registro/registro';
import { ReportePage} from '../pages/reporte/reporte';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegistroPage,
    ReportePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    MyDatePickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegistroPage,
    ReportePage
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
