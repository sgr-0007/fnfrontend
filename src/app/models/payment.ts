import { Paymentdetails } from "./paymentdetails";

export class Payment {
    paymentid:number;
    paymentNo:number;
    invoiceId:number;
    invoiceNo:string;
    adminorauction:number;
    paymentStatus:number;
    paymentDueDate:Date;
    invoiceDate:Date;
    paymentDate:Date;
    paymentAmount:number;
    paymentMode:number;
    pBalance:number;
    pAmountPaid:number;
    pTds:number;
    createdBy:number;
    modifiedBy:number;
    makerVerifiedBy:number;
    makerVerifiedStatus:number;
    makerVerifiedDate:Date;
    approverVerifiedBy:number
    approverVerifiedStatus:number
    approverVerifiedDate:Date;
    paymentDetails:Paymentdetails[];
    remark:string;
    realizedAmount:string;
    realizedDate:Date=new Date();
    cashledger:string;
    officename:string;
    buyername:string;
    bankledger:string;
    
}

