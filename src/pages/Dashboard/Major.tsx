import { Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import Caption from "../../components/Caption";
import CustomTable from "../../components/CustomTable"
import { Input } from "antd";
import { useState, type ChangeEvent } from "react";
import { getMajor } from "../../service/getMajor";
import debounce from "../../hooks/debounce";

function Major() {

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Nomi",
      dataIndex: "name",
    },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "createdAt",
    },
    {
      title: "Batafsil",
      dataIndex: "action",
    },
  ];

  const searchByName = debounce(search, 500);
  const majorList = getMajor("/stacks", searchByName, setLoading);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    setSearch(e.target.value);
  }

  return (
    <div className="p-5">
      <div className="p-5 bg-white rounded-md">
        <Caption
          title="Yo'nalishlar"
          count={majorList?.total ? majorList?.total : 0}
          icon={<PlusOutlined />}
        />
        <div className="py-5">
          <Input
            onChange={handleSearch}
            className="!w-[300px]"
            size="large"
            allowClear
            placeholder="Qidirish"
          />
        </div>
        <CustomTable loading={loading}  columns={columns} data={majorList.data} />
      </div>
    </div>
  );
}

export default Major