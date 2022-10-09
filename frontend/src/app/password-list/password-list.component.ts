import { Component, OnInit } from '@angular/core';

import { PasswordService } from '../services/password.service';
import { Password, PasswordResponse } from '../model/password';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent implements OnInit {
  passwords: Password[] = [];
  constructor(private passwordService: PasswordService) {}

  ngOnInit(): void {
    this.passwordService.getAllPassword().subscribe({
      next: (data: PasswordResponse) => (this.passwords = data.response),
      error: (error) => console.error(error),
    });
  }

  onEdit(id: number): void {}

  onDelete(i: number): void {}
}
