import React, { useState } from "react";

const SearchBar = ({
  initialValue = "",
  placeholder = "Cerca...",
  onSubmit,
  submitLabel = "Cerca",
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!onSubmit) return;
    const trimmed = value.trim();
    onSubmit(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus-within:border-white">
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
      />
      <button
        type="submit"
        className="rounded-full bg-white px-4 py-1 text-sm font-semibold text-black transition-colors hover:bg-zinc-200">
        {submitLabel}
      </button>
    </form>
  );
};

export default SearchBar;
