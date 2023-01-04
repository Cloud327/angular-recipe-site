// src\app\services\websocket.service.ts
import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';



export interface Message {
    sender: string;
    text: string;
    type: string
}

@Injectable()
export class WebsocketService {
    BASE_URL:string = "ws://127.0.0.1:8000/ws/";
    CHAT_URL:string = this.BASE_URL + "test/"
    roomUrl: string
    subject: AnonymousSubject<MessageEvent>;
    messages: Subject<Message>;
  static messages: any;

    constructor() {
        this.messages = <Subject<Message>>this.connect(this.CHAT_URL).pipe(
            map(
                (response: MessageEvent): Message => {
                    console.log(response.data);
                    let data = JSON.parse(response.data)
                    return data;
                }
            )
        );
    }

   getMessages():Subject<Message>{
      return this.messages
   }

   addMessage(message: Message):void{
    this.messages.next(message)
   }

   connect(url:string): AnonymousSubject<MessageEvent> {

        this.subject = this.create(url);
        console.log("Successfully connected: " + url);

        return this.subject;
    }

    

    create(url:string): AnonymousSubject<MessageEvent> {
        let ws = new WebSocket(url);
        let observable = new Observable((obs: Observer<MessageEvent>) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
      
        let observer: Observer<MessageEvent> = {
          next: (data: Object) => {
            console.log('Message sent to websocket: ', data);
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify(data));
            }
          },
          error: function (err: any): void {
          },
          complete: function (): void {
          }
        };



        return new AnonymousSubject<MessageEvent>(observer, observable);
    }


    updateRoom(roomAdress: any){

      this.CHAT_URL = `${this.BASE_URL}${roomAdress}/`
      console.log(this.CHAT_URL)
      this.messages = <Subject<Message>>this.connect(this.CHAT_URL).pipe(
        map(
            (response: MessageEvent): Message => {
                console.log(response.data);
                let data = JSON.parse(response.data)
                return data;
            }
        )
    );
      

    }
}

