import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  activeTab: string = 'chats';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
