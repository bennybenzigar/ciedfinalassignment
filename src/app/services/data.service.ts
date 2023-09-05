import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private screenWidthSubject = new BehaviorSubject<number>(window.innerWidth);
  // {email:string, password:any}
  private isDivVisibleSubject = new BehaviorSubject<boolean>(true);
  authenticated: boolean = false
  loginData$: Observable<any> = of({ email: 'abc@gmail.com', password: 'abc123' })
  cardData$:Observable<any>=from([{type:'Total Users', amount:1500, percentage:2.36, month:'Since last month'},
  {type:'Savings Account', amount:1500, percentage:2.36, month:'Since last month'},
  {type:'Savings Account', amount:1500, percentage:2.36, month:'Since last month'},
  {type:'Savings Account', amount:1500, percentage:2.36, month:'Since last month'}])
  tableData$: Observable<any> = from([
    { name: 'Monicca James', userId: '123456789', phonenumber: '+91 9876543210', transactionCategory: {type:'Income', category:'Salary'}, transactionAmount: '$200', accountType: 'Savings', balanceAmount: '$6000' },
    { name: 'Samantha', userId: '123456789', phonenumber: '+91 9876543210', transactionCategory: {type:'Income', category:'Salary'}, transactionAmount: '$200', accountType: 'Savings', balanceAmount: '$6000' }, 
    
    { name: 'Catherine',userId: '123456789',phonenumber: '+91 9876543210', transactionCategory: {type:'Income', category:'Salary'}, transactionAmount: '$200', accountType: 'Savings', balanceAmount: '$6000' },
    { name: 'Monicca James', userId: '123456789', phonenumber: '+91 9876543210', transactionCategory: {type:'Income', category:'Salary'}, transactionAmount:  '$200', accountType: 'Savings', balanceAmount: '$6000' }, 
    { name: 'Ileana ', userId: '123456789', phonenumber: '+91 9876543210', transactionCategory: {type:'Income', category:'Salary'}, transactionAmount:  '$200', accountType: 'Savings', balanceAmount: '$6000' }
    ,
    { name: 'Monicca James', userId: '123456789', phonenumber: '+91 9876543210', transactionCategory: {type:'Income', category:'Salary'}, transactionAmount: '$200', accountType: 'Savings', balanceAmount: '$6000' },
    { name: 'Samantha', userId: '123456789', phonenumber: '+91 9876543210', transactionCategory: {type:'Income', category:'Salary'}, transactionAmount: '$200', accountType: 'Savings', balanceAmount: '$6000' }, 
    
    // { name: 'Catherine',userId: '123456789',phonenumber: '+91 9876543210', transactionCategory: {type:'Income', category:'Salary'}, transactionAmount: '$200', accountType: 'Savings', balanceAmount: '$6000' },
    // { name: 'Monicca James', userId: '123456789', phonenumber: '+91 9876543210', transactionCategory: {type:'Income', category:'Salary'}, transactionAmount:  '$200', accountType: 'Savings', balanceAmount: '$6000' }, 
    // { name: 'Ileana ', userId: '123456789', phonenumber: '+91 9876543210', transactionCategory: {type:'Income', category:'Salary'}, transactionAmount:  '$200', accountType: 'Savings', balanceAmount: '$6000' }
    
  ])
  constructor(private http: HttpClient) {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  getFlags() {
    return this.http.get<any>('https://restcountries.com/v3.1/independent?status=true')
  }

  isAuthenticated() {

    return this.authenticated
  }

  private onResize(): void {
  
    this.screenWidthSubject.next(window.innerWidth);
  }

  getScreenWidth(): Observable<number> {
    return this.screenWidthSubject.asObservable();
  }

  
  setDivVisibility(isVisible: boolean) {
    this.isDivVisibleSubject.next(isVisible);
  }

  getDivVisibility(): Observable<boolean> {
    return this.isDivVisibleSubject.asObservable();
  }
}
