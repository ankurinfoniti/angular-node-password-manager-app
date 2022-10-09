import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Password } from '../model/password';
import { PasswordService } from '../services/password.service';

@Component({
  selector: 'app-password-add',
  templateUrl: './password-add.component.html',
  styleUrls: ['./password-add.component.css'],
})
export class PasswordAddComponent implements OnInit {
  @Input() set password(data: Password | null) {
    if (data) {
      this.type = 'Update';
      this._password = data;
      this.passwordForm.patchValue({
        website: data.website,
        username: data.username ? data.username : '',
        password: data.password ? data.password : '',
        otherLoginType: data.otherLoginType ? data.otherLoginType : '',
      });
    }
  }
  @Output() dataUpdated = new EventEmitter();
  type = 'Add';
  successAlert: boolean = false;
  dangerAlert: boolean = false;
  private _password: Password | null = null;
  passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      website: ['', Validators.required],
      username: [''],
      password: [''],
      otherLoginType: [''],
    });
  }

  get website() {
    return this.passwordForm.get('website');
  }

  saveData() {
    if (this.passwordForm.valid) {
      if (this._password) {
        let id = this._password.id ? this._password.id : 0;
        this.passwordService
          .updatePassword(this.passwordForm.value, id)
          .subscribe({
            next: (data) => {
              this.passwordForm.reset();
              this.type = 'Add';
              this._password = null;
              this.dataUpdated.emit();
              this.successAlert = true;
              this.dangerAlert = false;
            },
            error: (error) => {
              this.dangerAlert = true;
              this.successAlert = false;
              console.error(error);
            },
          });
      } else {
        this.passwordService.savePassword(this.passwordForm.value).subscribe({
          next: (data) => {
            this.passwordForm.reset();
            this.dataUpdated.emit();
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
      this.hideAlert();
    }
  }

  hideAlert() {
    setTimeout(() => {
      this.dangerAlert = false;
      this.successAlert = false;
    }, 2000);
  }
}
