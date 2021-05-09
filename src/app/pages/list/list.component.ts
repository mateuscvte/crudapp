import { logging } from 'protractor';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Person } from 'src/app/models/person';
import { MatDialog } from '@angular/material/dialog';
import { ModalListComponent } from './modal-list/modal-list.component';
import { log } from 'console';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: Person[] = [
    { id: 1, name: 'Otávio Luíz', age: 24, phone: 916334028 },
    { id: 2, name: 'Helena Castro', age: 16, phone: 940123634 },
    { id: 3, name: 'Luciana Guimarães', age: 21, phone: 936712300 },
  ];

  person: Person;

  displayedColumns: string[] = ['name', 'age', 'phone', 'actions'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addPerson() {
    const dialogRef = this.dialog.open(ModalListComponent);
    dialogRef.componentInstance.status = 'add'
    dialogRef.afterClosed().subscribe(() => {
      this.person = dialogRef.componentInstance.personItem;
      if (this.person && this.person.name && this.person.age && this.person.phone) {
        this.person.id = this.list.length + 1
        this.list.push(dialogRef.componentInstance.personItem);
        this.list = this.list.map(response => {
          return response;
        });
      }
      console.log(this.list, ' lista')
    })
  }

  editPerson(row) {
    const dialogRef = this.dialog.open(ModalListComponent);
    dialogRef.componentInstance.status = 'edit';
    dialogRef.afterOpened().subscribe(() => {
      dialogRef.componentInstance.itemForm.patchValue({
        id: row.id,
        name: row.name,
        age: row.age,
        phone: row.phone
      });
    });
    dialogRef.afterClosed().subscribe(() => {
      this.list.map(item => {
        if ((item.id === dialogRef.componentInstance.itemForm.value.id) &&
        (item.name !== dialogRef.componentInstance.itemForm.value.name ||
          item.age !== dialogRef.componentInstance.itemForm.value.age ||
          item.phone !== dialogRef.componentInstance.itemForm.value.phone)) {
          let item = this.list.indexOf(row);

          this.list.splice(item, 1);
          item = this.list.indexOf(row);

          this.list.push(dialogRef.componentInstance.itemForm.value);
          this.list = this.list.map(result => {
            return result
          })
        }
      })
    })
  }

  deletePerson(row: Person) {
    let item = this.list.indexOf(row);

    this.list.splice(item, 1);
    item = this.list.indexOf(row);

    this.list = this.list.map(result => {
      return result
    })

  }

}
