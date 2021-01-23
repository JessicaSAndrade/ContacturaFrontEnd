import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditUsersComponent implements OnInit {
  createEditUserForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    admin: new FormControl(''),
  });

  checked = false;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  createUser(){
    if(this.createEditUserForm.valid){
      Swal.fire({
        icon: 'success',
        title: 'Uuup...',
        text: 'Salvo com Sucesso',
      });
      this.router.navigate(['/user-list']);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos!',
      });
    }
  }
}