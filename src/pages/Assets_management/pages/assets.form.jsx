import FormBuilder from '../../../components/Form/Form.Builder';
import useFormHook from '../../../hooks/useFormHook';

const schema = {
  "doctype": "Asset",
  "fields": [
    {
      "fieldname": "asset_name",
      "fieldtype": "Data",
      "label": "Asset Name",
      "required": true,
      "validation": {
        "min_length": 2,
        "max_length": 100
      }
    },
    {
      "fieldname": "type",
      "fieldtype": "Select",
      "label": "Asset Type",
      "options": [
        "Database",
        "Server",
        "Web Application",
        "Endpoint Security"
      ],
      "required": true
    },
    {
      "fieldname": "criticality",
      "fieldtype": "Select",
      "label": "Criticality Level",
      "options": [
        "Low",
        "Medium",
        "High",
        "Critical"
      ],
      "required": true,
      "default": "Medium"
    },
    {
      "fieldname": "ip_hostname",
      "fieldtype": "Data",
      "label": "IP/Hostname",
      "required": true,
      "validation": {
        "regex": "^(([0-9]{1,3}\\.){3}[0-9]{1,3}|[a-zA-Z0-9\\-]+(\\.[a-zA-Z0-9\\-]+)+)$"
      }
    },
    {
      "fieldname": "owner",
      "fieldtype": "Link",
      "label": "Asset Owner",
      "link_to": "User",
      "required": false
    }
  ]
}


const AssetForm = () => {
  const [form] = useFormHook('/schemas/assets');

  return (
    <FormBuilder schema={schema} onFinish={(data) => console.log({ data })} />
  );
};

export default AssetForm;
