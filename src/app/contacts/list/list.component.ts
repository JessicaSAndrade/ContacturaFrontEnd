import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from 'src/app/service/contacts/contacts.service';
import Swal from 'sweetalert2';
import { Contacts } from '../../models/contacts';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListContactsComponent implements OnInit {
  collection = {count: 1000, data: []};
  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };
  contactLits: Contacts[];
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Próximo'};
  constructor(public contactService: ContactsService, public router: Router) {}

  ngOnInit(): void {
    // this.populateElements();
    this.getContacts();
  }

  // Método para popular os elementos da tabela com dados mocados
  // populateElements(){
  //   for (let i = 0; i < this.collection.count; i++){
  //     this.collection.data.push({
  //       nome: 'teste' + i,
  //       email: 'email' + i + '@contactura.com',
  //       fone: '(' + 0 + 1 + ')' + i + i + + i + i + i + '-' + i + i + i + i
  //     });
  //   }
  // }

  // Método responsavel pela troca de paginas
  onPageChange(event){
    this.config.currentPage = event;
  }

  getContacts() {
      (this.contactService.getContacts().subscribe(
          data => {
            this.contactLits = data;
            this.config.totalItems = this.contactLits.length;
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro no retorno da requisição!',
            });
          }
        )
      );
  }

  deleteContacts(id: number){
    this.contactService.deleteContacts(id).subscribe(
      data => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Contato Deletado com Sucesso!',
        });
        this.getContacts();
      },
      error =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro no retorno da requisição!',
        }); 
      }
    )

  }

  editContact(contacts: Contacts){
    this.contactService.getContactsForList(contacts);
    this.router.navigate(['/contacts-create-edit']);
  }

  find(id: number){
    this.contactService.findContactById(id).subscribe(
      data => {
        console.log(data);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Contato Deletado com Sucesso!',
        // });
        // this.getContacts();
      },
      error =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro no retorno da requisição!',
        }); 
      }
    )

  }


}
