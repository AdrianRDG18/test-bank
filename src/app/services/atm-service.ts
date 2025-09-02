import { inject, Injectable } from '@angular/core';
import { Currency } from '../interfaces/currency.interface';
import { catchError, Observable, of } from 'rxjs';
import { WithDrawalResponse } from '../interfaces/withdraw.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtmService {

  private _httpclient = inject(HttpClient);

  getTotalAmout(){
    return this._httpclient.get<WithDrawalResponse>(`http://localhost:3002/api/currency/get-total`, {}).pipe(
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
  }

  getTotalCurrencies(){
    return this._httpclient.get<WithDrawalResponse>(`http://localhost:3002/api/currency`, {}).pipe(
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
  }

  withdraw(amount: number): Observable<WithDrawalResponse> {
    return this._httpclient.post<WithDrawalResponse>(`http://localhost:3002/api/withdraw`, { amount: amount }).pipe(
      catchError((error) => {
        console.log(error);
        return of(error.error);
      })
    );
  }

}
