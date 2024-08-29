sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'com.sophistex.ui.managetimesheet',
            componentId: 'TimesheetList',
            contextPath: '/Timesheet'
        },
        CustomPageDefinitions
    );
});