import { PaymentDetail } from './../../_models/payment-detail';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PaymentDetailService } from 'src/app/_services/payment-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styleUrls: ['./payment-detail-list.component.css']
})
export class PaymentDetailListComponent implements OnInit {

  paymentEdit: PaymentDetail;
  @Output() messageEvent = new EventEmitter<PaymentDetail>();

  constructor(public service: PaymentDetailService,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.getPaymentList();
  }

  getPaymentList(): void {
    this.service.getList();
  }

  populatePayment(paymentDetail: PaymentDetail): void {
    this.messageEvent.emit(paymentDetail);
  }

  deletePayment(id: number): void {
    this.service.deletePayment(id)
      .subscribe(response => {
        this.toast.success('Record deleted successfully');
        this.service.getList();
      }, err => {
        this.toast.error('Something wrong!');
        console.log(err);
      });
  }
}
