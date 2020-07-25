import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public wsStatus = false;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  checkStatus() {

    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.wsStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.wsStatus = false;
    });
  }

  // tslint:disable-next-line: ban-types
  emit(evento: string, payload?: any, callback?: Function) {
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string){
    return this.socket.fromEvent(evento);
  }
}
