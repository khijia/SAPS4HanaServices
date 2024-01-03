sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'client',
            componentId: 'Items_HeaderObjectPage',
            contextPath: '/Items_Header'
        },
        CustomPageDefinitions
    );
});