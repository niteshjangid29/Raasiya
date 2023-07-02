import React, { Fragment, useEffect, useState } from "react";
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
  updateProduct,
  getProductDetails,
} from "../../actions/productActions";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { id: productId } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

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
  const [oldImages, setOldImages] = useState([]);
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
    "Bed Linen",
  ];

  const updateProductSubmitHandler = (e) => {
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

    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDetails(product.details);
      setDescription(product.description);
      setStory(product.story);
      setSku(product.sku);
      setPrice(product.price);
      setCategory(product.category);
      setCollections(product.collections);
      setStock(product.Stock);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");

      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    alert,
    error,
    dispatch,
    isUpdated,
    navigate,
    productId,
    product,
    updateError,
  ]);
  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            action=""
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

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
                value={price}
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
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
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={updateProductImagesChange}
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Product Preview" />
                ))}
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
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
