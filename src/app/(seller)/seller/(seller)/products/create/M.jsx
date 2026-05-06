"use client";
import { useState } from "react";

export const CategorySelect = ({
  data,
  path,
  setPath,
  SetCategoryId,
  level = 0,
}) => {
  // Track selected ID at this level
  const [currentId, setCurrentId] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const selectedItem = data.find((item) => item.id === value);
    if (!selectedItem) return;

    // Update path (names)
    const newPath = [...path];
    newPath[level] = selectedItem.name;
    newPath.splice(level + 1); // remove deeper selections
    setPath(newPath);

    // Update current ID for this level
    setCurrentId(selectedItem.id);

    // If leaf category, update final categoryId
    if (!selectedItem.children || selectedItem.children.length === 0) {
      SetCategoryId(selectedItem.id);
    }
  };

  const selectedItem = data.find((item) => item.id === currentId);

  return (
    <div className="grid mb-3 gap-5">
      <select
        className="border p-2 w-full rounded"
        value={currentId}
        onChange={handleChange}
      >
        <option value="" className="text-yellow-500 " >Select category</option>
        {data.map((item) => (
          <option key={item.id} value={item.id} className="text-yellow-500 ">
            {item.name}
          </option>
        ))}
      </select>

      {/* Recursively render children if exist */}
      {selectedItem?.children?.length > 0 && (
        <CategorySelect
          data={selectedItem.children}
          path={path}
          setPath={setPath}
          SetCategoryId={SetCategoryId}
          level={level + 1}
        />
      )}
    </div>
  );
};