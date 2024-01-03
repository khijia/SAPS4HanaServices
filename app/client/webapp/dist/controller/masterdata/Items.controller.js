sap.ui.define(["tc/com/controller/BaseController","sap/ui/model/json/JSONModel","sap/ui/core/routing/History"],function(e,t,o){"use strict";return e.extend("tc.com.controller.masterdata.Items",{onInit(){var e=this;this._bDescendingSort=false;this.oRouter=e.getOwnerComponent().getRouter();const o=new t({itemsData:[],Total:0});e.getView().setModel(o,"items");var s=e.getOwnerComponent().getModel("data");s.read("/Items_Header",{success:function(t){e.getView().getModel("items").setProperty("/itemsData",t.results);e.getView().getModel("items").setProperty("/Total",t.results.length)},error:function(e){}})},_onLoad:function(){var e=this;var t=e.getOwnerComponent().getModel("data");t.read("/Items_Header",{success:function(t){e.getView().getModel().setData(t)},error:function(e){}})},onRefresh:function(e){debugger;sap.ui.getCore().byId("itemsList").getModel("items").refresh(true);setTimeout(function(){sap.ui.getCore().byId("itemsList").getModel("items").refresh(true)}.bind(this),1e3)},onInsertItem:function(e){debugger;var t=this.getView().byId("inputText").getValue();var o={};o.ID=t+1;o.ItemName="Item "+t+1;var s=this.getOwnerComponent().getModel("data");s.create("/Items_Header",o,{success:function(e,t){sap.m.MessageToast.show(" Created Successfully")},error:function(e){sap.m.MessageToast.show(" Creation failed")}})},onItemPress:function(e){debugger;var t=e.getSource().getBindingContext("items").getProperty("ItemID");this.oRouter=this.getOwnerComponent().getRouter();this.oRouter.navTo("itemdetail",{item:t},false)},onNavBack(){debugger;const e=o.getInstance();const t=e.getPreviousHash();if(t!==undefined){window.history.go(-1)}else{const e=this.getOwnerComponent().getRouter();e.navTo("home",{},true)}}})});
//# sourceMappingURL=Items.controller.js.map