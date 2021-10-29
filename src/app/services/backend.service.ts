import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  loggedInStatus: boolean=false;
   user : User[]=[];
    constructor( private http: HttpClient){ }
    
    getUsers(){
    return this.http.get<User[]>('http://localhost:3000/users');
    
    }
    // getCd(id: number){
    //     return this.http.get<CdDetails[]>('http://localhost:3000/cd/'+id);
    // }

    // getDetails(){
    //     return this.http.get<CdDetails[]>('http://localhost:3000/cd');
    // }
    // getGenreCd(genre: string){
    //     return this.http.get<CdDetails[]>('http://localhost:3000/cd?q='+genre);
    // }
    getPurchasedHistory(){
        return this.http.get('http://localhost:3000/purchase');
    }
   
    
    deleteUser(id: number){
        return this.http.delete('http://localhost:3000/users/'+id);
    }
    // getOrders(clientId: number){
    //     return this.http.get<CdDetails[]>('http://localhost:3000/orders?clientId='+clientId);
    // }
    deleteOrder(id: number){
        return this.http.delete('http://localhost:3000/orders/'+id);
    }
    deleteProduct(id: number){
        return this.http.delete('http://localhost:3000/cd/'+id);
    }
    getUserByEmail(email: string){
        return this.http.get<User[]>('http://localhost:3000/users?email='+email);
    }
}
