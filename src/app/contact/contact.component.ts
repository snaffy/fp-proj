import {Component, ElementRef, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ContactService} from '../core/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  submitted = false;
  createContactResult = false;

  constructor(private formBuilder: FormBuilder,
              private elementRef: ElementRef,
              private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  // TODO think about other solution
  get ref() {
    return this.elementRef;
  }

  get form() {
    return Object.assign({}, this.contactForm);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }
    this.createNewContact();
    this.createContactResult = true;
  }

  private createNewContact(): void {
    const controls = this.contactForm.controls;
    const message = {email: controls.email.value, message: controls.message.value};
    this.contactService.addContact(message);
  }
}
