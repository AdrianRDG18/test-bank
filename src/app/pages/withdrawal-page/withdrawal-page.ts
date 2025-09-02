import { Component } from '@angular/core';
import { Currency } from '../../interfaces/currency.interface';
import { AtmService } from '../../services/atm-service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WithDrawalResponse } from '../../interfaces/withdraw.interface';

@Component({
  selector: 'app-withdrawal-page',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './withdrawal-page.html',
  styles: ``
})
export class WithdrawalPage {

  amount: number = 0;
  inventory: Currency[] = [];
  result: WithDrawalResponse | undefined;
  message: string = '';
  atmTotalAmout: number = 0;

  constructor(private atmService: AtmService) {
    this.getTotalAmout();
    this.getTotalCurrencies();
  }

  getTotalAmout() {
    this.atmService.getTotalAmout().subscribe({
      next: (resp) => this.atmTotalAmout = resp.total,
      error: () => console.log()
    });
  }

  getTotalCurrencies() {
    this.atmService.getTotalCurrencies().subscribe({
      next: (resp) => this.inventory = resp.allCurrencies,
      error: () => console.log()
    });
  }

  withdraw() {
    this.atmService.withdraw(this.amount).subscribe({
      next: (resp) => this.result = resp,
      complete: () => {
        this.getTotalAmout();
        this.getTotalCurrencies();
      }
    });
  }

}
