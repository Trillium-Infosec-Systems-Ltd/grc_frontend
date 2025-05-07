import { Spin } from 'antd';

const AppLoader = ({ isLoading = false, children }) => (

    isLoading ? <div style={{ minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
    </div> : children
);

export default AppLoader;
