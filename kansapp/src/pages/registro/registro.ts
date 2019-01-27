import { Component } from "@angular/core";
import { HomePage } from "../home/home";
import {
  NavController,
  AlertController,
  LoadingController
} from "ionic-angular";
import { UserService } from "../../app/services/user.services";
import { User } from "../../app/models/user";
import { PrincipalPage } from "../principal/principal";
@Component({
  selector: "page-registro",
  templateUrl: "registro.html",
  providers: [UserService]
})

export class RegistroPage {
  public user_register: User;
  public identity;
  public token;
  //objeto para la validacion del formulario
  miModelo: any;
  verificarPassword = "";

  constructor(
    public navCtrl: NavController,
    private _userService: UserService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.miModelo = {};
    this.user_register = new User("", "", "", "", "", "", "","");
  }

  public verificarContrasenas() {
    console.log('contrasena >>', this.user_register.contrasena);
    console.log('contrasena a verificar>>', this.verificarPassword);
    if ((this.user_register.contrasena == this.verificarPassword) && this.user_register.contrasena != '' && this.verificarPassword != '') {
      //son correctas
      console.log('las contrasenas son CORRECTAS');
      return true;
    } else {
      //son incorrectas
      console.log('las contrasenas son INCORRECTAS');
      return false;
    }
  }

  public onRegister() {
    try {
      if (!this.validarCampos() && this.verificarContrasenas() == false) {
        console.log("mi JSON esta incorrecto");
        this.presentAlert();
      } else {
        this.verificarUsuario();
        this.user_register.estado = "0";
        this._userService.register(this.user_register).subscribe(
          response => {
            setTimeout(() => {
              this.showAlertCorrecto(
                "The User has been successfully registered. Enter your email and password"
              );
            }, 3000);
            this.navCtrl.push(HomePage);
          },
          err => {
            var errorMessage = <any>err;
            if (errorMessage) {
              console.log(errorMessage);
              try {
                var body = JSON.parse(err._body);
                errorMessage = body.message;
              } catch {
                errorMessage = "No connection try later";
              }
              setTimeout(() => {
                this.showAlert(errorMessage);
              }, 3000);
              console.log(errorMessage);
            }
          }
        );
      }
    } catch (error) {
      this.showAlert("Verify that the information is correct, you must fill out all the information.");
    }
  }

  showAlert(errorr) {
    let alert = this.alertCtrl.create({
      subTitle: "Error",
      message: errorr,
      buttons: ["OK"]
    });
    alert.present();
  }

  showAlertCorrecto(corec) {
    let alert = this.alertCtrl.create({
      title: "Right",
      subTitle: corec,
      buttons: ["OK"]
    });
    alert.present();
  }
  verificarUsuario() {
    let loading = this.loadingCtrl.create({
      content: "Verifying"
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: "Warning",
      subTitle: "Verify that the information is correct before continuing",
      buttons: ["Ok"]
    });
    alert.present();
  }

  presentAlertCedula() {
    let alert = this.alertCtrl.create({
      subTitle: "Warning",
      message: "The card entered is incorrect",
      buttons: ["Ok"]
    });
    alert.present();
  }

  presentAlertCaracteresEspeciales() {
    let alert = this.alertCtrl.create({
      subTitle: "Warning",
      message: "The field has special characters",
      buttons: ["Corregir"]
    });
    alert.present();
  }

  validarCampos() {
    var bool_nombres = this.soloLetras(this.user_register.nombre);
    var bool_apellidos = this.soloLetras(this.user_register.apellido);
    var bool_celular = this.soloNumeros(this.user_register.tel_celular);
   /////////////////// var bool_telefono = this.soloNumeros(this.user_register.tel_convencional);
  //  var bool_cedula = this.validarCedula();
    //var confirmarContrasenia = JSON.parse(this.miModelo.confirmContrasena);
    // console.log("valor de miModelo: ", confirmarContrasenia);

    if (
      /////////this.user_register.cedula == "" ||
      this.user_register.nombre == "" ||
      this.user_register.apellido == "" ||
      this.user_register.correo == "" ||
      this.user_register.contrasena == "" ||
      this.user_register.tel_celular == "" ||
     //////////// this.user_register.tel_convencional == "" ||
      bool_nombres ||
      bool_apellidos ||
      bool_celular ||
      ////////////////bool_telefono ||
      ///////////!bool_cedula ||
      (this.user_register.contrasena != this.verificarPassword) ||
      this.verificarPassword == null
    ) {
      console.log('retorno falso');
      return false;
    } else {
      console.log('retorno verdadero');
      return true;
    }
  }

 /* validarCedula() {
    /*var cad: any = this.user_register.cedula;
    var i;

    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;
    if (cad !== "" && longitud === 10) {
      for (i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          var aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
        }
      }
      total = total % 10 ? 10 - total % 10 : 0;

      if (cad.charAt(longitud - 1) == total) {
        return true;
      } else {
        this.presentAlertCedula();
        this.user_register.cedula = "";
        return false;
      }
    }*/
/*}*/

  soloLetras(string) {
    //solo letras
    //Se añaden las letras validas
    var filtro = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ "; //Caracteres validos
    var ct = 0;
    for (var i = 0; i < string.length; i++) {
      if (filtro.indexOf(string.charAt(i)) == -1) {
        ct = ct + 1;
      }
    }
    if (ct > 0) {
      return true; //Posee caracteres especiales
    } else {
      return false; //NO Posee caracteres especiales
    }
  }

  soloNumeros(string) {
    //solo letras
    //Se añaden las letras validas
    var filtro = "0123456789 "; //Caracteres validos
    var ct = 0;
    for (var i = 0; i < string.length; i++) {
      if (filtro.indexOf(string.charAt(i)) == -1) {
        ct = ct + 1;
      }
    }
    if (ct > 0) {
      return true; //Posee caracteres especiales
    } else {
      return false; //NO Posee caracteres especiales
    }
  }

  goBack() {
    this.navCtrl.push(HomePage);
  }
}
