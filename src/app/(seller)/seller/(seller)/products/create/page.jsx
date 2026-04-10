"use client";

import { createProduct, getCategorytree } from "@/redux-store/authstore/product/action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategorySelect } from './M';
import { FaPlus, FaTimes } from "react-icons/fa";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [categoryPath, setCategoryPath] = useState([]);
  const [specs, setSpecs] = useState({});
  const [name, setName] = useState("");   // for input: spec name
  const [value, setValue] = useState(""); // for input: spec value

  const dispatch = useDispatch();
  const [categoryId, SetCategoryId] = useState("");
  const CategoriesList = useSelector((state) => state.productReducer.categories);

  const addSpec = () => {
    if (!name) return; // don't allow empty name
    setSpecs(prev => ({
      ...prev,
      [name]: value
    }));
    setName("");
    setValue("");
  };

  useEffect(() => {
    console.log("useEffect called")
    getCategories()
  }, []);

  const getCategories = async () => {
    console.log("getCategories called")
    try {
      await dispatch(getCategorytree({}))
    } catch (error) {
      console.error(error);
    }
  };

  console.log(categoryId, "categoriesId")
  console.log(categoryPath.toLocaleString(), "categoriesList")

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeSpec = (index) => {
    const newSpecs = { ...specs }; // make a shallow copy
    const keyToRemove = Object.keys(newSpecs)[index]; // find key by index
    delete newSpecs[keyToRemove]; // remove the key
    setSpecs(newSpecs); // update state
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      brand: formData.get("brand"),
      categoryId,
      categoryPath,
      color: formData.get("color"),
      price: parseFloat(formData.get("price")),
      originalPrice: parseFloat(formData.get("originalPrice")),
      store: formData.get("store"),
      quantity: parseInt(formData.get("quantity")),
      returnDay: parseInt(formData.get("returnDay")),
      description: formData.get("description"),
      images,
      specifications: specs,
    };
    try{
      await dispatch(createProduct(data));

    }catch(error){

    }
    finally{
      setLoading(false)
    }
    console.log(data, "formData")
  }

  return (
    <div className="p-5 grid grid-cols-1 w-full place-items-center gap-5 mb-10">

      <div className="p-5 grid grid-cols-1 w-full">
        <h1 className="font-bold text-2xl">Create Product</h1>
      </div>

      <div className="p-5 grid grid-cols-1 w-full">
        <form onSubmit={handleSubmit} className="grid gap-4">

          <div className="gap-5">
            {CategoriesList && CategoriesList.length > 0 && (
              <CategorySelect
                data={CategoriesList}
                path={categoryPath}
                setPath={setCategoryPath}
                SetCategoryId={SetCategoryId}
              />
            )}
          </div>

          <div className="flex gap-5">
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="border p-3 rounded w-full"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button
              onClick={() => { setImages([...images, imageUrl]); setImageUrl("") }}
              type="button"
              className="p-3 rounded bg-blue-500 text-foreground cursor-pointer border"
            >
              <FaPlus className="text-2xl font-bold text-foreground" />
            </button>
          </div>

          {images.length > 0 &&
            <div className="grid gap-5">
              <p className="font-bold">Images Link:</p>
              {images.map((item, index) => (
                <div key={index} className="flex gap-5">
                  <input type="text" value={item} readOnly className="border p-3 rounded w-full" />
                  <button
                    onClick={() => { removeImage(index) }}
                    className="font-bold text-2xl border p-4 rounded cursor-pointer"
                  >
                    <FaTimes className="font-bold text-2xl" />
                  </button>
                </div>
              ))}
            </div>
          }

          <input name="name" placeholder="Product Name" className="border p-3 rounded" required />
          <input name="brand" placeholder="Brand" className="border p-3 rounded" required />
          <input name="categoryId" placeholder="Category ID" className="border p-3 rounded" required readOnly value={categoryId} />
          <input
            name="category"
            placeholder="Category Path"
            className="border p-3 rounded"
            required
            readOnly
            value={categoryPath.join(" / ")}
          />
          <input name="color" placeholder="Color" className="border p-3 rounded" required />
          <input type="number" name="price" placeholder="Price" className="border p-3 rounded" required />
          <input type="number" name="originalPrice" placeholder="Original Price" className="border p-3 rounded" required />
          <input name="store" placeholder="Store" className="border p-3 rounded" required />
          <input type="number" name="quantity" placeholder="Quantity" className="border p-3 rounded" required />
          <input type="number" name="returnDay" placeholder="Return Days" className="border p-3 rounded" required />

          <div className="w-full flex-col gap-5 py-5">
            <h2>Product Specifications</h2>
            <div className="flex flex-col md:flex-row lg:flex-row gap-5 w-full">
              <input
                placeholder="Specification Name"
                value={name}
                className="border p-3 rounded w-full md:w-1/2"
                onChange={e => setName(e.target.value)}
              />
              <input
                placeholder="Specification Value"
                value={value}
                className="border p-3 rounded w-full md:w-1/2"
                onChange={e => setValue(e.target.value)}
              />
              <button
                onClick={addSpec}
                className="border p-3 rounded w-full md:w-1/2 bg-yellow-500 cursor-pointer"
              >
                Add Spec
              </button>
            </div>

            <h3>Specs:</h3>
            <ul>
              {Object.entries(specs).map(([key, val], index) => (
                <li key={index} className="mb-4 flex flex-col md:flex-row gap-3 items-center">
                  <div className="flex flex-col md:flex-row gap-3 flex-1">
                    <input
                      type="text"
                      value={key}
                      readOnly
                      className="border p-3 rounded w-full"
                    />
                    <input
                      type="text"
                      value={val}
                      readOnly
                      className="border p-3 rounded w-full"
                    />
                  </div>
                  <button
                    onClick={() => removeSpec(index)}
                    className="font-bold text-2xl border p-4 rounded cursor-pointer"
                  >
                    <FaTimes className="font-bold text-2xl" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <textarea name="description" placeholder="Description" className="border p-3 rounded" required />

          <button
            type="submit"
            className={`p-4 rounded bg-yellow-500 font-bold cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
           {loading?"Creating......":" Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}