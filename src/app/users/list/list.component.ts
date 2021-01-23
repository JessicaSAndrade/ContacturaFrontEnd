import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListUsersComponent implements OnInit {
  collection = {count: 1000, data: []};
  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.collection.count
  };
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Próximo'};
  constructor() {}

  ngOnInit(): void {
    this.populateElements();
  }

  // Método para popular os elementos da tabela com dados mocados
  populateElements(){
    for (let i = 0; i < this.collection.count; i++){
      this.collection.data.push({
        nome: 'teste' + i,
        username: 'email' + i + '@contactura.com',
        status: 'Admin'
      });
    }
  }

  // Método responsavel pela troca de paginas
  onPageChange(event){
    this.config.currentPage = event;
  }
}
