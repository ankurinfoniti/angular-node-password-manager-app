import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SimpleModalService } from 'ngx-simple-modal';

import { ConfirmComponent } from '../confirm/confirm.component';
import { PasswordService } from '../services/password.service';
import {
  Password,
  PasswordReturnResponse,
  PasswordResponse,
} from '../model/password';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent implements OnInit {
  @Input() set dataChanged(data: boolean) {
    if (data) {
      this.getAllPassword();
    }
  }
  @Output() updatePassword = new EventEmitter<Password>();
  passwords: Password[] = [];
  successAlert: boolean = false;
  dangerAlert: boolean = false;

  checkedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                </svg>`;

  copyClipIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                  <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
                </svg>`;

  constructor(
    private passwordService: PasswordService,
    private SimpleModalService: SimpleModalService
  ) {}

  ngOnInit(): void {
    this.getAllPassword();
  }

  getAllPassword(): void {
    this.passwordService.getAllPassword().subscribe({
      next: (data: PasswordResponse) => (this.passwords = data.response),
      error: (error) => console.error(error),
    });
  }

  trackByFn(index: number) {
    return index;
  }

  copyPassword(password: string, event: HTMLElement) {
    navigator.clipboard.writeText(password);
    event.innerHTML = this.checkedIcon;
    setTimeout(() => {
      event.innerHTML = this.copyClipIcon;
    }, 3000);
  }

  onEdit(password: Password): void {
    this.updatePassword.emit(password);
  }

  onDelete(id: number): void {
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Do you really want to delete?',
    }).subscribe((isConfirmed) => {
      // Get modal result
      if (isConfirmed) {
        this.passwordService.deletePassword(id).subscribe({
          next: (data: PasswordReturnResponse) => {
            this.getAllPassword();
            this.successAlert = true;
            this.dangerAlert = false;
          },
          error: (error) => {
            this.dangerAlert = true;
            this.successAlert = false;
            console.error(error);
          },
        });
      }
    });
  }
}
