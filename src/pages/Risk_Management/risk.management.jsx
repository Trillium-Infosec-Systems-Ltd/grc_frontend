import FormBuilder from '../../components/Form/Form.Builder';

const schema = {
    "doctype": "Risk",
    "fields": [
        {
            "fieldname": "risk_name",
            "fieldtype": "Data",
            "label": "Risk Name",
            "required": true,
            "validation": {
                "min_length": 5,
                "max_length": 200
            }
        },
        {
            "fieldname": "risk_category",
            "fieldtype": "Select",
            "label": "Risk Category",
            "options": [
                "Security",
                "Compliance",
                "Operational",
                "Financial",
                "Strategic"
            ],
            "required": true,
            "default": "Security"
        },
        {
            "fieldname": "risk_likelihood",
            "fieldtype": "Select",
            "label": "Likelihood",
            "options": [
                "Low",
                "Medium",
                "High",
                "Critical"
            ],
            "required": true
        },
        {
            "fieldname": "risk_impact",
            "fieldtype": "Select",
            "label": "Impact",
            "options": [
                "Low",
                "Medium",
                "High",
                "Critical"
            ],
            "required": true
        },
        {
            "fieldname": "related_assets",
            "fieldtype": "MultiLink",
            "label": "Related Assets",
            "link_to": "Asset",
            "required": true
        },
        {
            "fieldname": "department",
            "fieldtype": "Select",
            "label": "Department",
            "options": [
                "Finance",
                "IT",
                "HR",
                "Operations",
                "Legal"
            ],
            "required": true
        },
        {
            "fieldname": "risk_description",
            "fieldtype": "LongText",
            "label": "Risk Description",
            "required": true
        },
        {
            "fieldname": "owner",
            "fieldtype": "Link",
            "label": "Owner",
            "link_to": "User",
            "required": true
        },
        {
            "fieldname": "date_identified",
            "fieldtype": "Date",
            "label": "Date Identified",
            "required": true
        },
        {
            "fieldname": "related_vulnerabilities",
            "fieldtype": "Tags",
            "label": "Related Vulnerabilities (CVEs)",
            "required": false
        },
        {
            "fieldname": "risk_decision",
            "fieldtype": "Select",
            "label": "Risk Decision",
            "options": [
                "Accept",
                "Mitigate",
                "Transfer",
                "Avoid"
            ],
            "required": true
        },
        {
            "fieldname": "treatment_plan",
            "fieldtype": "LongText",
            "label": "Treatment Plan",
            "required": false
        },
        {
            "fieldname": "residual_risk",
            "fieldtype": "Select",
            "label": "Residual Risk",
            "options": [
                "Low",
                "Medium",
                "High"
            ],
            "required": false
        },
        {
            "fieldname": "review_date",
            "fieldtype": "Date",
            "label": "Review Date",
            "required": true
        },
        {
            "fieldname": "attachments",
            "fieldtype": "File",
            "label": "Supporting Evidence",
            "required": false
        }
    ]
}

function RiskManagement() {

    return (
        <FormBuilder schema={schema} onFinish={data => console.log({ data })} />
    )
}

export default RiskManagement
