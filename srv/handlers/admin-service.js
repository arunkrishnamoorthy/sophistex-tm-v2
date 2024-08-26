const cds = require('@sap/cds');
const path = require('path');
const fs = require('fs');
const { PassThrough } = require('stream');

class MasterDataService extends cds.ApplicationService {

    init() {

        this.on("READ", "Media", this.handleTemplateDownload);
        super.init();
    }

    async handleTemplateDownload(req) {
        debugger;
        const { ID, AssetType } = req.data;
        const url = req._.req.path;
        if(url.includes('content')) {
            let filename; 
            if(AssetType === 'EM') { 
                filename = 'employees_template';
            } else {
                filename = 'activity_template';
            }
            const filePath = path.join(__dirname,"../assets",`${filename}.xlsx`);
            const fileBuffer = fs.readFileSync(filePath);
            let res = req._.res;
            res.setHeader('Content-Disposition', `attachment; filename="${filename}.xlsx"`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Length', fileBuffer.length);
            res.write(fileBuffer);
            res.end();
        }
    }
} 

module.exports = MasterDataService;
