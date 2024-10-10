import React from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "@service";
import bgImg from "@assets/bg.jpg"
import { SignIn } from "@types";


const { Title, Text } = Typography;



const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: SignIn) => {
    try {
      const res = await auth.sign_in(values)
     
      if (res.status === 201) {
        let access_token = res?.data?.data?.tokens?.access_token
        console.log(access_token, "from sign-in");
        
        localStorage.setItem("access_token", access_token)  
        message.success("Muvaffaqiyatli kirdingiz!");
        navigate("/layout");
      }
    } catch (error) {
      console.error("Login xatolik:", error);
      message.error("Passwor or phone number is wrong")
    }
   
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center',padding: "0px" }}>
      <div style={{ width: "50%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={bgImg} alt="bg-img" />
      </div>
      <div style={{width: "30%", display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: "150px" }}>
        <Title level={2}  className="text-center font-bold fs-1">Login</Title>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Phone number"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                backgroundColor: "#d35400",
                borderColor: "#d35400",
                height: "40px",
                fontSize: "16px",
              }}
            >
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Text>Don’t you have an account? </Text>
            <NavLink to="/sign-up">
              <Text strong style={{ color: "#d35400" }}>
                Register
              </Text>
            </NavLink>
          </div>
        </Form>
      </div>
    </div>  
  );
};

export default LoginForm;
