import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";

import { GLOBAL } from "./global";
//import jsPDF from 'jspdf';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class EnvioEmail {
    public url: String;
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    envioEmail(token,user_to_email) {
        let json = JSON.stringify(user_to_email);
        let params = json;
        console.log(params);
        let headers = new Headers({ "Content-type": "application/json", "Authorization": token });
        return this._http
            .post(this.url + "email", params, { headers: headers })
            .map(res => res.json());
    }

}