import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController } from "ionic-angular";
import { UserService } from "../../app/services/user.services";

@Component({
  selector: 'page-ver_perfil',
  templateUrl: 'ver_perfil.html',
  providers: [UserService]
})

export class VerPerfil {
  public identity;
  public estadoContrasena = '0';

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public _userService: UserService,
    public loadingCtrl: LoadingController
  ) {
   // this.identity = _userService.getIdentity();
    //console.log(this.identity);
    this.identity=JSON.parse(localStorage.getItem("ver_perfil"));
    console.log("perfil a mostrar"+this.identity.nombre);
  }





 
}