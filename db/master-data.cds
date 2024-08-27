namespace com.sophistex.db.masterdata;
using { cuid, managed } from '@sap/cds/common';

entity Employees: cuid, managed {
    employeeId: String(20) @title: 'Employee ID';
    firstName: String(40) @title : '{i18n>firstName}';
    lastName: String(40) @title : '{i18n>lastName}';
    manager: Association to one Employees @title : 'Manager ID';
    email: String(100) @title : 'Email';
    isArchived: Boolean @title : 'Is Locked';
}

entity Acitivity: cuid, managed {
    name: String(100);
    description: String; 
    isArchived: Boolean;
}

entity Media: cuid, managed {
    key AssetType: String(2) enum {
        employee = 'EM';
        activity = 'AM';
    };
    @Core.MediaType: 'mediaType'
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
}

