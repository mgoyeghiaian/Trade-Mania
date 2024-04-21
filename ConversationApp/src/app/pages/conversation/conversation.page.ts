import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  userData = {
    name: 'Fatima Abdullah',
    imageUrl: 'assets/like1.jpg'
  };
  messageText = '';
  isRecording = false;
  messages = [
    { text: 'Hello Mortada', timestamp: '18:34', mine: false },
    { text: 'Hi Fatima, I have nothing to say to you, but if you like avocados we can have a salad', timestamp: '18:35', mine: true },
    { text: 'I hope you live nearby, I don’t like driving long distances', timestamp: '18:38', mine: false }
  ];

  constructor() {}

  sendMessage() {
    if (this.messageText.trim()) {
      this.messages.push({
        text: this.messageText,
        mine: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.messageText = '';
    }
  }

  toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  startRecording() {
    this.isRecording = true;
  }

  stopRecording() {
    this.isRecording = false;

    this.messages.push({
      text: 'Audio message sent',
      mine: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }

  ngOnInit() {}
}
