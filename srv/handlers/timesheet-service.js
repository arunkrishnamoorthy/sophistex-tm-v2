const cds = require('@sap/cds');

class TimesheetService extends cds.ApplicationService {

    init() {
        const { Timesheet } = this.entities;
        this.before('READ','Timesheet', this.determineEmployeeNames);
        this.before('READ','Timesheet.drafts', this.determineEmployeeNames);
        this.before('CREATE','Timesheet', this.validateTimesheet);
        this.before('CREATE','Timesheet.drafts', this.determineDraftStatus);
        super.init();
    }

    async determineEmployeeNames() {
        // 1. get the employee id from the request object
        // 2. Get the employee detail from the Employees entity 
        // 3. in the return data fill the virtual elements managerName and employeeName 
    }

    async determineDraftStatus(req) {
        const { Timesheet } = this.entities;
        const attr = req.user.attr;
        req.data.status_status = '01';
        req.data.employeeId_ID = '2c0ce0af-6f00-4a76-8dea-a544e6e3ad6f';
    }

    async validateTimesheet(req) {
        const { Timesheet, Employees } = this.entities;
        const existingTimesheet = await SELECT.from(Timesheet).where({
            employeeId_ID: req.data.employeeId_ID,
            year: req.data.year,
            month: req.data.month
        });
        if(existingTimesheet.length > 0) {
            return req.error(510,"Timesheet entry already exists");
        }

        let employee = await SELECT.one.from(Employees).where({ ID: req.data.employeeId_ID});
        req.data.managerId_ID = employee.manager_ID;
        req.data.status_status = '02';
    }
}

module.exports = TimesheetService;