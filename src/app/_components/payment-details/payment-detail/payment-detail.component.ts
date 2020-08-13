import { PaymentDetail } from './../../../_models/payment-detail';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentDetailService } from 'src/app/_services/payment-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  form: FormGroup;

  constructor(private paymentDetailService: PaymentDetailService,
              private toastService: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      PMId: new FormControl(0),
      CardOwnerName: new FormControl('', [Validators.required]),
      CardNumber: new FormControl('', [Validators.required]),
      ExpirationDate: new FormControl('', [Validators.required]),
      CVV: new FormControl('', [Validators.required])
    });
  }

  get f(): any {
    return this.form.controls;
  }

  @Input('data')
  set data(data: PaymentDetail) {
    console.log(data);

    if (data != null) {
      this.form = new FormGroup({
        PMId: new FormControl(data.PMId),
        CardOwnerName: new FormControl(data.CardOwnerName, [Validators.required]),
        CardNumber: new FormControl(data.CardNumber, [Validators.required]),
        ExpirationDate: new FormControl(data.ExpirationDate, [Validators.required]),
        CVV: new FormControl(data.CVV, [Validators.required])
      });
    }
  }

  saveCreditCard(): void {
    console.log('submit');
    if (this.form.valid) {
      const payment = this.form.value as PaymentDetail;
      if (payment.PMId === 0) {
        this.createCreditCard(payment);
      } else {
        this.updateCreditCard(payment);
      }
    }
  }

  createCreditCard(payment: PaymentDetail): void {
    this.paymentDetailService.postPaymentDetail(payment)
        .subscribe(
          response => {
            this.toastService.success('Credit Card Created Successfully');
            this.form.reset();
            this.paymentDetailService.getList();
            console.log(response);
          }, err => {
            this.toastService.error('Something wrong!');
            console.log(err);
          }
        );
  }

  updateCreditCard(payment: PaymentDetail): void {
    this.paymentDetailService.putPaymentDetail(payment)
      .subscribe(response => {
        this.form.reset();
        this.paymentDetailService.getList();
      },
        err => {
          console.log(err);
        });
  }
}
