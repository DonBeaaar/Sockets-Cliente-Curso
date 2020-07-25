import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private wsService: WebSocketService) { }

  sendMessage(mensaje: string) {

    const payload = { de: 'Felipe', cuerpo: mensaje};

    this.wsService.emit('mensaje', payload);
  }

  getMessages(){
    return this.wsService.listen('mensaje-nuevo');
  }
}
