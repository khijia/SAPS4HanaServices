using tc.masterdata as data from '../db/masterdata';

service MasterDataService {
    entity Items_Header     as projection on data.Items_Header;
    entity Items_Detail     as projection on data.Items_Detail;
    entity Customers_Header as projection on data.Customers_Header;
    entity Customers_Detail as projection on data.Customers_Detail;
}
