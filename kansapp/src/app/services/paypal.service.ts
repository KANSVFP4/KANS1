import { Injectable } from "@angular/core";
import {Http,Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";

import { GLOBAL } from "./global";


@Injectable()
export class PayPalService {
    public url:String;
    constructor(private _http:Http)
    {
    this.url= GLOBAL.url;
    }


    payment(data)
    {
        let json = JSON.stringify(data);
        let params = json;
        console.log(params);
        let headers = new Headers({ "Content-type": "application/json" ,"Accept":"application/json"});
        return this._http.post(this.url + "createPayment",params, { headers: headers }).map(res => res.json());
    }

}