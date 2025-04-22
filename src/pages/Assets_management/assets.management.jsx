import FormBuilder from '../../components/Form/Form.Builder';
import useFormHook from '../../hooks/useFormHook';

function AssetManagement() {
  const [form] = useFormHook('asset');

  return (
    <FormBuilder schema={form} onFinish={(data) => console.log({ data })} />
  );
}

export default AssetManagement;