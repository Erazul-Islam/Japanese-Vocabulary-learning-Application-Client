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
    { key: "admin/dashboard/lesson-management", label: "Dashboard" },
  ]

  const menuItems = user?.role === "ADMIN"
    ? [...commonItems, ...adminItems]
    : [...commonItems];


  return (
    <nav style={{ backgroundColor: '#001529', color: 'white' }} className="bg-[#001529] text-white">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">

        <img className="w-10 h-10 rounded-full" src="https://i.ibb.co.com/q5svZgw/DALL-E-2024-12-12-18-16-58-An-aesthetic-logo-design-for-a-Japanese-language-learning-website-The-log.webp" alt="" />
        <Menu
          style={{ backgroundColor: '#001529', color: 'white' }}
          className="hidden  md:flex"
          items={menuItems.map((item) => ({
            key: item.key,
            label: <Link style={{ color: "white" }} to={`/${item.key}`}>{item.label}</Link>,
          }))}
        />

        <div>
          {user ? <div className='cursor-pointer text-white' onClick={handleLogout}>Logout</div> : <Link color="white" to="/login">
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
        open={visible}
        className="md:hidden"
      >
        <Menu
          mode="inline"
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
