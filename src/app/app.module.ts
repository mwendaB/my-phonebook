import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { ContactManagerComponent } from './components/contact-manager/contact-manager.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import {HttpClientModule} from "@angular/common/http"
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavbarComponent,
    ContactManagerComponent,
    EditContactComponent,
    SpinnerComponent,
    ViewContactComponent,
    AddContactComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
