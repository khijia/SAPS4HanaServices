sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"tc/com/controller/BaseController",
], function (JSONModel, BaseController) {
	"use strict";

	return BaseController.extend("tc.com.controller.ItemDetail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("itemDetail").attachPatternMatched(this._onPatternMatch, this);
		},

		_onPatternMatch: function (oEvent) {
			this._supplier = oEvent.getParameter("arguments").supplier || this._supplier || "0";
			this._product = oEvent.getParameter("arguments").product || this._product || "0";

			this.getView().bindElement({
				path: "/ProductCollectionStats/Filters/1/values/" + this._supplier,
				model: "products"
			});
		},

		onExit: function () {
			this.oRouter.getRoute("itemDetail").detachPatternMatched(this._onPatternMatch, this);
		}
	});
});