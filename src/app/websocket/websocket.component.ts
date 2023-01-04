import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message, WebsocketService } from '../services/websocket/websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css'],
  providers: [WebsocketService]
})
export class WebsocketComponent implements OnInit{

  title: string = 'socketrv';
  content: string = '';
  received: Message[] = [];
  sent: Message[] = [];

  changeRoomForm: FormGroup = new FormGroup({
    room: new FormControl(),
  });


  constructor(private websocket: WebsocketService) {

  }

  
  ngOnInit(): void {
    this.websocket.getMessages().subscribe((msg:Message) => {
      this.received.push(msg);
      console.log("Response from websocket: " + msg);
    });
  }


  sendMsg() {
    let message = {
      sender: '',
      text: '',
      type: 'text_message'
    };
    message.sender = 'localhost';
    message.text = this.content;

    this.sent.push(message);
    this.websocket.addMessage(message);
  }

  changeRoom() {
    this.websocket.updateRoom(this.changeRoomForm.value.room)

  }

}
