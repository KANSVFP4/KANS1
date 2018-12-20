import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import {Observable} from 'rxjs/Observable';


@Injectable()
export class UserService {
  public url: String;
  public identity;
  public token;
public cont =0;
  constructor(private _http: Http ) {
    this.url = GLOBAL.url;
  }


  singup(user_to_login, getHash) {
    if (getHash!=" ") {
      console.log("aqui va el hash");
      user_to_login.getHash = getHash;
      console.log(user_to_login.getHash);
    }
    let json = JSON.stringify(user_to_login);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json" });
    return this._http
      .post(this.url + "login", params, { headers: headers })
      .map(res => res.json());
  }

  register(user_to_register) {
    let json = JSON.stringify(user_to_register);
    let params = json;
    console.log(params);
    let headers = new Headers({ "Content-type": "application/json" });
    return this._http
      .post(this.url + "register", params, { headers: headers })
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
}
