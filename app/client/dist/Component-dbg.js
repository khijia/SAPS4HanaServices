sap.ui.define([
    'sap/ui/core/UIComponent',
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/resource/ResourceModel",    
    "sap/ui/Device"
], function (Component, JSONModel,ResourceModel, Device) {
        "use strict";

        return Component.extend("tc.com.Component", {
            metadata: {
                manifest: "json"
            },

            init: function () {          
                var oModel,				
                    oRouter;
    
                Component.prototype.init.apply(this, arguments);
                // set data model
                
                oModel = new JSONModel();
                this.setModel(oModel);
    
                // set device model
                const oDeviceModel = new JSONModel(Device);
                oDeviceModel.setDefaultBindingMode("OneWay");
                this.setModel(oDeviceModel, "device");  
                // set i18n model
                const i18nModel = new ResourceModel({
                    bundleName: "tc.com.i18n.i18n"
                });
                this.setModel(i18nModel, "i18n");
    
                // create the views based on the url/hash
                oRouter = this.getRouter();			
                oRouter.initialize();
            }
        });
    }
);