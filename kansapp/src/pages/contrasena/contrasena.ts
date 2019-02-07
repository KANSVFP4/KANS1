import { Component } from '@angular/core';

import { NavController, AlertController, Platform, LoadingController } from "ionic-angular";
import { UserService } from "../../app/services/user.services";

@Component({
    selector: 'page-contrasena',
    templateUrl: 'contrasena.html'
})

export class ContrasenaPage {
    isActiveToggleTextPassword: Boolean = true;
    public estadoContrasena = '1';
    public contrasenaNueva;         //esta es la nueva contrasena estupido tefo !!!!!! .|.
    public confirmarContrasenaNueva;

    constructor(public _userService: UserService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) { }

    public toggleTextPassword(): void {
        this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
    }
    public getType() {
        return this.isActiveToggleTextPassword ? 'password' : 'text';
    }

    public verificarContrasenas() {
        if ((this.contrasenaNueva == this.confirmarContrasenaNueva) && this.contrasenaNueva != null && this.contrasenaNueva != "" && this.confirmarContrasenaNueva != null && this.confirmarContrasenaNueva != "") {
            return true;
        } else {
            return false;
        }
    }

    onUpdate() {
        var validacion = this.verificarContrasenas();
        if (validacion == true) {
            this.verificarUpdate();
            var user = this._userService.getIdentity();

            user.contrasena = this.contrasenaNueva;
            try {
                this._userService.update_user(user, this.estadoContrasena).subscribe(
                    response => {
                        if (!response.user) {
                            var errorMessage = "El usuario no se actualizo";
                        } else {
                            setTimeout(() => {
                                this.showAlertCorrecto(
                                    "Your password has been changed"
                                );
                            }, 3000);
                            localStorage.setItem('identity', JSON.stringify(response.user));
                            console.log("esta e sla nueva identiti de actualizar contrasena", response.user);
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
                                errorMessage = "No connection try later";
                            }
                            setTimeout(() => {
                                this.showAlert(errorMessage);
                            }, 3000);
                        }
                    }
                );
            }
            catch (error) {
                //this.showAlert("Verifique que la información sea correcta");
            }
        } else {
            this.showAlert('Verify that the data is correct');
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
            content: "Verifying your data"
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
