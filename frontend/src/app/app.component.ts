import { Component } from '@angular/core';

import { Password } from './model/password';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  notify = false;
  password: Password | null = null;

  constructor() {}

  /**
   * Used when data is inserted or updated
   */
  notifyUpdated() {
    this.notify = true;
    setTimeout(() => {
      this.notify = false;
    });
  }

  notifyUpdate(password: Password) {
    this.password = password;
  }
}
