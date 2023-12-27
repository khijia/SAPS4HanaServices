namespace tc.masterdata;

using { Country } from '@sap/cds/common';

type SDate : DateTime;
type LText : String(1024);

entity Items_Header  {
    key ID       : Integer;        
        ItemName : String(500);
        Items   : Composition of many Items_Detail
                       on Items.ItemId = $self;
}

entity Items_Detail  {   
    key ID: Integer;
        ItemId       : Association to Items_Header;
        ItemName     : String(500);
        PartnerType  : String(5);
        PartnerId    : Integer;
        LocationName : String(100);
        EDIUom       : String(50);
}

entity Customers_Header  {
    key ID           : Integer;        
        CustomerName : String(500);
        Customers    : Composition of many Customers_Detail
                           on Customers.CustomerId = $self;
}

entity Customers_Detail  {
    key ID         : Integer;
        CustomerId : Association to Customers_Header;
        SUQlf      : String(100);
        SUCode     : String(10);
        PayMethod  : String(100);
        PayQlf     : String(100);
        WeightUOM  : String(50);
        VolumnUOM  : String(50);
        TermCode   : String(50);
        DeptNum    : String(50);
}
