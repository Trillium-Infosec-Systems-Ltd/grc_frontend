import { useNavigate } from 'react-router-dom';
import FormBuilder from '../../../components/Form/Form.Builder';
import AppLoader from '../../../components/Loader/loader';
import useFormHook from '../../../hooks/useFormHook';
import { createAsset } from '../../../services/assets.management.service';
import { KEY } from '../../../constants/keys.constants';


const AssetForm = ({ MODE = KEY.VIEW }) => {
  const navigate = useNavigate()
  const [form, isLoading, data, submit] = useFormHook('assets', MODE);

  return (
    <div>
      <AppLoader isLoading={isLoading}>
        <div className="table-header">
          <h2 className="title">{MODE === KEY.EDIT ? 'Edit Asset' : 'Add New Asset'}</h2>
        </div>
        <FormBuilder schema={form} initialData={data ?? {}} onFinish={(fields) => submit(createAsset({ ...fields, id: data?.id ?? null }, navigate, MODE))} />
      </AppLoader>
    </div>
  );
};

export default AssetForm;
