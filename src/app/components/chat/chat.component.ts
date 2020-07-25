import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajeSubscription: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;

  constructor(private chatService: ChatServiceService) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');
    this.mensajeSubscription = this.chatService.getMessages().subscribe((msg) => {
      this.mensajes.push(msg);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }
  ngOnDestroy() {
    this.mensajeSubscription.unsubscribe();
  }

  enviar() {
    if (this.texto === '') { return;}
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }
}
