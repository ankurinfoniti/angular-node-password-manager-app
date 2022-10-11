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
  clickedList: any = {};

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

  copyPassword(password: string, index: number, event: HTMLElement) {
    navigator.clipboard.writeText(password);
    this.clickedList[index] = true;

    setTimeout(() => {
      delete this.clickedList[index];
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
