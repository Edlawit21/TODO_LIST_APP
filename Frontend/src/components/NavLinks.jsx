import { StarOutlined, FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const NavLinks = () => {
  const items = [
    {
      key: "1",
      label: <Link to="/home">My To Do&apos;s</Link>,
      icon: <FormOutlined />,
    },
    {
      key: "2",
      label: "Important",
      icon: <StarOutlined />,
    },
  ];

  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <div className="w-64 rounded-lg ">
      <Menu
        onClick={onClick}
        style={{
          width: "100%",
        }}
        defaultSelectedKeys={["1"]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default NavLinks;
