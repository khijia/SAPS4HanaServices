sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'client/test/integration/FirstJourney',
		'client/test/integration/pages/Items_HeaderList',
		'client/test/integration/pages/Items_HeaderObjectPage'
    ],
    function(JourneyRunner, opaJourney, Items_HeaderList, Items_HeaderObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('client') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheItems_HeaderList: Items_HeaderList,
					onTheItems_HeaderObjectPage: Items_HeaderObjectPage
                }
            },
            opaJourney.run
        );
    }
);