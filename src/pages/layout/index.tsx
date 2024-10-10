import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import {admin} from "../../router/routes"
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Index = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string | undefined>(undefined)
  const {pathname} = useLocation()
  console.log(pathname);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(()=> {
    let index = admin.findIndex((item) => item.path === pathname)
    console.log(index);
    setSelectedKeys(index.toString())
  }, [pathname])
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='h-[100vh]'>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKeys]}
          items={admin.map((item, index) => ({
            key: index.toString(),
            icon: React.cloneElement(item.icon, {style: {fontSize: "23px"}}),
            label: <NavLink to={item.path} className='text-white fs-6' >{item.content}</NavLink>,
          }))}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 70,
              height: 70,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Index;