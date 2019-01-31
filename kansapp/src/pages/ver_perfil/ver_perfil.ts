import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController } from "ionic-angular";
import { UserService } from "../../app/services/user.services";
import { NuevaOfertaService } from "../../app/services/ofertas.services";
import { PayPalService } from "../../app/services/paypal.service";
import { InAppBrowser } from '@ionic-native/in-app-browser'

@Component({
  selector: 'page-ver_perfil',
  templateUrl: 'ver_perfil.html',
  providers: [UserService]
})

export class VerPerfil {
  public identity;
  public identityVP;
  public estadoContrasena = '0';
  public vectorMyOfertas = null;
  public banderLinks = false;

  public banderBarraHight = false;
  public banderBarraLow = false;

  constructor(
    private iab: InAppBrowser,
    public _paypalservice: PayPalService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public _userService: UserService,
    public loadingCtrl: LoadingController,
   private _nuevaOfertaService: NuevaOfertaService
  ) {
    this.identity = _userService.getIdentity();
    console.log(this.identity);
    
    this.identityVP=null;
    this.identityVP = JSON.parse(localStorage.getItem("ver_perfil"));
    console.log("perfil a mostrar" + this.identity.nombre);
    this.getMyNuevasOfertas();

    if (this.identityVP.paypal == null) {
      

      this.banderBarraHight=false;
      this.banderBarraLow = true;
    } else {
      this.banderBarraHight = true;
      this.banderBarraLow=false;
    }
  }


  mostrarLinks()
  {
   this.banderLinks= !this.banderLinks;
  }



  getMyNuevasOfertas() {
    console.log("entre a get my ofertas nuevas");
    this.vectorMyOfertas = null;
    
    this._nuevaOfertaService.getOfertasPerfil(this._userService.getToken(), this.identityVP._id).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorMyOfertas = response.messagess;
        console.log("viajes mios", this.vectorMyOfertas);

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }



  pago(vector) {

    let data =
    {
      contratista: this._userService.getIdentity(),
      amount: vector.Precio,
      idViaje: vector._id,
      pagoDe: 'advertising service'
    }




    this._paypalservice.payment(data).subscribe(
      response => {
        console.log("response for server", response.links[1].href);
        var browser = this.iab.create(response.links[1].href);

      }, error => { }
    );
    //this.navCtrl.push(PagoOnlinePage);
  }

  
  confirmarPagoViaje(vector) {
    console.log("este vector pase al pago" + JSON.stringify(vector));
    const confirm = this.alertCtrl.create({
      title: 'Warning',
      message: 'If you choose this option you can pay for If you choose this option you can pay through the PAYPAL platform.',
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
            this.pago(vector);
          }
        }
      ]
    });
    confirm.present();
  }



}