import React, { Fragment } from "react";
import "./NewProduct.scss";
import {
  Box,
  CssBaseline,
  Drawer,
  ListItemText,
  List,
  ListItemButton,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { IoBagHandleOutline, IoBagHandleSharp } from "react-icons/io5";
import { FaBlogger, FaBloggerB } from "react-icons/fa";
import {
  MdExpandLess,
  MdExpandMore,
  MdOutlinePeopleAlt,
  MdPeopleAlt,
  MdOutlineShoppingCart,
  MdOutlineRateReview,
} from "react-icons/md";
import Logo from "../../images/Logo.png";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const [open, setOpen] = React.useState({
    customers: false,
    products: false,
    stories: false,
  });
  return (
    <Fragment>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {/* <Toolbar /> */}
        <div className="logo-box">
          <Link to="/">
            <img src={Logo} alt="Raasiya" />
          </Link>
        </div>
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <AiOutlineHome />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton
              onClick={() =>
                setOpen((prevState) => ({
                  // ...prevState,
                  customers: !prevState.customers,
                }))
              }
            >
              <ListItemIcon>
                <MdOutlinePeopleAlt />
              </ListItemIcon>
              <ListItemText primary="Customers" />
              {open.customers ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={open.customers} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <MdPeopleAlt />
                  </ListItemIcon>
                  <ListItemText primary="All" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton
              onClick={() =>
                setOpen((prevState) => ({
                  // ...prevState,
                  products: !open.products,
                }))
              }
            >
              <ListItemIcon>
                <IoBagHandleOutline />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {open.products ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={open.products} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/admin/products1" className="link">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <IoBagHandleSharp />
                    </ListItemIcon>
                    <ListItemText primary="All" />
                  </ListItemButton>
                </Link>
                <Link to="/admin/product1">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <AiOutlinePlus />
                    </ListItemIcon>
                    <ListItemText primary="Create" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            <ListItemButton
              onClick={() =>
                setOpen((prevState) => ({
                  // ...prevState,
                  stories: !open.stories,
                }))
              }
            >
              <ListItemIcon>
                <FaBloggerB />
              </ListItemIcon>
              <ListItemText primary="Stories" />
              {open.stories ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={open.stories} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FaBlogger />
                  </ListItemIcon>
                  <ListItemText primary="All" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AiOutlinePlus />
                  </ListItemIcon>
                  <ListItemText primary="Create" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton>
              <ListItemIcon>
                <MdOutlineShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <MdOutlineRateReview />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default Sidebar;
