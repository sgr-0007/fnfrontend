export class GlobalConstants {


    //roles mapping from db
    public static maker: number = 6;
    public static checker: number = 7;
    public static approver: number = 8;
    public static sadmin: number = 9;



    //modules mapping from db
    public static budget: number = 7;
    public static purchasevoucher: number = 1;
    public static paymentvoucher: number = 2;
    public static contravoucher: number = 3;
    public static receiptvoucher: number = 4;
    public static journalvoucher: number = 5;
    public static salesvoucher: number = 6;
    public static drnotevoucher: number = 11;
    public static crnotevoucher: number = 12;
    public static cashbook: number = 27;

   public static reportUrl : string = 'http://173.212.242.240:52659/';

   
   //TB Prod 
   //public static reportUrl : string = 'https://fna.tobaccoboard-eoffice.com/fnarepo/';


   //public static reportUrl : string = 'http://localhost:52659/';

 //public static reportUrl : string = 'http://173.212.242.240:52660/';
}