import FormBuilder from '../../components/Form/FormBuilder';
import { ROUTES } from '../../constants/routesConstants';

const ProfileManagement = () => {
    return (
        <FormBuilder screen='users' title='' redirect={ROUTES.PRIVATE.PROFILE} />
    );
};

export default ProfileManagement
