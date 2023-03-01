import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IContact } from './../../models/icontact';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss'],
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contacts: IContact[] = [];
  public loadedContacts: IContact[] = [];
  public errorMessage: string | null = null;
  public contactsFiltered: IContact[] = [];
  public searchString: string = '';

  public currentPage = 1;
  public itemsPerPage = 6;
  public numberOfContacts = 0;
  public numberOfContactsInDB = 0;
  public totalPages = 0;
  public disablePrevous = true;
  public disableNext = true;

  public contacts$: Observable<IContact[]> = {} as Observable<IContact[]>;

  constructor(private contactService: ContactService, public router: Router) {}

  ngOnInit(): void {
    this.getContactsPaginated();
  }

  public getContactsPaginated() {
    this.contactService
      .getContactsPaginated(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          this.numberOfContactsInDB = +response.headers.get('X-Total-Count')!;
          this.contacts = response.body!;
          this.loadedContacts = response.body!;
          this.contactsFiltered = response.body!;
          this.calculatePages();
          this.changePageButton();
        },
      });
  }

  submitDeleteContact(contactId: string) {
    this.contactService.deleteContact(contactId).subscribe({
      next: (data) => {
        this.router.navigateByUrl('/');
        this.getContactsPaginated();
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  searchUser(event: KeyboardEvent) {
    if (this.searchString == '') {
      this.getContactsPaginated();
    } else {
      this.contactService
        .searchByName(this.searchString, this.currentPage, this.itemsPerPage)
        .subscribe((data) => {
          this.numberOfContactsInDB = +data.headers.get('X-Total-Count')!;
          this.contacts = data.body!;
          this.contactsFiltered = data.body!;
          this.loading = false;
          this.calculatePages();
          this.changePageButton();
        });
      this.changePage(1);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.changePageButton();
    this.calculatePages();
    this.contactService
      .searchByName(this.searchString, page, this.itemsPerPage)
      .subscribe((data) => {
        this.contacts = data.body!;
        this.contactsFiltered = data.body!;
        this.loading = false;
        this.calculatePages();
        this.changePageButton();
      });
  }

  changePageButton() {
    if (this.currentPage == 1) {
      this.disablePrevous = true;
    } else {
      this.disablePrevous = false;
    }

    if (this.currentPage == this.totalPages) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
  }

  calculatePages() {
    this.numberOfContacts = this.numberOfContactsInDB;
    this.totalPages = Math.ceil(this.numberOfContacts / this.itemsPerPage);
  }
}
