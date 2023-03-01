import { ActivatedRoute, Router } from '@angular/router';
import { IGroup } from './../../models/igroup';
import { IContact } from './../../models/icontact';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  public loading: boolean = true;
  public errorMessage: string | null = null;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public groups: IGroup[] = [] as IGroup[];

  constructor(
    private contactService: ContactService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.contactId = params.get('contactId');
    });
    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe({
        next: (data) => {
          this.contact = data;
          this.contactService.getAllGroups().subscribe((groups) => {
            this.groups = groups;
          });
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        },
      });
    }
  }

  submitUpdate(): void {
    if (this.contactId) {
      this.contactService
        .updateContact(this.contact, this.contactId)
        .subscribe({
          next: (data) => {
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            this.errorMessage = error;
            this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
          },
        });
    }
  }
}
