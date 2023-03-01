import { ContactService } from './../../services/contact.service';
import { IGroup } from './../../models/igroup';
import { IContact } from './../../models/icontact';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = {} as IGroup[];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe({
      next: (data) => {
        this.groups = data;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  public createSubmit() {
    this.contactService.createContact(this.contact).subscribe({
      next: (data) => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}
