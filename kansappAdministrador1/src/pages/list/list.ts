import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SolicitudesService } from "../../app/services/solicitudes.services";
import { AdministradorService } from "../../app/services/administrador.services";
import { EnvioEmail } from "../../app/services/correo.service";
import { ReportePage } from '../reporte/reporte';
import { IMyDpOptions } from 'mydatepicker';
//import jsPDF from 'jspdf';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  public displayMont = new Date().getMonth();
  public displayDay = new Date().getDate();
  public displayYear = new Date().getFullYear();

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    dayLabels: { su: "Do", mo: "Lu", tu: "Ma", we: "Mi", th: "Ju", fr: "Vi", sa: "Sa" },
    monthLabels: { 1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic" },
    todayBtnTxt: "Hoy",
    firstDayOfWeek: "mo",
    sunHighlight: false,
    markCurrentDay: true,
    minYear: this.displayYear - 1,
    height: '40px',
   // disableUntil: { year: this.displayYear, month: this.displayMont + 1, day: this.displayDay - 1 }
  };

  public varO=false;
  public varP=false;

  public vectorMyOfertas: any;
  public banderNewOffert: any;
  public banderMyOffert: any;
  public vectorOfertas: any;
  public vectorOfertasPorPagar: any;
  public vectorOfertasPagadas: any;
  public vectorOfertasPagadasFecha;
  public arrayDeCadenas: any;
  public fechaBusqueda;

  public Categoria;

  public varNewOffer = false;

  public objUpdateOferta = {
    _id: null,
    estado: null,
    Links_to_work: null,
    Categoria: null,


    Inf_extra: null,
    emitter: null
  };

  public objDenegar =
    {
      _id: null,
      estado: null
    }

banderActivado=false;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public _administradorService: AdministradorService,
    public _solicitudesService: SolicitudesService,
    public _envioEmail: EnvioEmail,
    public navCtrl: NavController,
    public navParams: NavParams) {




  }

  verificarSolicitud() {
    let loading = this.loadingCtrl.create({
      content: "Processing"
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 3000);

  }

  showAlertCorrecto(corec) {
    let alert = this.alertCtrl.create({
      title: "Correcto",
      subTitle: corec,
      buttons: ["OK"]
    });
    alert.present();
  }


  showAlert(errorr) {
    let alert = this.alertCtrl.create({
      subTitle: "Error",
      message: errorr,
      buttons: ["OK"]
    });
    alert.present();
  }

  activarOtro() {

    if (this.Categoria == "Otro") {
      //this.bander = true;
    } else {
      //this.bander = false;
      console.log(this.Categoria);
    }
  }

  NuevasSolicitudes() {

    this.vectorOfertas = null;
    this.vectorOfertasPorPagar = null;
    this.vectorOfertasPagadas = null;
    this.banderNewOffert = true;
    this.banderMyOffert = false;
    this.varNewOffer = true;
    this.varO=false;
    this.varP=false;

    this._solicitudesService.getSolicitudes(this._administradorService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorOfertas = response.messagess;

        console.log("trayendo solicitudes de viajes", this.vectorOfertas);

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );
  }

  AceptarOfertaNueva(Vector, estado) {
    this.verificarSolicitud()
    console.log("vector ofertas deve venir al que di click" + JSON.stringify(Vector));

    this.objUpdateOferta._id = Vector._id;
    this.objUpdateOferta.estado = estado;
    this.objUpdateOferta.Links_to_work = Vector.Links_to_work;
    this.objUpdateOferta.Categoria = this.Categoria;
    this.objUpdateOferta.Inf_extra = Vector.Inf_extra;
    this.objUpdateOferta.emitter = Vector.emitter._id;


    this._solicitudesService.update_Solicitudes(this.objUpdateOferta, this._administradorService.getToken()).subscribe(
      response => {
        if (!response.user) {
          var errorMessage = "the request has not been executed";
        } else {

          setTimeout(() => {
            this.showAlertCorrecto(
              "the offer has been accepted"
            );
          }, 3000);

          this.vectorOfertas = null;
          this.NuevasSolicitudes();

          // envio de correo
          var enviarCorreo =
          {
            obj: Vector,
            estado: estado
          }

          this._envioEmail.envioEmail(this._administradorService.getToken(), enviarCorreo).subscribe(
            response => {
              console.log("Se envio el correo electronico ", response);

            },
            error => {
              console.log(error);
            }
          );


        }
      },
      err => {
        var errorMessage = <any>err;
        if (errorMessage) {
          console.log(errorMessage);

          try {
            var body = JSON.parse(err._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No connection try it later";
          }
          setTimeout(() => {
            this.showAlert(errorMessage);
          }, 3000);
        }
      }
    );


  }


  Denegar(Vector, estado) {
    this.verificarSolicitud();
    this.objDenegar._id = Vector._id;
    this.objDenegar.estado = estado;

    this._solicitudesService.update_Solicitudes(this.objDenegar, this._administradorService.getToken()).subscribe(
      response => {
        if (!response.user) {
          var errorMessage = "the request has not been executed ";
        } else {

          setTimeout(() => {
            this.showAlertCorrecto(
              "the offer has been denied"
            );
          }, 3000);
          this.vectorOfertas = null;
          this.NuevasSolicitudes();
          var enviarCorreo =
          {
            obj: Vector,
            estado: estado
          }

          this._envioEmail.envioEmail(this._administradorService.getToken(), enviarCorreo).subscribe(
            response => {
              console.log("Se envio el correo electronico ", response);
              location.reload(true);
            },
            error => {
              console.log(error);
            }
          );


        }
      },
      err => {
        var errorMessage = <any>err;
        if (errorMessage) {
          console.log(errorMessage);

          try {
            var body = JSON.parse(err._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No connection try it later";
          }
          setTimeout(() => {
            this.showAlert(errorMessage);
          }, 3000);
        }
      }
    );

  }




  TrabajosPorPagar() {
    this.vectorOfertas = null;
    this.vectorOfertasPorPagar = null;
    this.vectorOfertasPagadas = null;
    this.banderNewOffert = true;
    this.banderMyOffert = false;
    this.varNewOffer = false;
    this.varO=true;
    this.varP=false;

    this._solicitudesService.getSolicitudesPorPagar(this._administradorService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorOfertasPorPagar = response.messagess;

        console.log("trayendo solicitudes de viajes", this.vectorOfertasPorPagar);

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );
  }



  Pagado(vector) {
    let data =
    {
      _id: vector._id,
      estado: '2'
    }


    this._solicitudesService.OfertaPagada(data, this._administradorService.getToken()).subscribe(
      response => {
        
        this.vectorOfertasPorPagar=null;


        this.TrabajosPorPagar();

        if (!response.ofertaPagada) {
          var errorMessage = "La oferta no se actualizo";
        } else {

          console.log("entre a la oferta cumplida");

        }
      },
      err => {
        var errorMessage = <any>err;
        if (errorMessage) {
          console.log(errorMessage);

          try {
            var body = JSON.parse(err._body);
            errorMessage = body.message;
          } catch {
            errorMessage = "No hay conexión intentelo más tarde";
          }

        }
      }
    );


  }

  OfertaPagada(vector) {
   
    console.log("este vector pase al pago" + JSON.stringify(vector));
    const confirm = this.alertCtrl.create({
      title: 'Atention',
      message: 'You want to confirm the payment',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Boton cancelar');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Boton continuar');
            this.Pagado(vector);


          }
        }
      ]
    });
    confirm.present();
  }

  TrabajosPagados() {

    this.ActivarCalendario();
    this.vectorOfertas = null;
    this.vectorOfertasPorPagar = null;
    this.vectorOfertasPagadas = null;
    this.banderNewOffert = true;
    this.banderMyOffert = false;
    this.varNewOffer = false;
    this.varO=false;
    this.varP=true;
    this._solicitudesService.getOfertasPagadas(this._administradorService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorOfertasPagadas = response.messagess;

        console.log("trayendo ofertas pagadas", this.vectorOfertasPagadas);

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );
  }


  reportes()
  {
    this.navCtrl.push(ReportePage);
  }

  ActivarCalendario()
  {
    this.banderActivado=!this.banderActivado;
    
  }

  buscarPorFecha()
  {
    this.vectorOfertas = null;
    this.vectorOfertasPorPagar = null;
    this.vectorOfertasPagadas = null;
    this.banderNewOffert = true;
    this.banderMyOffert = false;
    this.varNewOffer = false;
    var fehcaEnviar;
    if(this.fechaBusqueda!=null){
    if(this.fechaBusqueda.date.month<10)
    {
       fehcaEnviar ='0'+this.fechaBusqueda.date.month+'-'+this.fechaBusqueda.date.day+'-'+this.fechaBusqueda.date.year;
    }else
    {
      fehcaEnviar =this.fechaBusqueda.date.month+'-'+this.fechaBusqueda.date.day+'-'+this.fechaBusqueda.date.year;
    }
   
    console.log(fehcaEnviar);

    this._solicitudesService.getSolicitudesPagadasFecha(this._administradorService.getToken(), fehcaEnviar).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorOfertasPagadas = response.messagess;

        console.log("trayendo ofertas pagadaspor fecha", this.vectorOfertasPagadas);

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );
  }
  }
  




  
}



