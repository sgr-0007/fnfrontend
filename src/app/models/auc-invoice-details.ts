import { AucInvoiceDetail } from "./auc-invoice-detail";
import { AucInvoiceTaxes } from "./auc-invoice-taxes";

export class AucInvoiceDetails {
        invid: number;
        invoiceNo: number;
        buyerId: String;
        buyerNo: number;
        noOfBales: number;
        quantityPurchased: number;
        value: number;
        invoiceDate:string | Date;
        paymentDueDate:string | Date ;
        companyId:number;
        bgBalance: number;
        createdBy: String;
        createdOn: Date;
        updatedBy: String;
        updateOn: Date;
        platformCode: number;
        buyerName: String;
        isDemurrCalculated: String;
        balanceAfterDlv: number;
        noOfBalesRelaxed: number;
        insertedDate: Date;
        status: number;
        voucherStatus:number;
        aucinvDetails:Array<AucInvoiceDetail>;
        aucinvTaxes:Array<AucInvoiceTaxes>

}
