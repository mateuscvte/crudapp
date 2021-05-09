import { Person } from './../../../models/person';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.component.html',
  styleUrls: ['./modal-list.component.css']
})
export class ModalListComponent implements OnInit {

  itemForm: FormGroup;
  personItem: Person; 
  status: string;
  list: Person[] = [];

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {

    this.itemForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
      name: this.formBuilder.control('', [Validators.required, Validators.maxLength(150)]),
      age: this.formBuilder.control('', [Validators.required, Validators.max(100)]),
      phone: this.formBuilder.control(''),
    });

   }

  ngOnInit(): void {
  }

  sendItem() {
    this.personItem = this.itemForm.value;
    console.log(this.personItem);
    this.dialog.closeAll()
  }

  updateItem() {
    this.personItem = this.itemForm.value;
    this.dialog.closeAll();
  }

  closeDialog() {
    this.itemForm.reset();
    this.dialog.closeAll()
  }

}
