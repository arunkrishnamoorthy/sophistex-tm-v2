const cds = require('@sap/cds');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

class MasterDataService extends cds.ApplicationService {

    init() {
        const { Media } = this.entities;
        this.on("READ", Media, this.handleTemplateDownload);
        this.on("UPDATE",Media, this.handleTemplateUpload);
        super.init();
    }

    async handleTemplateDownload(req) {
        const { ID, AssetType } = req.data;
        const url = req._.req.path;
        if (url.includes('content')) {
            let filename;
            if (AssetType === 'EM') {
                filename = 'employees_template';
            } else {
                filename = 'activity_template';
            }
            const filePath = path.join(__dirname, "../assets", `${filename}.xlsx`);
            const fileBuffer = fs.readFileSync(filePath);
            let res = req._.res;
            res.setHeader('Content-Disposition', `attachment; filename="${filename}.xlsx"`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Length', fileBuffer.length);
            res.write(fileBuffer);
            res.end();
        } else {}
    }

    async handleTemplateUpload(req) {

        const { Employees } = this.entities;
        const { ID, AssetType } = req.data;
        const url = req._.req.path;
        if (url.includes('content')) { 
            const id = req.data.ID;
            const assetType = req.data.AssetType;
            const stream = req.data.content;   
            const chunks = [];
            stream.on('data', chunk => {
                chunks.push(chunk);
            });
            stream.on('end', async () => {
                debugger;
                const buffer = Buffer.concat(chunks);
                const workbook = XLSX.read(buffer, { type: 'buffer' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonArray = XLSX.utils.sheet_to_json(worksheet);

                let existingEmployees = await SELECT.from(Employees);
                let employeesToInsert = jsonArray.map((employee) => {
                    let employeeExists = existingEmployees.find((emp) => emp.employeeId === employee.Employee_ID);
                    if(!employeeExists) {
                        return {
                            employeeId: employee.Employee_ID,
                            firstName: employee.Employee_First_name,
                            lastName: employee.Employee_Last_name,
                            manager_ID: employee.Manager_ID,
                            email: employee.Employee_email,
                            isArchived: false
                        }
                    }
                });

                try {
                    await INSERT.into(Employees).entries(employeesToInsert);
                } catch(err) {
                    debugger;
                }
            });
        }
    }
}

module.exports = MasterDataService;
