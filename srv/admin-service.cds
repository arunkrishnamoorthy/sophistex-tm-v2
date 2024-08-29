using com.sophistex.db.masterdata as md from '../db/master-data';

service adminService @(
    path    : '/odata/v4/timesheet/admin',
    requires: 'authenticated-user'
) {
    entity Employees @(restrict: [{
        grant: ['*'],
        to   : ['TimesheetAdmin']
    }]) as projection on md.Employees actions {
        action setAsArchived() returns Boolean; 
    };

    entity Activities @(restrict: [{
        grant: ['*'],
        to   : ['TimesheetAdmin']
    }]) as projection on md.Acitivity;

    entity Media @(restrict: [{
        grant: ['*'],
        to   : ['TimesheetAdmin']
    }]) as projection on md.Media;

    function getUserAttributes() returns String;
    function getEmployeesById(employeeId: String) returns Employees;
}

annotate adminService.Employees with @odata.draft.enabled;
annotate adminService.Activities with @odata.draft.enabled;
