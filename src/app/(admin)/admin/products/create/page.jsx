"use client";

import { createProduct } from "@/redux-store/authstore/product/action";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([""]);
  const [categoryPath, setCategoryPath] = useState([""]);
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);

  const dispatch = useDispatch();

  // -------- HANDLERS --------

  const handleArrayChange = (index, value, setter, arr) => {
    const updated = [...arr];
    updated[index] = value;
    setter(updated);
  };

  const addField = (setter, arr, emptyValue) => {
    setter([...arr, emptyValue]);
  };

  const removeField = (index, setter, arr) => {
    const updated = arr.filter((_, i) => i !== index);
    setter(updated);
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  };

  // -------- SUBMIT --------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());

    // Clean arrays
    data.images = images.filter((i) => i.trim() !== "");
    data.categoryPath = categoryPath.filter((c) => c.trim() !== "");

    // Convert specs to object
    const specObj = {};
    specs.forEach(({ key, value }) => {
      if (key) specObj[key] = value;
    });
    data.specifications = specObj;

    // Numbers
    data.price = data.price ? parseFloat(data.price) : null;
    data.originalPrice = data.originalPrice
      ? parseFloat(data.originalPrice)
      : null;
    data.quantity = data.quantity ? parseInt(data.quantity) : null;
    data.returnDay = data.returnDay ? parseInt(data.returnDay) : null;

    try {
      await dispatch(createProduct(data));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }

    console.log(data);
  };

  return (
    <>

  <div className="w-full p-5 grid gap-5 max-h-screen overflow-y-auto  pb-20">
      <h1 className="text-2xl font-bold">Create Product</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 ">

        {/* BASIC FIELDS */}
        <input name="name" placeholder="Product Name" className="border p-3 rounded" required />
        <input name="brand" placeholder="Brand" className="border p-3 rounded" />
        <input name="categoryId" placeholder="Category ID" className="border p-3 rounded" required />
        <input name="color" placeholder="Color" className="border p-3 rounded" />
        <input type="number" name="price" placeholder="Price" className="border p-3 rounded" />
        <input type="number" name="originalPrice" placeholder="Original Price" className="border p-3 rounded" />
        <input name="store" placeholder="Store" className="border p-3 rounded" />
        <input type="number" name="quantity" placeholder="Quantity" className="border p-3 rounded" />
        <input type="number" name="returnDay" placeholder="Return Days" className="border p-3 rounded" />

        {/* IMAGES */}
        <div>
          <h2 className="font-bold">Images</h2>
          {images.map((img, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={img}
                onChange={(e) =>
                  handleArrayChange(i, e.target.value, setImages, images)
                }
                className="border p-2 w-full rounded"
                placeholder="Image URL"
              />
              <button type="button" onClick={() => removeField(i, setImages, images)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={() => addField(setImages, images, "")}>
            ➕ Add Image
          </button>

          <div className="text-sm mt-2">
            Preview: {JSON.stringify(images)}
          </div>
        </div>

        {/* CATEGORY PATH */}
        <div>
          <h2 className="font-bold">Category Path</h2>
          {categoryPath.map((cat, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={cat}
                onChange={(e) =>
                  handleArrayChange(i, e.target.value, setCategoryPath, categoryPath)
                }
                className="border p-2 w-full rounded"
                placeholder="Category"
              />
              <button type="button" onClick={() => removeField(i, setCategoryPath, categoryPath)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={() => addField(setCategoryPath, categoryPath, "")}>
            ➕ Add Category
          </button>

          <div className="text-sm mt-2">
            Preview: {JSON.stringify(categoryPath)}
          </div>
        </div>

        {/* SPECIFICATIONS */}
        <div>
          <h2 className="font-bold">Specifications</h2>
          {specs.map((spec, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={spec.key}
                onChange={(e) => handleSpecChange(i, "key", e.target.value)}
                placeholder="Key"
                className="border p-2 rounded w-1/2"
              />
              <input
                value={spec.value}
                onChange={(e) => handleSpecChange(i, "value", e.target.value)}
                placeholder="Value"
                className="border p-2 rounded w-1/2"
              />
              <button type="button" onClick={() => removeField(i, setSpecs, specs)}>❌</button>
            </div>
          ))}
          <button type="button" onClick={() => addField(setSpecs, specs, { key: "", value: "" })}>
            ➕ Add Spec
          </button>

          <div className="text-sm mt-2">
            Preview:{" "}
            {JSON.stringify(
              specs.reduce((acc, cur) => {
                if (cur.key) acc[cur.key] = cur.value;
                return acc;
              }, {})
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <textarea name="description" placeholder="Description" className="border p-3 rounded" />

        {/* SUBMIT */}
        <button
          className={`p-4 rounded bg-yellow-500 font-bold ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
      <div className=" m-5  w-full"></div>
    </div>


    
    </>
  );
}