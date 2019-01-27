import { Component, OnInit } from "@angular/core";
import { NavController, LoadingController, AlertController, MenuController } from "ionic-angular";

import { RegistroPage } from "../registro/registro";
import { UserService } from "../../app/services/user.services";
import { User } from "../../app/models/user";
import { PrincipalPage } from "../principal/principal";
/*import { ContactosPage } from "../contactanos/contactanos";
import {TerminosPage} from '../terminos/terminos';*/

@Component({
  selector: "page-home",
  templateUrl: "home.html"
  //providers: [UserService]
})

export class HomePage implements OnInit {
  isActiveToggleTextPassword: Boolean = true;
  splash = true;

  public obj = {
    email: null,
    password: null
  };

  //public user: User;

  public identity;
  public token;

  constructor(
    public navCtrl: NavController,
    private _userService: UserService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController
  ) {
    //this.user = new User("", "", "", "", "", "", "", "");
  }

  ngOnInit() {
    //this.identity = this._userService.getIdentity();
    //this.token = this._userService.getToken();
    console.log("las vaibles del Storage");
    console.log(this.identity + this.token);

    //  if(this.identity == null){
    //    this.menuCtrl.enable(false, 'myMenu');
    //  }else{
    //    this.menuCtrl.enable(true, 'myMenu');
    //  }
  }

  /*ionViewDidLoad() {
    //this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
    }, 4000);
    //this.tabBarElement.style.display = 'none';
  }*/

  onCLick() {
    this.navCtrl.push(RegistroPage);
  }

  public onSubmit() {
    //conseguir losdatos del usuario
    //animacion de carga del sistema
    this.verificarUsuario();
    this._userService.singup(this.obj, " ").subscribe(
      response => {
        console.log(response + "esto viene en la respuesta");
        let identity = response.user;
        this.identity = identity;
        console.log(identity);
        if (!this.identity._id) {
          console.log("el usuario no se ha logueado correctamente");

          // aqui la alerta
        } else {
          // crear local storage
          localStorage.setItem("identity", JSON.stringify(identity));

          this._userService.singup(this.obj, "true").subscribe(
            response => {
              let token = response.token;
              this.token = token;
              if (this.token.length <= 0) {

                // aqui mensaje
                console.log("el token nose ha generado");
              } else {

                localStorage.setItem("Token", token);
                setTimeout(() => {
                  this.navCtrl.push(PrincipalPage);
                }, 2000);
              }
            },
            error => {
              var errorMessage = <any>error;
              if (errorMessage) {
                try {
                  var body = JSON.parse(error._body);
                  errorMessage = body.message;
                } catch{ errorMessage = "No connection try later."; }
                setTimeout(() => {
                  this.showAlert(errorMessage);
                }, 2000);
                console.log(errorMessage);
              }
            }
          );
          //fin
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage) {
          try {
            var body = JSON.parse(error._body);
            errorMessage = body.message;
          } catch{ errorMessage = "No connection try later."; }
          setTimeout(() => {
            this.showAlert(errorMessage);
          }, 3000);
          console.log(errorMessage);
        }
      }
    );

  }

  verificarUsuario() {
    let loading = this.loadingCtrl.create({
      content: "Verifying your data"
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 3000);

  }

  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  showAlert(errorr) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: errorr,
      buttons: ['OK']
    });
    alert.present();
  }
}