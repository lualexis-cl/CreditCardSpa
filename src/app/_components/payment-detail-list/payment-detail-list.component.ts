import { PaymentDetail } from './../../_models/payment-detail';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PaymentDetailService } from 'src/app/_services/payment-detail.service';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styleUrls: ['./payment-detail-list.component.css']
})
export class PaymentDetailListComponent implements OnInit {
  paymentList: PaymentDetail[];
  paymentEdit: PaymentDetail;
  @Output() messageEvent = new EventEmitter<PaymentDetail>();

  constructor(private service: PaymentDetailService) { }

  ngOnInit(): void {
    this.getPaymentList();
  }

  getPaymentList(): void {
    this.service.getPaymentList()
      .toPromise()
      .then(res => {
          this.paymentList = res as PaymentDetail[];
          console.log(this.paymentList);
        });
  }

  populatePayment(paymentDetail: PaymentDetail): void {
    this.messageEvent.emit(paymentDetail);
  }
}
