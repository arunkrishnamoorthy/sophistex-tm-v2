using adminService as service from '../../admin-service';

annotate service.Employees with @(
    UI.HeaderInfo: {
        TypeName: 'Employee',
        TypeNamePlural: 'Employees',
        Title: {
            $Type: 'UI.DataField',
            Value: ID
        },
        Description: {
            $Type: 'UI.DataField',
            Value: isArchived
        }
    },
    UI.SelectionFields: [
        ID,
        manager_ID,
        email
    ],
    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Value: ID
        },
        {
            $Type: 'UI.DataField',
            Value: employeeId
        },
        {
            $Type: 'UI.DataField',
            Value: firstName
        },
        {
            $Type: 'UI.DataField',
            Value: lastName
        },
        {
            $Type: 'UI.DataField',
            Value: manager_ID
        },
        {
            $Type: 'UI.DataField',
            Value: email
        },
        {
            $Type: 'UI.DataField',
            Value: employeeId
        },
        {
            $Type: 'UI.DataFieldForAction',
            Action: 'adminService.setAsArchived',
            Label: 'Set as Archived'
        }
    ],
    UI.Facets: [
        {
            $Type: 'UI.CollectionFacet',
            Facets: [
                {
                    $Type: 'UI.ReferenceFacet',
                    Label: 'General Information',
                    Target: '@UI.FieldGroup#idGeneralGroup'
                },
                {
                    $Type: 'UI.ReferenceFacet',
                    Label: 'Administrative Data',
                    Target: '@UI.FieldGroup#idAdminData'
                }                
            ]
        }
    ],
    UI.FieldGroup #idGeneralGroup: {
        $Type: 'UI.FieldGroupType',
        Label: 'General Information',
        Data: [
            {
                $Type: 'UI.DataField',
                Value: firstName
            },
            {
                $Type: 'UI.DataField',
                Value: lastName
            },
            {
                $Type: 'UI.DataField',
                Value: manager_ID
            },
            {
                $Type: 'UI.DataField',
                Value: email
            },
            {
                $Type: 'UI.DataField',
                Value: isArchived
            }
        ]
    },
    UI.FieldGroup #idAdminData: {
        $Type: 'UI.FieldGroupType',
        Label: 'Administrative Data',
        Data: [
            {
                $Type: 'UI.DataField',
                Value: createdAt
            },
            {
                $Type: 'UI.DataField',
                Value: createdBy
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedAt
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedBy
            }
        ]
    }
);
