import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SolicitudesService {
    public url: String;
    public identity;
    public token;
    public cont = 0;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }


    getSolicitudes(token) {
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "nuevasOfertas/0", { headers: headers })
            .map(res => res.json());


    }


    getSolicitudesPorPagar(token) {
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "ofertasPorPagar/1", { headers: headers })
            .map(res => res.json());


    }




    update_Solicitudes(oferta_to_update, token) {


        let json = JSON.stringify(oferta_to_update);
        let params = json;
        console.log(params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http
            .put(this.url + "update-oferta/" + oferta_to_update._id, params, { headers: headers })
            .map(res => res.json());
    }


    OfertaPagada(data, token) {
        console.log("el ide que va a ir", data._id)

        let json = JSON.stringify(data);
        let params = json;
        console.log(params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http
            .put(this.url + "ofertaPagada/" + data._id, params, { headers: headers })
            .map(res => res.json());
    }


    getOfertasPagadas(token) {
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "OfertasPagadas", { headers: headers })
            .map(res => res.json());


    }

    getSolicitudesPagadasFecha(token, fechaBusqueda) {
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "OfertasPagadasFecha/"+fechaBusqueda, { headers: headers })
            .map(res => res.json());


    }

    getAllOfertasPendientes(token) {
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http.get(this.url + "AllOfertasPendientes", { headers: headers })
            .map(res => res.json());


    }

    
// aqui saco lo del usuario




}