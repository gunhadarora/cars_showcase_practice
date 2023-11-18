"use client";

import React from "react";
import { SearchManufacturer } from ".";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`ml-3 z-10 ${otherClasses} `}>
    <Image
      src={`/magnifying-glass.svg`}
      width={40}
      height={40}
      alt="search"
      className="object-contain "
    />
  </button>
);

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const router=useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manufacturer === "" && model === "") {
      return alert("Please fill in the searchbar");
    }
    updateSearchParams(model.toLowerCase(),manufacturer.toLowerCase());
  };
  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }
    searchParams.delete("limit");
    searchParams.delete("fuel");
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname,{scroll:false})
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-start max-sm:flex-col w-full relative max-sm:gap-4 max-w-3xl"
    >
      <div className="flex-1 max-sm:w-full flex justify-start items-center relative">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden absolute right-1" />
      </div>
      <div className="flex-1 max-sm:w-full flex justify-start items-center relative ml-2">
        <Image
          src={`/model-icon.png`}
          width={25}
          height={25}
          alt="model"
          className="absolute ml-4 w-[20px] h-[20px] mb-1"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Golf"
          className="w-full h-[48px] pl-12 p-4 bg-light-white rounded-full outline-none cursor-pointer text-sm"
        />
        <SearchButton otherClasses="sm:hidden absolute right-1" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
