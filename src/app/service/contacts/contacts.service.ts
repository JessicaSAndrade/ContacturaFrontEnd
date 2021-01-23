import { Injectable } from '@angular/core';
import { Contacts } from '../../models/contacts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { EventEmitter } from '@angular/core'; //Emissor do evento do click do botão em comunicação com a tela de createEdit
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
 
  api_url = environment.api_url;
  username = 'jessica.andrade@contactura.com.br';
  password = 'root';
  // public botaoEdit = new EventEmitter<Contacts>();
  private dataEdit = new BehaviorSubject<Contacts>(null);
  botaoEdit = this.dataEdit.asObservable();
 
  constructor(private http: HttpClient) { 
  }

  getContacts() {
  const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
   return this.http.get<Contacts[]>(this.api_url,{headers}).pipe(
    map(
      contactData => {
        if(contactData){
          return contactData;
        }else{
          return [];
        }
      }
    )
   );
 }

 createContacts(contacts: Contacts){
   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
   return this.http.post<Contacts>(this.api_url, contacts, {headers}).pipe(
     map(
       contactData => {
         return contactData;
       }
     )
   )
 }

 getContactsForList(contacts: Contacts){
   this.dataEdit.next(contacts);
  // this.botaoEdit.emit(contacts);
 }

 deleteContacts(id: number){
  const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
  return this.http.delete<Contacts>(this.api_url + '/' + id, {headers}).pipe(
    map(
      contactData => {
        return contactData;
      }
    )
  )
 }

 findContactById(id: number){
  const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
  return this.http.get<Contacts>(this.api_url + '/' + id, {headers}).pipe(
    map(
      contactData => {
        return contactData;
      }
    )
  )
 }

 updateContacts(contacts: Contacts){
   const id = contacts.id;
  const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
  return this.http.put<Contacts>(this.api_url + '/' + id, contacts, {headers}).pipe(
    map(
      contactData => {
        return contactData;
      }
    )
  )
}
}
