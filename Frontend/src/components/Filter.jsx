import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Select } from "antd";
import PropTypes from "prop-types";

const { Option } = Select;

const Filter = ({ activeView, setActiveView }) => {
  return (
    <div className="flex justify-around items-center w-full mx-auto space-x-4 mt-6">
      <div className="relative flex items-center bg-gray-200 rounded-lg p-1 w-24 h-10">
        <div
          className={`absolute top-0 bottom-0 m-1 w-1/2 rounded-lg transition-all duration-300 ${
            activeView === "list"
              ? "left-0 bg-blue-500"
              : "left-1/2 bg-blue-500"
          }`}
        />

        <div
          className="flex-1 flex items-center justify-center cursor-pointer text-gray-600 relative z-10"
          onClick={() => setActiveView("list")}
        >
          <UnorderedListOutlined
            style={{
              fontSize: "24px",
              color: activeView === "list" ? "white" : "inherit",
            }}
          />
        </div>

        <div
          className="flex-1 flex items-center justify-center cursor-pointer text-gray-600 relative z-10"
          onClick={() => setActiveView("grid")}
        >
          <AppstoreOutlined
            style={{
              fontSize: "24px",
              color: activeView === "grid" ? "white" : "inherit",
            }}
          />
        </div>
      </div>

      <Select
        size="large"
        style={{ width: 200, height: "40px" }}
        placeholder="Select filter"
        showSearch
        className="h-10"
      >
        <Option value="">All Tasks</Option>
        <Option value="pending">Pending</Option>
        <Option value="completed">Completed</Option>
      </Select>
    </div>
  );
};

Filter.propTypes = {
  activeView: PropTypes.oneOf(["list", "grid"]).isRequired,
  setActiveView: PropTypes.func.isRequired,
};

export default Filter;
