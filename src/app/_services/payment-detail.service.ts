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
  paymentList: PaymentDetail[];

  constructor(private http: HttpClient) {
  }

  postPaymentDetail(paymentDetail: PaymentDetail): Observable<object> {
    return this.http.post(this.rootURL + 'PaymentDetail', paymentDetail);
  }

  putPaymentDetail(paymentDetail: PaymentDetail): Observable<object> {
    return this.http.put(this.rootURL + 'PaymentDetail/' + paymentDetail.PMId, paymentDetail);
  }

  getPaymentList(): Observable<object> {
    return this.http.get(this.rootURL + 'PaymentDetail');
  }

  getList(): void {
    this.getPaymentList()
      .toPromise()
      .then(list => {
        this.paymentList = list as PaymentDetail[];
      });
  }

  deletePayment(id: number): Observable<object> {
    return this.http.delete(this.rootURL + 'PaymentDetail/' + id);
  }
}
