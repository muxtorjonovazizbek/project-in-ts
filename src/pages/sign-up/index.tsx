
  import { Button, Form, Input, Typography, message } from "antd";
  import { NavLink, useNavigate } from "react-router-dom";
  import bgImg from "@assets/bg.jpg";
  import { auth } from "@service";
  import { SignUp } from "@types";


  const { Title, Text } = Typography;

  const SignUpForm: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: SignUp) => {
      try {
        const res = await auth.sign_up(values)
        if (res.status === 201) {
          message.success("Muvaffaqiyatli kirdingiz!");
          navigate("/");
        }
      } catch (error) {
        message.error("Login vaqtida xatolik yuz berdi.");
        console.error("Login xatolik:", error);
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
          <Title level={2}  className="text-center font-bold fs-1">Sign Up</Title>
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
              label="First Name"
              name="first_name"
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
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
                Sign Up
              </Button>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Text>Already have an account? </Text>
              <NavLink to="/">
                <Text strong style={{ color: "#d35400" }}>
                  Login
                </Text>
              </NavLink>
            </div>
          </Form>
        </div>
      </div>
    );
  }
  export default SignUpForm;

