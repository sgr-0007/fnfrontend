import { Ledgerbankdetails } from "./ledgerbankdetails";

export class Saleview {

    ledgerId:number;
    ledgerCode:string;
    ledgerName:string;
    ledgerAlias:string;
    groupId:number;
    subGroupId:number
    subGroupName:string;
    groupName:string;
    homeBranchName:string;
    ledgerifbranch:number;
    ifbranch:string;
    ledgerSupplierId:string;
    ledgerCustomerId:string;
    ledgerType:number;
    associateHomeBranch:number;
    companyId:number;
    affectInventory:number;
    address1:string;
    address2:string;
    city:number;
    cityName:string;
    state:number;
    stateName:string;
    bankName:string;
    bankAccountNumber:string;
    ifscCode:string;
    bankAddress:string;
    gst:string;
    pano:string;
    panno:string;
    active:boolean;
    underGroup:string;
    approvalStatus:number;
    createdBy:number;
    modifiedBy:number;
    undergroups:string;
    bankDetails:Array<Ledgerbankdetails>=[];
    fileUploadId:Array<number>;
    pinCode:string;
}

