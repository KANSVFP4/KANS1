import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NavController, AlertController, LoadingController } from "ionic-angular";
import { UserService } from "../../app/services/user.services";

@Component({
  selector: 'page-mi_cuenta',
  templateUrl: 'mi_cuenta.html',
  providers: [UserService]
})

export class MiCuenta {



  public identity;
  public estadoContrasena = '0';
  public banderPaypal = false;
  public banderPaypal2 = true;

  public banderBarraHight = false;
  public banderBarraLow = false;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public _userService: UserService,
    public loadingCtrl: LoadingController
  ) {
    this.identity = _userService.getIdentity();
    if (this.identity.paypal == null) {
      this.banderPaypal = true;
      this.banderPaypal2 = false;
      this.banderBarraHight=false;
      this.banderBarraLow = true;
    } else {
      this.banderBarraHight = true;
      this.banderBarraLow=false;
    }


    console.log(this.identity);
  }

  disableTextbox = true;
  disableCedula = true;
  disableBoton = false;

  toggleDisable() {
    this.disableTextbox = !this.disableTextbox;
    this.disableBoton = !this.disableBoton;
  }


  validarCedula() {
    var cad: any = this.identity.cedula;
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
        this.identity.cedula = "";
        return false;
      }
    }
  }


  presentAlertCedula() {
    let alert = this.alertCtrl.create({
      subTitle: "Atención",
      message: "La cédula ingresada es incorrecta",
      buttons: ["Aceptar"]
    });
    alert.present();
  }

  onUpdate() {
    console.log("mi JSON esta vacio", console.log(this.identity));
    try {
      if (!this.validarCampos()) {
        console.log("mi JSON esta vacio");
        this.presentAlert();
      } else {
        this.verificarUpdate();
        this._userService.update_user(this.identity, this.estadoContrasena).subscribe(
          response => {

            if (!response.user) {
              var errorMessage = "The user did not update";
            } else {
             
              setTimeout(() => {
                this.showAlertCorrecto(
                  "Your data has been updated correctly"
                );
              }, 3000);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              this.identity =this. _userService.getIdentity();
              if (this.identity.paypal == null) {
                this.banderPaypal = true;
                this.banderPaypal2 = false;
                this.banderBarraLow = true;
              } else {
                this.banderBarraHight = true;
                this.banderBarraLow=false;
                this.banderPaypal = false;
                this.banderPaypal2 = true;

              }
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
                errorMessage = "No connection, try later";
              }
              setTimeout(() => {
                this.showAlert(errorMessage);
              }, 3000);
            }
          }
        );
      }
    } catch (error) {
      //this.showAlert("Verifique que la información sea correcta");
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: "Warning",
      subTitle: "Verify that the information is correct before continuing",
      buttons: ["Ok"]
    });
    alert.present();
  }

  validarCampos() {
    var bool_nombres = this.soloLetras(this.identity.nombre);
    var bool_apellidos = this.soloLetras(this.identity.apellido);
    var bool_celular = this.soloNumeros(this.identity.tel_celular);

    if (
      this.identity.nombre == "" ||
      this.identity.apellido == "" ||
      this.identity.correo == "" ||
      this.identity.tel_celular == "" ||
      bool_nombres ||
      bool_apellidos ||
      bool_celular) {
      return false;
    } else {
      return true;
    }
  }

  soloNumeros(string) {
    //solo letras
    //Se añaden las letras validas
    var filtro = "0123456789"; //Caracteres validos
    var ct = 0;
    for (var i = 0; i < string.length; i++) {
      if (filtro.indexOf(string.charAt(i)) == -1) {
        ct = ct + 1;
      }
    }
    if (ct > 0) {
      console.log("VALOR TRUE");
      return true; //Posee caracteres especiales
    } else {
      console.log("VALOR FALSE");
      return false; //NO Posee caracteres especiales
    }
  }

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

  showAlertCorrecto(corec) {
    let alert = this.alertCtrl.create({
      title: "Right",
      subTitle: corec,
      buttons: ["OK"]
    });
    alert.present();
  }

  verificarUpdate() {
    let loading = this.loadingCtrl.create({
      content: "Verifying "
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

  showAlert(errorr) {
    let alert = this.alertCtrl.create({
      subTitle: "Error",
      message: errorr,
      buttons: ["OK"]
    });
    alert.present();
  }
}