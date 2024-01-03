sap.ui.define(["tc/com/controller/BaseController","sap/ui/model/json/JSONModel"],function(t,e){"use strict";return t.extend("tc.com.controller.Home",{onInit:function(){this.oOwnerComponent=this.getOwnerComponent();this.oRouter=this.oOwnerComponent.getRouter();this.oRouter.attachRouteMatched(this.onRouteMatched,this)},onNavToItemsList:function(){const t=this.getOwnerComponent().getRouter();t.navTo("items",{},false)},onNavToSalesOrderList:function(){const t=this.getOwnerComponent().getRouter();t.navTo("salesorder",{},false)},onRouteMatched:function(t){var e=t.getParameter("name"),o=t.getParameter("arguments");this.currentRouteName=e;this.currentOrder=o.order},onStateChanged:function(t){var e=t.getParameter("isNavigationArrow"),o=t.getParameter("layout");if(e){this.oRouter.navTo(this.currentRouteName,{layout:o,order:this.currentOrder},true)}},onExit:function(){this.oRouter.detachRouteMatched(this.onRouteMatched,this)}})});
//# sourceMappingURL=Home.controller.js.map