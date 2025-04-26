import FormBuilder from '../../../components/Form/Form.Builder';
import useFormHook from '../../../hooks/useFormHook';


const RiskForm = () => {
  const [form] = useFormHook('/schemas/risks');

  return (
    <div>
      <div className="table-header">
        <h2 className="title">Add New Risk</h2>
      </div>
      <FormBuilder schema={form} onFinish={null} />
    </div>
  );
};

export default RiskForm;
