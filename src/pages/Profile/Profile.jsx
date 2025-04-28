import FormBuilder from '../../components/Form/Form.Builder';
import { ROUTES } from '../../constants/routes.constants';

const ProfileManagement = () => {
    return (
        <FormBuilder screen='users' title='' redirect={ROUTES.PRIVATE.PROFILE} />
    );
};

export default ProfileManagement
