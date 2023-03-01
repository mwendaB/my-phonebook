import { IContact } from './../models/icontact';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IGroup } from '../models/igroup';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private serverURL: string = 'http://localhost:9000';

  constructor(private httpClient: HttpClient) {}

  public getAllContacts(): Observable<IContact[]> {
    let dataURL: string = `${this.serverURL}/contacts`;
    return this.httpClient
      .get<IContact[]>(dataURL)
      .pipe(catchError(this.handleError));
  }

  public getContactsPaginated(page: number, limit: number) {
    let dataURL: string = `${this.serverURL}/contacts?_page=${page}&_limit=${limit}`;
    return this.httpClient
      .get<IContact[]>(dataURL, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public getContact(contactId: string): Observable<IContact> {
    let dataURL: string = `${this.serverURL}/contacts/${contactId}`;
    return this.httpClient
      .get<IContact>(dataURL)
      .pipe(catchError(this.handleError));
  }

  public createContact(contact: IContact): Observable<IContact> {
    let dataURL: string = `${this.serverURL}/contacts`;
    return this.httpClient
      .post<IContact>(dataURL, contact)
      .pipe(catchError(this.handleError));
  }

  public updateContact(
    contact: IContact,
    contactId: string
  ): Observable<IContact> {
    let dataURL: string = `${this.serverURL}/contacts/${contactId}`;
    return this.httpClient
      .put<IContact>(dataURL, contact)
      .pipe(catchError(this.handleError));
  }

  public deleteContact(contactId: string): Observable<{}> {
    let dataURL: string = `${this.serverURL}/contacts/${contactId}`;
    return this.httpClient
      .delete<{}>(dataURL)
      .pipe(catchError(this.handleError));
  }

  public getAllGroups(): Observable<IGroup[]> {
    let dataURL: string = `${this.serverURL}/groups`;
    return this.httpClient
      .get<IGroup[]>(dataURL)
      .pipe(catchError(this.handleError));
  }
  public getGroup(contact: IContact): Observable<IGroup> {
    let dataURL: string = `${this.serverURL}/groups/${contact.groupId}`;
    return this.httpClient
      .get<IGroup>(dataURL)
      .pipe(catchError(this.handleError));
  }

  public searchByName(searchName: string, page: number, limit: number) {
    let dataURL: string = `${this.serverURL}/contacts?name_like=${searchName}&_limit=6&_page=${page}&_limit=${limit}`;
    return this.httpClient
      .get<IContact[]>(dataURL, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Client error ' + error.error.message;
    } else {
      errorMessage = 'Server error ' + error.error.message + ' ' + error.status;
    }
    return throwError(errorMessage);
  }

  getAllContactsObservableWay(): Observable<any> {
    return this.httpClient.get(this.serverURL).pipe();
  }
}
