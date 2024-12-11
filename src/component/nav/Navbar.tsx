import React, { useState } from "react";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, useCurrentToken } from "../../redux/feature/auth/auth.slice";
import { verifyToken } from "../../utils/verifyToken";

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token);
  }

  console.log(user)

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const commonItems = [
    { key: "lessions", label: "Lessons" },
    { key: "tutorials", label: "Tutorials" },
  ];

  const adminItems = [
    { key: "admin/dashboard", label: "Dashboard" },
    // { key: "admin/dashboard/lesson-management", label: "Lesson" },
  ];

  const userItems = [
    { key: "user/profile", label: "User Profile" },
  ];

  const menuItems = user?.role === "ADMIN"
    ? [...commonItems, ...adminItems]
    : [...commonItems, ...userItems];


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

        <div>
          {user ? <div className='cursor-pointer' onClick={handleLogout}>Logout</div> : <Link color="foreground" to="/login">
            Login
          </Link>}
        </div>

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
