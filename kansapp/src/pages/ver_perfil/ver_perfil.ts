import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController } from "ionic-angular";
import { UserService } from "../../app/services/user.services";
import { NuevaOfertaService } from "../../app/services/ofertas.services";

@Component({
  selector: 'page-ver_perfil',
  templateUrl: 'ver_perfil.html',
  providers: [UserService]
})

export class VerPerfil {
  public identity;
  public estadoContrasena = '0';
  public vectorMyOfertas = null;
  public banderLinks = false;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public _userService: UserService,
    public loadingCtrl: LoadingController,
   private _nuevaOfertaService: NuevaOfertaService
  ) {
    // this.identity = _userService.getIdentity();
    //console.log(this.identity);
    this.identity = JSON.parse(localStorage.getItem("ver_perfil"));
    console.log("perfil a mostrar" + this.identity.nombre);
    this.getMyNuevasOfertas();
  }


  mostrarLinks()
  {
   this.banderLinks= !this.banderLinks;
  }



  getMyNuevasOfertas() {
    console.log("entre a get my ofertas nuevas");
    this.vectorMyOfertas = null;
    
    this._nuevaOfertaService.getOfertasPerfil(this._userService.getToken(), this.identity._id).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorMyOfertas = response.messagess;
        console.log("viajes mios", this.vectorMyOfertas);

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }




}