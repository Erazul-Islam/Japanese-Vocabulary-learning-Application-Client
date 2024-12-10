import React, { useState } from "react";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);


  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "lessions", label: "Lessions" },
    { key: "tutorials", label: "Tutorials" },
    { key: "login", label: "Login" },
    { key: "signup", label: "Register" },
  ];

  return (
    <nav className="bg-white ">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">

        <div className="text-xl font-bold text-indigo-600">MyLogo</div>


        <Menu
          mode="horizontal"
          className="hidden md:flex"
          items={menuItems.map((item) => ({
            key: item.key,
            label: <Link to={`/${item.key}`}>{item.label}</Link>,
          }))}
        />

        <Button
          icon={<MenuOutlined />}
          className="md:hidden"
          onClick={showDrawer}
        />
      </div>


      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        visible={visible}
        className="md:hidden"
      >
        <Menu
          mode="vertical"
          items={menuItems.map((item) => ({
            key: item.key,
            label: <Link to={`/${item.key}`}>{item.label}</Link>,
          }))}
        />
      </Drawer>
    </nav>
  );
};

export default Navbar;
