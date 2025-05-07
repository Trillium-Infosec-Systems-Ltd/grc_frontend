import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const AvatarComp = ({ src = 'https://randomuser.me/api/portraits/men/32.jpg' }) => (
    <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64 }}
        src={src}
        icon={<AntDesignOutlined />}
    />
);
export default AvatarComp;