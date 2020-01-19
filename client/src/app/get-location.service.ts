import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetLocationService {
  private url = 'http://localhost:3000'; //Backend server url
  private socket;

  constructor() {
    this.socket = io(this.url);
    this.socket.on('location', function (location) {
      console.log(location);
    });
  }

  public initSocket(): void {
    this.socket = io(this.url);
  }

  public send(message): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('location', (data: any) => {
        console.log("Get Location from backend : ", data);
        observer.next(data);
      });
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  public sendLocation(location) {
    console.log("location : ", JSON.stringify(location));
    this.socket.emit('new-location', {
      location
    });
  }
}
