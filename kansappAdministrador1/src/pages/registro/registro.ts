import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, MenuController } from "ionic-angular";
import { Administrador } from "../../app/models/administrador";
import { AdministradorService } from "../../app/services/administrador.services";

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html'
})
export class RegistroPage {

  secretaria_register: Administrador;
  public clase_ojoUsuario = 'eye';
 

  public tipoUsuario = 'password';
  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController, 
    private _administradorService:AdministradorService, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.secretaria_register = new Administrador("", "", "", "", "", "", "");

  }


  myFunctionUsuario() {
    if (this.tipoUsuario === 'text') {
      this.tipoUsuario = 'password';
      this.clase_ojoUsuario = 'eye';
    } else {
      this.tipoUsuario = 'text';
      this.clase_ojoUsuario = 'md-eye-off';
    }
  }

  showAlertCorrecto(corec) {
    let alert = this.alertCtrl.create({
      title: "Right",
      subTitle: corec,
      buttons: ["OK"]
    });
    alert.present();
  }
  onRegisterAdministrador() {
    this.verificarUsuario();
    //this.secretaria_register.estado = '0';
    this._administradorService.register(this.secretaria_register).subscribe(
      response => {
        setTimeout(() => {
          this.showAlertCorrecto(
            "Los datos del nuevo Administrador se han Registrado satisfactoriamente. "
          );
        }, 3000);
       
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          setTimeout(() => {
            this.showAlertCorrecto(
              "Error en la Peticion"
            );
          }, 3000);
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch {
            setTimeout(() => {
              this.showAlertCorrecto(
                "No connection try it later"
              );
            }, 3000);
          }
          
        }
      }
    );
  }

  verificarUsuario() {
    let loading = this.loadingCtrl.create({
      content: "Verficando sus datos"
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 3000);

  }

}
