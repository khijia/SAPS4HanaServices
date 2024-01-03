sap.ui.define([
	"tc/com/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"

], function (
	BaseController,
	JSONModel,
	History
) {
	"use strict";
	return BaseController.extend("tc.com.controller.masterdata.Items", {
		onInit() {
			var that = this;
			this._bDescendingSort = false;
			this.oRouter = that.getOwnerComponent().getRouter();
			const oViewModel = new JSONModel({
				itemsData: [],
				Total: 0
			});
			
			that.getView().setModel(oViewModel, "items");
			var oModel = that.getOwnerComponent().getModel("data");
			oModel.read("/Items_Header", {
				success: function (oData) {
					that.getView().getModel("items").setProperty("/itemsData", oData.results);
					that.getView().getModel("items").setProperty("/Total", oData.results.length);
				},
				error: function (oError) {

				}
			});

		},

		_onLoad:function(){
			var that= this;
			var oModel = that.getOwnerComponent().getModel("data");
			oModel.read("/Items_Header", {
				success: function (oData) {
					that.getView().getModel().setData(oData);					
				},
				error: function (oError) {

				}
			});
			
		},

		onRefresh:function(oEvent){
				debugger
			sap.ui.getCore().byId("itemsList").getModel("items").refresh(true);
			setTimeout(function () {
				sap.ui.getCore().byId("itemsList").getModel("items").refresh(true);
			}.bind(this), 1000);
		},

		onInsertItem: function (oEvent) {
			debugger
			var item = this.getView().byId("inputText").getValue();
			var oEntry = {};
			oEntry.ID =  item + 1;
			oEntry.ItemName = "Item " + item + 1;		

			var oModel = this.getOwnerComponent().getModel("data");
				oModel.create("/Items_Header", oEntry, {
					success : function(oData, oResponse) {
						 // Success
						 sap.m.MessageToast.show(" Created Successfully" );
						
					},
					error : function(oError) {
						 // Error
					   sap.m.MessageToast.show(" Creation failed" );
					}
			   });			  
		},

		onItemPress: function (oEvent) {
			debugger
			var itemid = oEvent.getSource().getBindingContext("items").getProperty("ItemID");
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.navTo("viewitem", { item: itemid }, false);
		},

		onNewItem: function(){
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.navTo("newitem", {  }, false);
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