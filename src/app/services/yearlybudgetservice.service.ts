import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Financialyear } from '../models/financialyear';
import { Normalledger } from '../models/normalledger.model';
import { Yearlybudget } from '../models/yearlybudget.mode';

@Injectable({
  providedIn: 'root'
})
export class YearlybudgetserviceService {

  constructor(private http: HttpClient) { }

  createYearlyBudget(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/yearlybudget`, data);
  }

  createYearlyBudgetDetails(id: any, data: Yearlybudget[]): Observable<any> {
    return this.http.post(`${environment.baseUrl}/yearlybudgetdetails/${id}`, data);
  }

  getYearlyBudgetMaster(id: any): Observable<Yearlybudget[]> {
    return this.http.get<Yearlybudget[]>(`${environment.baseUrl}/yearlybudget/${id}`);
  }
  getYearlyBudgetdetails(id: any): Observable<Yearlybudget[]> {
    return this.http.get<Yearlybudget[]>(`${environment.baseUrl}/yearlybudgetdetails/${id}`);
  }

  getExpenseLedgers(id: any): Observable<Normalledger[]> {
    return this.http.get<Normalledger[]>(`${environment.baseUrl}/expenseledgers/${id}`);
  }
  getFinancialYearlyBudgetdetails(): Observable<Yearlybudget[]> {
    return this.http.get<Yearlybudget[]>(`${environment.baseUrl}/financialyearlybudgetdetails`);
  }
  getYearlyBudgetdetailsHistory(id: any , lid : any): Observable<Yearlybudget[]> {
    return this.http.get<Yearlybudget[]>(`${environment.baseUrl}/yearlybudgetdetailshistory/${id}/${lid}`);
  }

  getAllFy(): Observable<Financialyear[]> {
    return this.http.get<Financialyear[]>(`${environment.baseUrl}/allfinancialyear`);
  }
  updateStatus(statusid:number, checkedby:number , approvedby:number , yid : number): Observable<any> {
    return this.http.put(`${environment.baseUrl}/updatestatusbudget/${statusid}/${checkedby}/${approvedby}/${yid}`,null);
  }

  updateBudgetDetailsandHistory(yhid: number ,row : Yearlybudget): Observable<any> {
    return this.http.put(`${environment.baseUrl}/yearlybudgetdetailsupdate/${yhid}`,row);
  }
  
  updateBudgetDetailsandHistoryRevise(yhid: number ,row : Yearlybudget): Observable<any> {
    return this.http.put(`${environment.baseUrl}/yearlybudgetdetailsupdaterevise/${yhid}`,row);
  }

  getYearlyBudgetHistofhistory(id: any): Observable<Yearlybudget[]> {
    return this.http.get<Yearlybudget[]>(`${environment.baseUrl}/yearlybudgetdetailshistofhistory/${id}`);
  }
}
