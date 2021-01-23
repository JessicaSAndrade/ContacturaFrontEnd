import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditContactsComponent implements OnInit {
  createEditForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  createContact(){
    if(this.createEditForm.valid){
      Swal.fire({
        icon: 'success',
        title: 'Uuup...',
        text: 'Salvo com Sucesso',
      });
      this.router.navigate(['/contacts-list']);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos!',
      });
    }
  }
}
