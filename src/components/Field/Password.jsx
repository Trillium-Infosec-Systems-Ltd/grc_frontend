import { Form, Input } from 'antd'
import { useState } from 'react'

function Home() {
    const [count, setCount] = useState(0)

    return (
        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>
    )
}

export default Home
