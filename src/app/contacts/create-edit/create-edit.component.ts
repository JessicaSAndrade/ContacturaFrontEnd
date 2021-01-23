import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contacts } from 'src/app/models/contacts';
import { ContactsService } from 'src/app/service/contacts/contacts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditContactsComponent implements OnInit, OnDestroy {
  createEditForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  contacts: Contacts;
  constructor(public router: Router, public contactService: ContactsService) { 
    console.log('teste');
  }

  edit: boolean = false;

  ngOnInit(): void {
    this.contactService.botaoEdit.subscribe( edit =>{
      console.log(edit);
        if(edit){
          this.edit  = true;
          this.createEditForm.get('id').setValue(edit.id);
          this.createEditForm.get('name').setValue(edit.name);
          this.createEditForm.get('phone').setValue(edit.phone);
          this.createEditForm.get('email').setValue(edit.email);
        }
      }
    );
  }

  ngOnDestroy(){
    this.createEditForm.reset();
    this.createEditForm.get('id').patchValue(' ');
    this.createEditForm.get('name').patchValue(' ');
    this.createEditForm.get('phone').patchValue(' ');
    this.createEditForm.get('email').patchValue(' ');
  }

  // createContact(){
  //   if(this.createEditForm.valid){
  //     // Swal.fire({
  //     //   icon: 'success',
  //     //   title: 'Uuup...',
  //     //   text: 'Salvo com Sucesso',
  //     // });
  //     // this.router.navigate(['/contacts-list']);
  //   }else{
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Preencha todos os campos!',
  //     });
  //   }
  // }

  createContact() {
    if(this.createEditForm.valid){
      this.contacts = this.createEditForm.value;
      this.contactService.createContacts(this.contacts).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'Usuario criado com sucesso!',
          });
          this.router.navigate(['/contacts-list']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro no retorno da requisição!',
          });
        }
      )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos!',
      });
    }
}



editContact() {
  if(this.createEditForm.valid){
    this.contacts = this.createEditForm.value;
    this.contactService.updateContacts(this.contacts).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Oops...',
          text: 'Usuario editado com sucesso!',
        });
        this.router.navigate(['/contacts-list']);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Eeeba...',
          text: 'Erro no retorno da requisição!',
        });
      }
    )
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Preencha todos os campos!',
    });
  }
}
}
