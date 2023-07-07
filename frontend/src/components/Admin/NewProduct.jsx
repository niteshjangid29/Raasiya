import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.scss";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import {
  MdAccountTree,
  MdAttachMoney,
  MdDescription,
  MdSpellcheck,
  MdStorage,
} from "react-icons/md";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  createProduct,
  getAllCategories,
} from "../../actions/productActions";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { categoryPair } = useSelector((state) => state.categoryProducts);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState("");
  const [story, setStory] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [collections, setCollections] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("details", details);
    myForm.set("description", description);
    myForm.set("story", story);
    myForm.set("sku", sku);
    myForm.set("price", price);
    myForm.set("category", category);
    myForm.set("collections", collections);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");

      dispatch({ type: NEW_PRODUCT_RESET });
      dispatch(getAllCategories());
    }
  }, [alert, error, dispatch, success, navigate]);
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            action=""
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <MdSpellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MdAttachMoney />
              <input
                type="number"
                placeholder="Price"
                required
                // value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <MdDescription />
              <textarea
                placeholder="Details"
                value={details}
                required
                onChange={(e) => setDetails(e.target.value)}
                cols="30"
                rows="1"
              />
            </div>
            <div>
              <MdDescription />
              <textarea
                placeholder="Product Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              />
            </div>
            <div>
              <MdDescription />
              <textarea
                placeholder="Story"
                value={story}
                required
                onChange={(e) => setStory(e.target.value)}
                cols="30"
                rows="1"
              />
            </div>

            <div>
              <MdSpellcheck />
              <input
                type="text"
                placeholder="SKU"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>
            <div>
              <MdSpellcheck />
              <input
                type="text"
                placeholder="Collections"
                required
                value={collections}
                onChange={(e) => setCollections(e.target.value)}
              />
            </div>

            <div>
              <MdAccountTree />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categoryPair.map((category) => (
                  <option key={category} value={category.key}>
                    {category.key}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <MdStorage />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={createProductImagesChange}
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
