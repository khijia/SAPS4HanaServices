sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"tc/com/controller/BaseController",
	"sap/ui/core/routing/History",
    'sap/f/library'
], function (JSONModel, BaseController,History, fioriLibrary) {
	"use strict";

	return BaseController.extend("tc.com.controller.SalesOrderDetails", {   
		oOrderDetailsModel: null,
		onInit: function () {            
            this.oOwnerComponent = this.getOwnerComponent();
			debugger
			this.oRouter = this.oOwnerComponent.getRouter();
            const oViewModel = new JSONModel({	
                currency: "EUR",					
				orderDetails: [],
                OrderNumber:'Order#100',
                OrderDesc:'Testing',
                Customer:'Customer#01',
                TotalAmount:120,
                ProductPicUrl:'',
				Total:0
			});
            this.getView().setModel(oViewModel, "orderDetails");
			
            this.oRouter.getRoute("sodetail").attachPatternMatched(this._onOrderMatched, this);           
		},

        _onOrderMatched: function (oEvent) {
            debugger	
			this._order = oEvent.getParameter("arguments").order || this._order || "0";
			this._loadData(this._order);
			
		},

        onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

        _loadData:function(id){
            var that = this;
            var oOwnerComponent = that.getOwnerComponent();            
					
			var oModel = oOwnerComponent.getModel("data");
            var arrfilters = new Array();
            var filters = new sap.ui.model.Filter({
                path: "OrderID",
                operator: sap.ui.model.FilterOperator.EQ,
                value1: id
         });

         arrfilters.push(filters);
			oModel.read("/Order_Details",            
            {
                filters: arrfilters,
				success: function (oData) {	   
                    that.oOrderDetailsModel = that.getView().getModel("orderDetails");             		
					that.oOrderDetailsModel.setProperty("/detailsData", oData.results);		
					that.oOrdersTable = oData.results;	
					that.oOrderDetailsModel.setProperty("/Total", oData.results.length);

                    that.oOrderDetailsModel.setProperty("/OrderNumber", 'Order#100');
                    that.oOrderDetailsModel.setProperty("/OrderDesc", 'Testing');
                    that.oOrderDetailsModel.setProperty("/Customer", 'Customer#01');
                    that.oOrderDetailsModel.setProperty("/TotalAmount", 120);
                    that.oOrderDetailsModel.setProperty("/ProductPicUrl", 'https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-1002.jpg');
                    
				},
				error: function (oError) {	
                    debugger				
				}
			}); 
        },

		_onPatternMatch: function (oEvent) {
            var that = this;      
			that._orderId = oEvent.getParameter("arguments").orderid || that._orderId || "";	            
            //that._loadData(that._orderId);
		},

        onItemPress: function (oEvent) {
			var supplierPath = oEvent.getSource().getBindingContext("products").getPath(),
				supplier = supplierPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detailDetail", { supplier: supplier, product: this._product});
		},
		onNavBack() {
			const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("salesorder", {}, true);
		},
		onExit: function () {
			this.oRouter.getRoute("sodetail").detachPatternMatched(this._onOrderMatched, this);
            this.oRouter.getRoute("salesorder").detachPatternMatched(this._onOrderMatched, this);
		}
	});
});