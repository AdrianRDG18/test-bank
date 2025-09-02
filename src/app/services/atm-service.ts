import { Injectable } from '@angular/core';
import { Currency } from '../interfaces/currency.interface';
import { Observable, of } from 'rxjs';
import { WithDrawalResponse } from '../interfaces/withdraw.interface';

@Injectable({
  providedIn: 'root'
})
export class AtmService {

  private inventoryArr: Currency[] = [
    { type: 'Bill', denomination: 1000, quantity: 2 },
    { type: 'Bill', denomination: 500, quantity: 5 },
    { type: 'Bill', denomination: 200, quantity: 10 },
    { type: 'Bill', denomination: 100, quantity: 20 },
    { type: 'Bill', denomination: 50, quantity: 30 },
    { type: 'Bill', denomination: 20, quantity: 40 },
    { type: 'Coin', denomination: 10, quantity: 50 },
    { type: 'Coin', denomination: 5, quantity: 100 },
    { type: 'Coin', denomination: 2, quantity: 200 },
    { type: 'Coin', denomination: 1, quantity: 300 },
    { type: 'Coin', denomination: .5, quantity: 100 },
  ];

  get inventory(): Currency[] {
    return this.inventoryArr.map(item=> ({ ...item }));
  }

  get totalAmout(): number {
    return this.inventoryArr.reduce((acc, curr) => acc + curr.denomination * curr.quantity, 0);
  }

  withdraw(amountPesos: number): Observable<WithDrawalResponse> {

    if( amountPesos <=0 ) {
      return of({ success: false, message: 'The amout to withdrawn must be greater than 0', bills: null });
    }
    if( amountPesos > this.totalAmout ) {
      return of({ success: false, message: 'The ATB does not have enough money, sorry', bills: null });
    }

    let remainingDeliv = amountPesos;
    const billsUsed: Currency[] = [];

    for (let bill of this.inventoryArr) {

      if (remainingDeliv <= 0) break;

      const needed = Math.floor(remainingDeliv / bill.denomination);

      const numBillTaked = Math.min(needed, bill.quantity);

      if (numBillTaked > 0) {

        billsUsed.push({ ...bill, quantity: numBillTaked });

        remainingDeliv -= numBillTaked * bill.denomination;
        bill.quantity -= numBillTaked;
      }
    }

    return of({
      success: true,
      message: 'The withdrawal was successful',
      bills: billsUsed
    });
  }

}
