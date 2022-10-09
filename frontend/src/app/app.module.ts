import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { SimpleModalModule } from 'ngx-simple-modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { PasswordAddComponent } from './password-add/password-add.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PasswordListComponent,
    PasswordAddComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SimpleModalModule.forRoot({ container: 'modal-container' }),
  ],
  providers: [],
  entryComponents: [ConfirmComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
