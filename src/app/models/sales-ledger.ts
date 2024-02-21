import { Ledgerbankdetails } from "./ledgerbankdetails";

export class SalesLedger {
    ledgerId:number;
    ledgerCode:string;
    ledgerName:string;
    ledgerAlias:string;
    groupId:number;
    subGroupId:number;
    ledgerSupplierId:string;
    ledgerCustomerId:string;
    ledgerType:number;
    ifBranch:number;
    associateHomeBranch:number;
    companyId:number;
    affectInventory:number;
    address1:string;
    address2:string;
    city:number;
    state:number;
    active:number;
    recordApprovalStatus:string;
    createdBy:number;
    modifiedBy:number;
    undergroups:string;
    bankdetails:Array<Ledgerbankdetails>
    fileUploadId:Array<number>;
    panno:string;
    gst:string;
    pinCode:string;
    cityName:string;
}
