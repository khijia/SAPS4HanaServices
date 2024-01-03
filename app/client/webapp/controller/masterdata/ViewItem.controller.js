sap.ui.define([
	"tc/com/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",

	'sap/m/MessagePopover',
	'sap/m/MessageItem',
	'sap/m/MessageToast',
	'sap/ui/core/message/Message',
	'sap/ui/core/library',
	'sap/ui/core/Core',
	'sap/ui/core/Element'

], function (
	BaseController,
	JSONModel,
	History,
	MessagePopover,
	MessageItem,
	MessageToast,
	Message,
	coreLibrary,
	Core,
	Element
) {
	"use strict";
	return BaseController.extend("tc.com.controller.masterdata.ViewItem", {
		onInit() {
			var that = this;
			this.oRouter = that.getOwnerComponent().getRouter();
			const oViewModel = new JSONModel({
				details: [],
				Total: 0
			});

			const oDialogModel = new JSONModel({
				"ItemName": 'Pencil',
				"details":
				[{
					ItemId: 1,
					ItemName: 'Pencil',
					PartnerType: 'Customer',
					PartnerName: 'KJ',
					LocationName: 'US',
					EDIUom: 'EA'
				}]
			});

			this.oView = this.getView();
			this._oMessageManager = Core.getMessageManager();

			// Clear the old messages
			this._oMessageManager.removeAllMessages();
			debugger

			that.getView().setModel(oDialogModel, "itemInfo");

			that.getView().setModel(oViewModel, "itemDetails");
			var oModel = that.getOwnerComponent().getModel("data");
			oModel.read("/Items_Detail", {
				success: function (oData) {
					that.getView().getModel("itemDetails").setProperty("/details", oData.results);
					that.getView().getModel("itemDetails").setProperty("/Total", oData.results.length);
				},
				error: function (oError) {

				}
			});
		},

		onAddItemData: function () {
			debugger
			// create dialog lazily
			if (!this.oMPDialog) {
				this.oMPDialog = this.loadFragment({
					name: "tc.com.view.fragments.ItemDetails"
				});
			}
			this.oMPDialog.then(function (oDialog) {
				this.oDialog = oDialog;
				this.oDialog.open();
				//this._oMessageManager.registerObject(this.oView.byId("formContainer"), true);

				//MessageToast.show('Press "Save" to trigger validation.');
				//this.createMessagePopover();
			}.bind(this));
		},
		_closeDialog: function () {
			this.oDialog.close();
		},

		onSave: function (oEvent) {

		},

		onCancel: function () {
			debugger
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.navTo("items", {}, false);
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