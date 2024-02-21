import { Salenotedetails } from "./salenotedetails";
import { Salenoteloandetails } from "./salenoteloandetails";
import { Salenotetaxes } from "./salenotetaxes";

export class Salenoteheaderdetails {
     shid:number;
     saleNote_No:number;
	 tbgrno:number;
	quantity_Authorized:number;
	quantity_Sold:number;
	   quantity_Balanced:number;
	   no_Of_Bales_Received:number;
	   no_Of_Bales_Sold:number;
	   auction_Date:Date;
	   net_Amount_Payable:number;
	   created_By:string;
	   created_On:string;
	   updated_By:string;
	   updated_On:Date;
	   saleNote_Date:Date;
	   payment_Due_Date:Date;
	   saleNote_Status:number;
	   prev_SaleNote_no:number;
	   auctionedWeight:number;
	   pLATFORM_CODE:number;
	   growerPaymentBankCode:number;
	   cheque_No:number;
	   prev_Bales_Sold:number;
	 receipt_No:string;
	day_Total_Qty:number;
	 day_Excess_Qty:number;
	auth_Qty_Price:number;
	 excess_Qty_Price:number;
	 max_Excess_Qty_Price:number;
	day_Max_Excess_Qty:number;
	 day_Scarp_Qty:number;
	 scarp_Qty_Price:number;
	 inserted_date:Date;
	 status:number;
     aucsalenoteDetail:Array<Salenotedetails>;
     aucsalenoteTaxes:Array<Salenotetaxes>
     aucsalenoteLoan:Array<Salenoteloandetails>
}
