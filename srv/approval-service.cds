using com.sophistex.db.tx as tx from '../db/transaction-data';

service approvalService @(
    path: '/odata/v4/timesheet/approvals',
    requires: 'authenticated-user'
) {

    entity TimesheetApproval @(
        restrict: [
            {
                grant: ['READ','UPDATE'],
                to: ['TimesheetManager']
            }
        ]
    ) as projection on tx.Timesheet;

}