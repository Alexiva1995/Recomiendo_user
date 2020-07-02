import {
    Injectable
} from '@angular/core';
import {
    HttpHeaders,
    HttpParams,
    HttpClient
} from '@angular/common/http';
import {
    CONSTANTES
} from '../constantes';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    url = 'http://valdusoft.com/recomiendo'; //url apibase
    constructor(public http: HttpClient) {}

    get(endpoint: string, params ? : any, reqOpts ? : any) {
        if (!reqOpts) {
            reqOpts = {};
        } else {
            reqOpts = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': "Bearer " + localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token)
                })
            };
        }
        // Query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (const k in params) {
                if (params[k] !== undefined) {
                    reqOpts.params = reqOpts.params.append(k, params[k]);
                }
            }
        }
        return this.http.get(this.url + '/' + endpoint, reqOpts);
    }

    post(endpoint: string, body: any, reqOpts ? : any) {
        console.log(body);

        if (!reqOpts) {
            reqOpts = {};
        } else {
            reqOpts = {
                headers: new HttpHeaders({
                    'Accept':'application/json',
                    // 'Content-Type':'application/json',
                    'Authorization': "Bearer " + localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token)
                })
            };
        }
        return this.http.post(this.url + '/' + endpoint, body, reqOpts);
    }

    put(endpoint: string, body: any, reqOpts ? : any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }

    delete(endpoint: string, reqOpts ? : any) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    }

    patch(endpoint: string, body: any, reqOpts ? : any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }

}