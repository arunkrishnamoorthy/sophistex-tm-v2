sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/sophistex/ui/managetimesheet/test/integration/FirstJourney',
		'com/sophistex/ui/managetimesheet/test/integration/pages/TimesheetList',
		'com/sophistex/ui/managetimesheet/test/integration/pages/TimesheetObjectPage'
    ],
    function(JourneyRunner, opaJourney, TimesheetList, TimesheetObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/sophistex/ui/managetimesheet') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheTimesheetList: TimesheetList,
					onTheTimesheetObjectPage: TimesheetObjectPage
                }
            },
            opaJourney.run
        );
    }
);