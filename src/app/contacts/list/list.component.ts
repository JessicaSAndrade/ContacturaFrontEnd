import { Component, OnInit } from '@angular/core';

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
        email: 'email' + i + '@contactura.com',
        fone: '(' + 0 + 1 + ')' + i + i + + i + i + i + '-' + i + i + i + i
      });
    }
  }

  // Método responsavel pela troca de paginas
  onPageChange(event){
    this.config.currentPage = event;
  }
}
