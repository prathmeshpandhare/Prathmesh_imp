import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  BankOutlined,
  LogoutOutlined,
  SafetyOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Drawer } from "antd";

const { Sider } = Layout;

const Sidebar = ({
  setIsAuthenticated,
  isSidebarOpen,
  setIsSidebarOpen,
  collapsed,
  setCollapsed,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    document.cookie
      .split(";")
      .forEach(
        (c) =>
          (document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            ))
      );
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SidebarLink = ({ to, children }) => (
    <NavLink
      to={to}
      onClick={() => {
        if (isMobile) setIsSidebarOpen(false);
      }}
    >
      {children}
    </NavLink>
  );

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <SidebarLink to="/">Dashboard</SidebarLink>,
    },
    {
      key: "/deals",
      icon: <BankOutlined />,
      label: <SidebarLink to="/deals">Deals</SidebarLink>,
    },
    {
      key: "/vans",
      icon: <SettingOutlined />,
      label: <SidebarLink to="/vans">Vans</SidebarLink>,
    },
    {
      key: "/owners",
      icon: <UserOutlined />,
      label: <SidebarLink to="/owners">Owners</SidebarLink>,
    },
    {
      key: "/payments",
      icon: <CalendarOutlined />,
      label: <SidebarLink to="/payments">Payments</SidebarLink>,
    },
    {
      key: "/owner-dashboard",
      icon: <SafetyOutlined />,
      label: <SidebarLink to="/owner-dashboard">Owner View</SidebarLink>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const renderMenu = (
    <>
      <div className="p-4 flex justify-between items-center">
        {!collapsed && !isMobile && (
          <h2 className="text-2xl text-white font-bold ms-4"></h2>
        )}
        <Button
          type="primary"
          onClick={() => {
            if (isMobile) {
              setIsSidebarOpen(false);
            } else {
              setCollapsed(!collapsed);
            }
          }}
          icon={
            collapsed || isMobile ? (
              <MenuUnfoldOutlined />
            ) : (
              <MenuFoldOutlined />
            )
          }
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        inlineCollapsed={!isMobile && collapsed}
      />
    </>
  );

  return isMobile ? (
    <Drawer
      placement="left"
      closable={false}
      onClose={() => setIsSidebarOpen(false)}
      open={isSidebarOpen}
      width={256}
      bodyStyle={{ padding: 0, background: "#001529" }}
    >
      {renderMenu}
    </Drawer>
  ) : (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={256}
      className="fixed h-screen z-40 left-0 top-0 bg-dark"
      theme="dark"
      trigger={null}
    >
      {renderMenu}
    </Sider>
  );
};

export default Sidebar;
