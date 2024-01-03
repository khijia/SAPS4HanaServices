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
	return BaseController.extend("tc.com.controller.masterdata.NewItem", {
		onInit() {			

		},

		onSave: function (oEvent) {
			debugger
			var item = this.getView().byId("txtItemName").getValue();
			var oEntry = {
				ItemName: item
			};						

			var oModel = this.getOwnerComponent().getModel("data");
				oModel.create("/Items_Header", oEntry, {
					success : function(oData, oResponse) {
						 // Success
						 sap.m.MessageToast.show(" Created Successfully" );
						
					},
					error : function(oError) {
						debugger
						 // Error
					   sap.m.MessageToast.show(" Creation failed" );
					}
			   });			  
		},	
		
		onCancel:function(){
			debugger
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.navTo("items", { }, false);
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