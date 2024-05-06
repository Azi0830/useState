import { useState, useEffect } from "react";
import { Avatar, Card, Dropdown, Space, Menu, Skeleton, Switch } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  DeleteOutlined,
  DashOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
import axios from "axios";

const items = [
  {
    label: "DELETE",
    key: "1",
  },
  {
    label: "EDIT",
    key: "2",
  },
];

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [caunt, setCount] = useState(1);

  // const I = () => {
  //   setCount(caunt + 1);
  // };

  // const D = () => {
  //   if (caunt <= 1) return;
  //   setCount(caunt - 1);
  // };

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/todos")
    //   .then((res) => res.json())
    //   .then((data) => setData(data));
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onDelete = (id) => {
    setData(data.filter((value) => value.id !== id));
  };

  const handleMenuClick = (key, id) => {
    if (key === "1") {
      onDelete(id);
    } else if (key === "2") {
      // Do something for edit action
    }
  };

  const onChange = (checked) => {
    setLoading(!checked);
  };

  return (
    <div className="flex flex-col gap-[30px] items-center justify-center">
      {/* <div className="mt-48 flex gap-[10px]">
        <Button onClick={D} type="primary" danger>
          -
        </Button>
        {caunt}
        <Button onClick={I} type="primary">
          +
        </Button>
      </div> */}
      <Switch checked={!loading} onChange={onChange} />
      {data.map((value) => {
        return (
          <>
            <Skeleton className="w-[300px]" loading={loading} avatar active>
              <Card
                key={value.id}
                style={{
                  width: 300,
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <Dropdown
                    overlay={
                      <Menu
                        onClick={({ key }) => handleMenuClick(key, value.id)}
                      >
                        {items.map((item) => (
                          <Menu.Item key={item.key}>{item.label}</Menu.Item>
                        ))}
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Menu
                        <DashOutlined />
                      </Space>
                    </a>
                  </Dropdown>,
                  // <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                  }
                  title={value.title}
                />
              </Card>
            </Skeleton>
          </>
        );
      })}
    </div>
  );
}

export default App;
