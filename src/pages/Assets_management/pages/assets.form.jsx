import FormBuilder from '../../../components/Form/Form.Builder';
import useFormHook from '../../../hooks/useFormHook';

const AssetForm = () => {
  const [form] = useFormHook('assets');

  return (
    <FormBuilder schema={form} onFinish={(data) => console.log({ data })} />
  );
};

export default AssetForm;
