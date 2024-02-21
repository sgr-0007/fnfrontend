

export class Voucher {
  voucherid? : number;
  voucherdate? : Date;
  voucherfromdate? : Date;
  vouchertodate? : Date;
  vouchernumber? : string;
  vouchertypeid?: number;
  vouchertypename?:string;
  totaldebitamount? : number;
  totalcreditamount? : number;
  narration?:string;
  narrationcr?:string;
  narrationdr?:string;
  companyid? : number;
  companyname? :string;
  voucherdetailid?:number;
  ledgerid?:number;
  creditledger?:number;
  debitledger?:number;
  ledgeralias?:string;
  creditamount?:number;
  debitamount?:number;
  currencyid?:number;
  currencydisplay?:string;
  isactive?: boolean;
  daybookledgerid?:number;
  openingbalance?:number;
  closingbalance?:number;
  daybookopenedby?:number;
  isopened?:number;
  isclosed?:number;
  month?:number;
  daybookdate?:Date;
  statusdaybook?:String;
  daybookfromdate? : Date;
  daybooktodate? : Date;
  balancesheetgroupid?:number;
  balancesheetgroup?:String;
  createdby?:number;
  statusid?:number;
  vouchercheckedby?:number;
  voucherapprovedby?:number;
  crledgeralias?:string;
  drledgeralias?:string;
  hsnsaccode?:String;
  hsnsacdescription?:String;
  hsnsacid?:number;
  debithsnsaccode?:String;
  debithsnsacid?:number;
  credithsnsaccode?:String;
  credithsnsacid?:number;
  otherreporttypeid?:number 
 voucherseq?:number
 subgroupid?:number
 accounttypeid?:number;
  accounttype?:string;
  drcrid?:number;
  gsttin?:string;
  invoiceNo?:string;
  branchid?: number;
  branchname?:string;
  remarks?:String;
  companytype? : number;
  companytypename?:String;
  rate?:number;
  companytypeid? : number;
  subledgerid?:number;
  subledgername?:String;
undergroups?:String;
  paymentmode?:String;
  modeid?:number;
  chequebankname?:string;
  chequenumber?:string;
  chequedate?:Date;
  chequeamount?:number;
  chequepaidto?:string;

  ddbankname?:string;
  ddnumber?:string;
  dddate?:Date;
  ddamount?:number;
  ddpaidto?:string;

  onlinebankname?:String;
  onlinetransactionid?:String;
  onlinedate?:Date;
  onlineamount?:number;
  onlinebankingcharges?:number;

  cashdate?:Date;
  cashamount?:number;
  cashpaidto?:String;
  status?:number
  panno?:string;
  
  schname?:string;
  schid?:number;


  bankcoverpayid?:number;
  infavourof?:String;

  buyerinfavourof?:String;
  employeeinfavourof?:String;
  pensionerinfavourof?:String;
  pensionerfamilyinfavourof?:String;
  branchdetailsinfavourof?:String;

  amount?:number;
  ban?:String;
  gstbvledgerid?:number; 
  gstbvledgeralias?:String;

  bankemployeeid?:number
  employeename?:String;
  employeecode?:String;
  designation?:String;
  place?:String;
  accountno?:String;
  ifsc?:String;
  bank?:String;

  drledgername?:string;
  crledgername?:string;


  pensionerid?:number;
  annuityno?:string;
  pensioner?:string;
  designationpensioner?:string;
  accnopensioner?:string;
  ifscpensioner?:string;

  
  pensionerfamilyid?:number;
  annuitynofamily?:string;
  pensionerfamily?:string;
  designationpensionerfamily?:string;
  wo?:String;
  accnopensionerfamily?:string;
  ifscpensionerfamily?:string;

  accno?:string;
  acctype?:string;
  apfname?:string;
  branchdetailsid?:number;
  createddate?:Date;
  enclosures?:boolean;
  pettycashexpid?:number;
  statuspetty?:string;
  submit?:boolean;
  }
