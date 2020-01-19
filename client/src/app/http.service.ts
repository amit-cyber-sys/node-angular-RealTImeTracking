import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  public baseUrl: string = environment.baseUrl;

  public httpPostWithoutToken(option: any): Observable<{}> {
    const httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //  'Authorization':
      })
    };
    option.url = this.baseUrl + option.url;
    return this.http.post<any>(option.url, option.body, httpAuthOptions);
  }

}
