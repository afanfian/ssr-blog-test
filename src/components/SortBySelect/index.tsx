import React from "react";

interface SortBySelectProps {
  value: "title";
  onChange: (value: "title") => void;
}

const SortBySelect: React.FC<SortBySelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as "title")}
      className=" px-1 py-3 rounded-lg border border-gray-500"
    >
      <option value="title">Title</option>
    </select>
  );
};

export default SortBySelect;
