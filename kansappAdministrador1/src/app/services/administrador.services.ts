import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AdministradorService {
  public url: String;
  public identity;
  public token;
public cont =0;
  constructor(private _http: Http ) {
    this.url = GLOBAL.url;
  }


  singupAdministrador(administrador_to_login, getHash) {
    if (getHash!=" ") {
      console.log("aqui va el hash");
      administrador_to_login.getHash = getHash;
      console.log(administrador_to_login.getHash);
    }
    let json = JSON.stringify(administrador_to_login);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json" });
    return this._http
      .post(this.url + "loginAdministrador", params, { headers: headers })
      .map(res => res.json());
  }

  register(administrador_to_login) {
    let json = JSON.stringify(administrador_to_login);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json" });
    return this._http
      .post(this.url + "registerAdministrador", params, { headers: headers })
      .map(res => res.json());
  }


  update_user(user_to_update, estadoContrasena) {
    console.log("estadoCOntrasena", estadoContrasena);
    user_to_update.estadoContrasena=estadoContrasena;
    let json = JSON.stringify(user_to_update);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": this.getToken() });
    return this._http
      .put(this.url + "update-user/" + user_to_update._id, params, { headers: headers })
      .map(res => res.json());
  }




  getIdentity() {
    let identity = JSON.parse(localStorage.getItem("identity"));
    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    
    let token = localStorage.getItem("Token");
    console.log("este es el falso token"+token);
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  logout() {
    localStorage.removeItem("identity");
    localStorage.removeItem("Token");
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

  getUsuariosRegistrados(token)
{
    let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
    return this._http.get(this.url + "todosUsuarios", { headers: headers })
        .map(res => res.json());
}
}
