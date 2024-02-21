import { DatePipe } from '@angular/common';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identity, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gstdetails } from '../models/gstdetails.model';
import { Itdetails } from '../models/itdetails.model';
import { OfficeAccount } from '../models/officeaccount.model';
import { OfficeLedgerMapping } from '../models/officeledgermapping.model';
import { Salenotereconcile } from '../models/salenotereconcile.model';
import { Voucher } from '../models/voucher.model';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getVoucherinfo(id: any): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/selectedvoucherstable/${id}`);
  }

  getAll(id: any, uid: any): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/voucherstable/${id}/${uid}`);
  }

  getVoucherdetails(id: any): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/voucherdetails/${id}`);
  }

   create(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/vouchers`, data);
  }
  getAllVouchers(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/vouchers`);
  }
  addVoucherdetails(id: any,cid : number, data: Voucher[]): Observable<any> {
    return this.http.post(`${environment.baseUrl}/voucherdetails/${id}/${cid}`, data);
  }
  getCompanies(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/companies`);
  }

  getVoucherTypes(id: any): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/vouchertypes/${id}`);
  }

  getAllVoucherTypes(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/vouchertypes`);
  }
  getLedgers(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/normalledger`);
  }
  getCurrency(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/currency`);
  }

  upload(file: File, filename: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    console.log(file);
    formData.append('file', file, filename);
    const req = new HttpRequest('POST', `${environment.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    console.log(formData);
    return this.http.request(req);
  }
  getFiles(id: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/fileslist/${id}`);
  }
  uploadFile(file: File, moduleType: string) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('moduleType', moduleType);

    console.log(formData);
    return this.http.post(`${environment.baseUrl}/files/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  SaveFileInfo(data: any): Observable<any> {


    return this.http.post(`${environment.baseUrl}/fileinfo`, data);
  }

  deleteFile(filename: any): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/deletefiles/${filename}`);
  }

  dayBookView(vouchertypeid: number, companyid: number, vouchernumber: string, fromdate: Date, todate: Date): Observable<Voucher[]> {
    console.log(vouchertypeid);
    let params = new HttpParams()
    params = params.set('vouchertypeid', (vouchertypeid == null) ? 0 : vouchertypeid);
    params = params.set('companyid', (companyid == null) ? 0 : companyid);
    params = params.set('vouchernumber', vouchernumber);
    if (fromdate != null) {
      params = params.set('fromdate', fromdate.toDateString());

      console.log(fromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('fromdate', nulldate.toDateString());
    }

    if (todate != null) {
      params = params.set('todate', todate.toDateString());
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('todate', nulldate.toDateString());
    }
    console.log(params)
    return this.http.get<Voucher[]>(`${environment.baseUrl}/getdaybook`, { params: params });
  }

  updateVoucherAmount(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/vouchers/${id}`, data);
  }
  openDayBook(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/dayBookOpenByCompany`, data);
  }
  closeDayBook(id: any, date : Date): Observable<any> {
    return this.http.put(`${environment.baseUrl}/dayBookCloseByCompany/${id}/${date}`, null);
  }

  dayBookBind(daybookfromdate : Date, uid : number): Observable<Voucher[]> {
    let params = new HttpParams()
    if (daybookfromdate != null) {
      params = params.set('fromdate', daybookfromdate.toDateString());

      console.log(daybookfromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('fromdate', nulldate.toDateString());
    }

    params = params.set('userid', uid);

    return this.http.get<Voucher[]>(`${environment.baseUrl}/daybookopenclosebind`, { params: params });
  }

  cashBookView(daybookfromdate: Date, daybooktodate: Date,aid :number): Observable<Voucher[]> {

    let params = new HttpParams()
    if (daybookfromdate != null) {
      params = params.set('daybookfromdate', daybookfromdate.toDateString());

      console.log(daybookfromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('daybookfromdate', nulldate.toDateString());
    }

    if (daybooktodate != null) {
      params = params.set('daybooktodate', daybooktodate.toDateString());
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('daybooktodate', nulldate.toDateString());
    }
    params = params.set('aid', aid);
    return this.http.get<Voucher[]>(`${environment.baseUrl}/getcashbook`, { params: params });
  }

  trailBalanceLedger(fromdate: Date, todate: Date): Observable<any> {
    let params = new HttpParams()
    if (fromdate != null) {
      params = params.set('fromdate', fromdate.toDateString());

      console.log(fromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('fromdate', nulldate.toDateString());
    }

    if (todate != null) {
      params = params.set('todate', todate.toDateString());
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('todate', nulldate.toDateString());
    }
    return this.http.get(`${environment.baseUrl}/trailbalanceledger`, { params: params });
  }


  trailBalanceDetailed(fromdate: Date, todate: Date): Observable<any> {
    let params = new HttpParams()
    if (fromdate != null) {
      params = params.set('fromdate', fromdate.toDateString());

      console.log(fromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('fromdate', nulldate.toDateString());
    }

    if (todate != null) {
      params = params.set('todate', todate.toDateString());
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('todate', nulldate.toDateString());
    }
    return this.http.get(`${environment.baseUrl}/trailbalancedetailed`, { params: params });
  }


  trailBalanceGroup(fromdate: Date, todate: Date): Observable<any> {
    let params = new HttpParams()
    if (fromdate != null) {
      params = params.set('fromdate', fromdate.toDateString());

      console.log(fromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('fromdate', nulldate.toDateString());
    }

    if (todate != null) {
      params = params.set('todate', todate.toDateString());
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('todate', nulldate.toDateString());
    }

    return this.http.get(`${environment.baseUrl}/trailbalancegroup`, { params: params });
  }


  trailBalanceGroupDetailed(fromdate: Date, todate: Date): Observable<any> {
    let params = new HttpParams()
    if (fromdate != null) {
      params = params.set('fromdate', fromdate.toDateString());

      console.log(fromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('fromdate', nulldate.toDateString());
    }

    if (todate != null) {
      params = params.set('todate', todate.toDateString());
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('todate', nulldate.toDateString());
    }

    return this.http.get(`${environment.baseUrl}/trailbalancedetailedgroup`, { params: params });
  }
  profitLossBind(fromdate: Date, todate: Date): Observable<any> {
    let params = new HttpParams()
    if (fromdate != null) {
      params = params.set('fromdate', fromdate.toDateString());

      console.log(fromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('fromdate', nulldate.toDateString());
    }

    if (todate != null) {
      params = params.set('todate', todate.toDateString());
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('todate', nulldate.toDateString());
    }

    return this.http.get(`${environment.baseUrl}/profitloss`, { params: params });
  }

  getCashBankBalance(id: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/cashbankbalance/${id}`);
  }
  getExpIncomeBalance(id: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}/expincomebalance/${id}`);
  }
  balanceSheetBind(fromdate: Date, todate: Date): Observable<any> {
    let params = new HttpParams()
    if (fromdate != null) {
      params = params.set('fromdate', fromdate.toDateString());

      console.log(fromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('fromdate', nulldate.toDateString());
    }

    if (todate != null) {
      params = params.set('todate', todate.toDateString());
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('todate', nulldate.toDateString());
    }

    return this.http.get(`${environment.baseUrl}/balancesheet`, { params: params });
  }

  updateStatus(vid: number, stid: number, approvedby: number, checkedby: number,remarks:String,vdate: Date): Observable<any> {
    var vdatee = this.datePipe.transform(vdate, 'yyyy-MM-dd');

    return this.http.put(`${environment.baseUrl}/updatestatusvoucher/${vid}/${stid}/${approvedby}/${checkedby}/${vdatee}`, remarks);
  }
  getOfficeLedgers(cid: number): Observable<OfficeLedgerMapping> {
    return this.http.get<OfficeLedgerMapping>(`${environment.baseUrl}/officeledgers/${cid}`);
  }
  getDrLedgers(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/drledgers`);
  }
  getCrLedgers(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/crledgers`);
  }
  createPaymentDetails(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/paymentdetailsvoucher`, data);
  }

  getAllHsnsac(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/getallhsnsac`);
  }
  getAllCredHsnsac(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/getcrhsnsac`);
  }
  getAllDebitHsnsac(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/getdrhsnsac`);
  }
  updateVoucherDetails(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/voucherdetailsupdate/${id}`, data);
  }
  getCompaniesByUser(id: any): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/companybyuser/${id}`);
  }

  getCompaniesByUserCompany(uid: any,cid : any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/companybyuseroffice/${uid}/${cid}`);
  }

  vouchersReportView(vouchertypeid: number, companyid: number, vouchernumber: string, fromdate: Date, todate: Date,aid: number): Observable<Voucher[]> {
    console.log(vouchertypeid);
    let params = new HttpParams()
    params = params.set('vouchertypeid', (vouchertypeid == null) ? 0 : vouchertypeid);
    params = params.set('companyid', (companyid == null) ? 0 : companyid);
    params = params.set('vouchernumber', vouchernumber);
    params = params.set('aid', (aid == null) ? 0 : aid);

    if (fromdate != null) {
      params = params.set('fromdate', fromdate.toDateString());

      console.log(fromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('fromdate', nulldate.toDateString());
    }

    if (todate != null) {
      params = params.set('todate', todate.toDateString());
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('todate', nulldate.toDateString());
    }
    console.log(params)
    return this.http.get<Voucher[]>(`${environment.baseUrl}/getvouchersreportview`, { params: params });
  }

  getOfficeAccounts(uid: number): Observable<OfficeAccount[]> {
    return this.http.get<OfficeAccount[]>(`${environment.baseUrl}/officeaccounts/${uid}`);
  }

  getGstLedgers(cid: number): Observable<Gstdetails[]> {
    return this.http.get<Gstdetails[]>(`${environment.baseUrl}/gstbuyervendor/${cid}`);
  }
  getItLedgers(cid: number): Observable<Itdetails[]> {
    return this.http.get<Itdetails[]>(`${environment.baseUrl}/itbuyervendor/${cid}`);
  }
  getInv(): Observable<Gstdetails[]> {
    return this.http.get<Gstdetails[]>(`${environment.baseUrl}/vouchers/invoicemasterview`);
  }
  addgstitdetails(id: any, data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/voucherdetails/gstit/${id}`, data);
  }

  getAllBranches(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/vouchers/branches`);
  }
  getLastVd(compid : number): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/vouchers/getlastvoucherdetails/${compid}`);
  }
  getLastVdtest(compid : number,aid : number): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/vouchers/getlastvoucherdetails/${compid}/${aid}`);
  }

  opBalance(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/vouchers/openingbalance`, data);
  }
  getOpBalance(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/vouchers/getopeningbalance`);
  }

  getAccounts(oid: number): Observable<OfficeAccount[]> {
    return this.http.get<OfficeAccount[]>(`${environment.baseUrl}/accounts/${oid}`);
  }
  getAccountsVoucher(oid: number): Observable<OfficeAccount[]> {
    return this.http.get<OfficeAccount[]>(`${environment.baseUrl}/accountsvoucher/${oid}`);
  }

  getVoucherdetailsreconcile(oid: any,vid: any): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/voucherdetailsreconcile/${oid}/${vid}`);
  }
  getGstIt(): Observable<Gstdetails[]> {
    return this.http.get<Gstdetails[]>(`${environment.baseUrl}/vouchers/getgstitdetails`);
  }
  
  UPDGstIt(id: number,data :Gstdetails): Observable<any> {
    return this.http.put(`${environment.baseUrl}/gstit/${id}`, data);
  }

  getVoucherdetailsrecreconcile(oid: any,vid: any): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/voucherdetailsreconcilereceipt/${oid}/${vid}`);
  }


  UPDRate(rate: number,id :number): Observable<any> {
    return this.http.put(`${environment.baseUrl}/voucherdetailsrateupdate/${rate}/${id}`,null);
  }

  getgstview(vid: any): Observable<Gstdetails[]> {
    return this.http.get<Gstdetails[]>(`${environment.baseUrl}/fetchgstview/${vid}`);
  }

  
  getitview(vid: any): Observable<Itdetails[]> {
    return this.http.get<Itdetails[]>(`${environment.baseUrl}/fetchitview/${vid}`);
  }
  deleteGst(id: any): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/deletegst/${id}`);
  }
  deleteDb(id: any): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/deletedaybook/${id}`);
  }
  deleteSubLedg(id: any): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/deletesubledger/${id}`);
  }

  createPaymentBankCoverDetails(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/voucher/bankcoverpayment`, data);
  }

  createVoucherPayment(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/voucher/voucherpayment`, data);
  }


  getempbank(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/getempbank`);
  }

  getAllPaymentRecon( fromdate:any,companyid:any): Observable<Salenotereconcile[]> {
    let params = new HttpParams()
    params = params.set('companyid', (companyid == null) ? 0 : companyid);
    if (fromdate != null) {
      params = params.set('date', fromdate.toDateString());

      console.log(fromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('date', nulldate.toDateString());
    }
    console.log(params)
    return this.http.get<Salenotereconcile[]>(`${environment.baseUrl}/voucher/getsalenotes`, { params: params });
  }
  updatePaymentRecon(id: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/voucher/updatesalenotes/${id}`,null);
  }

  getAllPaymentReconFailed(fromdate:any,companyid:any): Observable<Salenotereconcile[]> {
    let params = new HttpParams()
    params = params.set('companyid', (companyid == null) ? 0 : companyid);
    if (fromdate != null) {
      params = params.set('date', fromdate.toDateString());

      console.log(fromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('date', nulldate.toDateString());
    }
    console.log(params)
    return this.http.get<Salenotereconcile[]>(`${environment.baseUrl}/voucher/getsalenotesfailedview`, { params: params });
  }
  updatePaymentReconFailed(id: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/voucher/updatesalenotesfailed/${id}`,null);
  }

  updatePaymentReconSuccess(id: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/voucher/updatesalenotessuccess/${id}`,null);
  }

  uploadPaymentFailureFile(file: File, filename: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    console.log(file);
    formData.append('file', file, filename);
    const req = new HttpRequest('POST', `${environment.baseUrl}/uploadpaymentfailurefile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    console.log(formData);
    return this.http.request(req);
  }

  
  getPensioner(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/getpensioners`);
  }

  
  getPensionerFam(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${environment.baseUrl}/getpensionersfamily`);
  }

  createPensioner(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/addpensioners`, data);
  }
  createPensionerFamily(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/addpensionersfam`, data);
  }

  updatePensioner(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/updatepensioners/${id}`, data);
  }
  updatePensionerFamily(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/updatepensionersfamily/${id}`, data);
  }


  createEmp(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/addemp`, data);
  }

  updateEmp(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/updateemp/${id}`, data);
  }

  createBranchFavour(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/addbranchinfavour`, data);
  }

  updateBranchFavour(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/updatebranchinfavour/${id}`, data);
  }

  getBranchFavour(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/getbranchinfavour`);
  }

  saveDayBook(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/savedaybook`, data);
  } 

  createVoucherPaymentHeader(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/voucher/voucherpaymentheader`, data);
  }

  createVoucherPettycash(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/voucher/savevoupettycash`, data);
  }
  updVoucherPettycashStatus(id:number,data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/voucher/updatevoupettycashstatus/${id}`, data);
  }

  getVoucherPettyCash(fromdate:any,todate:any): Observable<Voucher[]> {
    let params = new HttpParams()
    if (fromdate != null) {
      params = params.set('fromdate', fromdate.toDateString());

      console.log(fromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('fromdate', nulldate.toDateString());
    }
    if (todate != null) {
      params = params.set('todate', todate.toDateString());

      console.log(fromdate.toDateString())
    }
    else {
      var today = new Date();
      var nulldate = new Date(1900, 0, 0, 0);
      params = params.set('todate', nulldate.toDateString());
    }
    console.log(params)
    return this.http.get<Voucher[]>(`${environment.baseUrl}/voucher/getvoupettycash`, { params: params });
  }

} 


