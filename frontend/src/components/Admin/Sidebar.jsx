import React from "react";
import "./Sidebar.scss";
import Logo from "../../images/Logo.png";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdExpandMore,
  MdImportExport,
  MdListAlt,
  MdPeople,
  MdPostAdd,
  MdRateReview,
} from "react-icons/md";
import { TreeItem, TreeView } from "@mui/lab";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={Logo} alt="Raasiya" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <MdDashboard />
          Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<MdExpandMore />}
          defaultExpandIcon={<MdImportExport />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<MdPostAdd />} />
            </Link>
            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<MdPostAdd />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <MdListAlt />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <MdPeople />
          Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <MdRateReview />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
