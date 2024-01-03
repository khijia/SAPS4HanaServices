sap.ui.define([
	"tc/com/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"../../model/formatter",
	'sap/f/library'
], function (
	BaseController,
	JSONModel,
	History,
	formatter,
	fioriLibrary
) {
	"use strict";
	return BaseController.extend("tc.com.controller.transactions.SalesOrder", {
		formatter: formatter,
		onInit() {
			debugger
			var that = this;
			this._bDescendingSort = false;
			this.oRouter = that.getOwnerComponent().getRouter();
			const oViewModel = new JSONModel({	
				currency: "EUR",		
				ordersData: [],
				Total:0
			});
			that.getView().setModel(oViewModel, "orders");			
			//var oModel = that.getOwnerComponent().getModel("transdata");
			var url = 'https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/Northwind/Northwind.svc';
            var oModel = new sap.ui.model.odata.v2.ODataModel(url);
			oModel.read("/Orders", {
				success: function (oData) {		
					debugger			
					that.getView().getModel("orders").setProperty("/ordersData", oData.results);		
					that.oOrdersTable = oData.results;	
					that.getView().getModel("orders").setProperty("/Total", oData.results.length);		
				},
				error: function (oError) {	
					debugger				
				}
			});	
					
		},		

		onItemPress: function (oEvent) {
			debugger
			var orderid = oEvent.getSource().getBindingContext("orders").getProperty("OrderID");
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.navTo("sodetail", {order: orderid},false);
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("ShipName", FilterOperator.Contains, sQuery)];
			}

			this.oOrdersTable.getBinding("orders").filter(oTableSearchState, "Application");
		},

		onNavBack() {
			debugger
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("home", {}, true);
			}
		}
	});
});