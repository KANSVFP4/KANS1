import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class NuevaOfertaService {
  public url: String;
  public identity;
  public token;
  public cont = 0;
  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }


  saveNuevaOferta(token, oferta) {
    console.log("entre a nuevaOferta");
    let params = JSON.stringify(oferta);
    console.log("entre a nueva oferta", params);
    let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
    return this._http.post(this.url + "saveNuevaOferta", params, { headers: headers });

  }



  getOfertas(token) {
    let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
    return this._http.get(this.url + "nuevasOfertas/1", { headers: headers })
      .map(res => res.json());


  }

  getMyOfertas(token) {
    let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
    return this._http.get(this.url + "MynuevasOfertas", { headers: headers })
      .map(res => res.json());


  }


  getMyOfertasPendientes(token) {
    let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
    return this._http.get(this.url + "MyOfertasPendientes", { headers: headers })
      .map(res => res.json());

  }
}