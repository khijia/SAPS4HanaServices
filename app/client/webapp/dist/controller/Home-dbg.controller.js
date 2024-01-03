sap.ui.define([
    "tc/com/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (
    BaseController,
    JSONModel) {
    "use strict";

    return BaseController.extend("tc.com.controller.Home", {

        onInit: function () {
            this.oOwnerComponent = this.getOwnerComponent();
            this.oRouter = this.oOwnerComponent.getRouter();
            this.oRouter.attachRouteMatched(this.onRouteMatched, this);
        },

        onNavToItemsList:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("items",{},false);
        },

        onNavToSalesOrderList:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("salesorder",{},false);
        },

        onRouteMatched: function (oEvent) {
            var sRouteName = oEvent.getParameter("name"),
                oArguments = oEvent.getParameter("arguments");

            // Save the current route name
            this.currentRouteName = sRouteName;
            this.currentOrder = oArguments.order;
        },

        onStateChanged: function (oEvent) {
            var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
                sLayout = oEvent.getParameter("layout");

            // Replace the URL with the new layout if a navigation arrow was used
            if (bIsNavigationArrow) {
                this.oRouter.navTo(this.currentRouteName, { layout: sLayout, order: this.currentOrder }, true);
            }
        },

        onExit: function () {
            this.oRouter.detachRouteMatched(this.onRouteMatched, this);
        }
    });
});