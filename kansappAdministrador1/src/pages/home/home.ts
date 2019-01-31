import { Component, OnInit } from "@angular/core";
import { NavController, LoadingController, AlertController, MenuController } from "ionic-angular";

//import { RegistroPage } from "../registro/registro";
import { AdministradorService } from "../../app/services/administrador.services";
import { Administrador } from "../../app/models/administrador";
import { ListPage } from "../list/list";
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

  public administrador: Administrador;

  public identity;
  public token;

  constructor(
    public navCtrl: NavController,
    private _administradorService: AdministradorService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController
  ) {
    this.administrador = new Administrador("", "", "", "", "", "", "");
  }

  ngOnInit() {
    this.identity = this._administradorService.getIdentity();
    this.token = this._administradorService.getToken();
    console.log("las vaibles del Storage");
    console.log(this.identity + this.token);

    /* if(this.identity == null){
        this.menuCtrl.enable(false, 'myMenu');
    }else{
       this.menuCtrl.enable(true, 'myMenu');
     }*/
  }

 /* ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
    }, 4000);
    this.tabBarElement.style.display = 'none';
  }*/

  onCLick() {
    //this.navCtrl.push(RegistroPage);
  }

 public onSubmit() {
    //conseguir losdatos del usuario
    //animacion de carga del sistema
    this.verificarUsuario();
    this._administradorService.singupAdministrador(this.obj, " ").subscribe(
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

          this._administradorService.singupAdministrador(this.obj, "true").subscribe(
            response => {
              let token = response.token;
              this.token = token;
              if (this.token.length <= 0) {

                // aqui mensaje
                console.log("el token nose ha generado");
              } else {

                localStorage.setItem("Token", token);
                setTimeout(() => {
                  this.navCtrl.push(ListPage);
                }, 2000);
              }
            },
            error => {
              var errorMessage = <any>error;
              if (errorMessage) {
                try {
                  var body = JSON.parse(error._body);
                  errorMessage = body.message;
                } catch{ errorMessage = "No conection try it later."; }
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
            var body = JSON.parse(error._body);            errorMessage = body.message;
          } catch{ errorMessage = "No conection try it later."; }
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