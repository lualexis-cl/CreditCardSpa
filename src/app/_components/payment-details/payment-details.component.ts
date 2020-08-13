import { PaymentDetail } from './../../_models/payment-detail';
import { PaymentDetailListComponent } from './../payment-detail-list/payment-detail-list.component';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  @Output() messageToChild = new EventEmitter<PaymentDetail>();
  @ViewChild(PaymentDetailListComponent) childComponent;
  paymentDetail: PaymentDetail;

  constructor() { }

  ngOnInit(): void {
  }

  getPaymentEdit($event): void {
    this.paymentDetail = $event;
  }

}
