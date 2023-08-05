import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getAllCategories,
  getProductDetails,
  updateProduct,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { MdCurrencyRupee, MdProductionQuantityLimits } from "react-icons/md";
import MetaData from "../layout/MetaData";

const UpdateProduct1 = () => {
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
  const { categoryPair } = useSelector((state) => state.categoryProducts);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState("");
  const [story, setStory] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [collections, setCollections] = useState("");
  const [Stock, setStock] = useState(0);
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [packedBy, setPackedBy] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    const selectedCategoryObj = categoryPair.find(
      (catObj) => catObj.key === selectedCategory
    );

    if (selectedCategoryObj) {
      setFilteredSubCategories(selectedCategoryObj.subCategories);
      setSubCategory(""); // Reset subCategory when changing category
    } else {
      setFilteredSubCategories([]);
      setSubCategory("");
    }
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    if (category === "addNewCategory") {
      myForm.set("category", newCategory);
    } else {
      myForm.set("category", category);
    }
    if (subCategory === "addNewSubCategory") {
      myForm.set("subCategory", newSubCategory);
    } else {
      myForm.set("subCategory", subCategory);
    }

    myForm.set("name", name);
    myForm.set("details", details);
    myForm.set("description", description);
    myForm.set("story", story);
    myForm.set("sku", sku);
    myForm.set("price", price);
    myForm.set("collections", collections);
    myForm.set("Stock", Stock);
    myForm.set("countryOfOrigin", countryOfOrigin);
    myForm.set("packedBy", packedBy);
    myForm.set("registeredAddress", registeredAddress);

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
      setPrice(product.price);
      setStock(product.Stock);
      setCategory(product.category);
      setSubCategory(product.subCategory);
      setDetails(product.details);
      setDescription(product.description);
      setStory(product.story);
      setSku(product.sku);
      setCollections(product.collections);
      setCountryOfOrigin(product.countryOfOrigin);
      setPackedBy(product.packedBy);
      setRegisteredAddress(product.registeredAddress);
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
      navigate("/admin/products1");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
    dispatch(getAllCategories());
  }, [
    alert,
    error,
    dispatch,
    isUpdated,
    updateError,
    navigate,
    product,
    productId,
  ]);

  useEffect(() => {
    const selectedCategoryObj = categoryPair.find(
      (catObj) => catObj.key === category
    );
    if (selectedCategoryObj) {
      setFilteredSubCategories(selectedCategoryObj.subCategories);
    } else {
      setFilteredSubCategories([]);
    }
  }, [category, categoryPair]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Product" />
          <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box component="main" className="create-product">
              <h1 className="heading">Update Product</h1>
              <Box>
                <form
                  action=""
                  className="product-form"
                  encType="multipart/form-data"
                  onSubmit={updateProductSubmitHandler}
                >
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Box
                    component="div"
                    sx={{
                      "& > :not(style)": {
                        ":first-child": { mr: 1.5 },
                        ":last-child": { ml: 1.5 },
                        display: "flex",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="Price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Price"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MdCurrencyRupee />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="Stock"
                      value={Stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Stock"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MdProductionQuantityLimits />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      onChange={handleCategoryChange}
                      label="Category"
                    >
                      {categoryPair.map((cat) => (
                        <MenuItem value={cat.key}>{cat.key}</MenuItem>
                      ))}
                      <MenuItem value="addNewCategory">
                        + Add New Category
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {category === "addNewCategory" && (
                    <TextField
                      fullWidth
                      id="outlined-textarea"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      label="Add New Category"
                    />
                  )}
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      Sub Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      label="Category"
                    >
                      {filteredSubCategories.map((subCat) => (
                        <MenuItem value={subCat}>{subCat}</MenuItem>
                      ))}
                      <MenuItem value="addNewSubCategory">
                        + Add New Sub Category
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {subCategory === "addNewSubCategory" && (
                    <TextField
                      fullWidth
                      id="outlined-textarea"
                      value={newSubCategory}
                      onChange={(e) => setNewSubCategory(e.target.value)}
                      label="Add New Sub Category"
                    />
                  )}
                  <TextField
                    id="standard-multiline-static"
                    label="Product Details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    multiline
                    rows={3}
                  />
                  <TextField
                    id="standard-multiline-static"
                    label="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={3}
                  />
                  <TextField
                    id="standard-multiline-static"
                    label="Product Story"
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    multiline
                    rows={3}
                  />
                  <Box
                    component="div"
                    sx={{
                      "& > :not(style)": {
                        ":first-child": { mr: 1.5 },
                        ":last-child": { ml: 1.5 },
                        display: "flex",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="SKU"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      type="text"
                    />
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="Collection"
                      value={collections}
                      onChange={(e) => setCollections(e.target.value)}
                      type="text"
                    />
                  </Box>
                  <Box
                    component="div"
                    sx={{
                      "& > :not(style)": {
                        ":first-child": { mr: 1.5 },
                        ":last-child": { ml: 1.5 },
                        display: "flex",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="Country of Origin"
                      type="text"
                      value={countryOfOrigin}
                      onChange={(e) => setCountryOfOrigin(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      id="outlined-number"
                      label="Packed By"
                      value={packedBy}
                      onChange={(e) => setPackedBy(e.target.value)}
                      type="text"
                    />
                  </Box>
                  <TextField
                    fullWidth
                    id="outlined-number"
                    label="Registered Address"
                    value={registeredAddress}
                    onChange={(e) => setRegisteredAddress(e.target.value)}
                    type="text"
                  />
                  <Box className="productImageBox">
                    <Box component="div" className="imagePreview">
                      {oldImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt="Product Images Preview"
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box component="div" className="productImageBox">
                    <Button variant="contained" component="label">
                      Upload File
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        multiple
                        onChange={updateProductImagesChange}
                        hidden
                      />
                    </Button>
                    <Box component="div" className="imagePreview">
                      {imagesPreview.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="Product Images Preview"
                        />
                      ))}
                    </Box>
                  </Box>
                  <button
                    type="submit"
                    className="myBtn"
                    disabled={loading ? true : false}
                  >
                    Update Product
                  </button>
                </form>
              </Box>
            </Box>
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProduct1;
