import { PaymentDetail } from './../_models/payment-detail';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  private readonly rootURL = 'http://localhost:51222/api/';
  paymentData: PaymentDetail = null;

  constructor(private http: HttpClient) {
  }

  postPaymentDetail(paymentDetail: PaymentDetail): Observable<object> {
    return this.http.post(this.rootURL + 'PaymentDetail', paymentDetail);
  }

  getPaymentList(): Observable<object> {
    return this.http.get(this.rootURL + 'PaymentDetail');
  }
}
