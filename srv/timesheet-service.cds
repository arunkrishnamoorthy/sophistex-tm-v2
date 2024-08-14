using com.sophistex.db.tx as tx from '../db/transaction-data';
using com.sophistex.db.masterdata as md from '../db/master-data';


service timesheetService @(
    path    : '/odata/v4/timesheet/manage',
    requires: 'authenticated-user'
) {

    entity Timesheet @(restrict: [
        {
            grant: [
                'READ',
                'CREATE',
                'UPDATE'
            ],
            to   : ['TimesheetUser']
        },
        {
            grant: ['DELETE'],
            to   : ['TimesheetAdmin']
        }
    ])                as projection on tx.Timesheet;

    @readonly
    entity Employees @(restrict: [{
        grant: ['READ'],
        to   : ['TimesheetUser']
    }])               as projection on md.Employees;

    @readonly
    entity Activities @(restrict: [{
        grant: ['READ'],
        to   : ['TimesheetUser']
    }]) as projection on md.Acitivity;


    function getLoggedInUser()                                       returns String;
    function getActiveTimesheet(year : String(4), month : String(2)) returns Timesheet;
    function getUserAttributes()                                     returns String;
}

annotate timesheetService.Timesheet with @odata.draft.enabled;
