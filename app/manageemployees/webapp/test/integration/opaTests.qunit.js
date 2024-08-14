sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/sophistex/ui/manageemployees/test/integration/FirstJourney',
		'com/sophistex/ui/manageemployees/test/integration/pages/EmployeesList',
		'com/sophistex/ui/manageemployees/test/integration/pages/EmployeesObjectPage'
    ],
    function(JourneyRunner, opaJourney, EmployeesList, EmployeesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/sophistex/ui/manageemployees') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEmployeesList: EmployeesList,
					onTheEmployeesObjectPage: EmployeesObjectPage
                }
            },
            opaJourney.run
        );
    }
);