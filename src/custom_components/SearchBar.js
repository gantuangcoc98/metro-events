import React, { useEffect, useState } from 'react';
import '../App.css';
import * as CiIcons from "react-icons/ci";

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState();

    const handleOnClick = () => {
        console.log("Search clicked");
    }

    return (
        <div className='flex h-fit border border-white items-center hover:bg-light-green'>
            <input
            type="text"
            placeholder="Birthday event, basketball game, etc."
            value={searchValue}
            onChange={(e) => {
                setSearchValue(e.target.value);
            }}
            className='search_bar_input'
            />
            
            <CiIcons.CiSearch className='search_icon'
                onClick={()=>{handleOnClick()}}
            />
        </div>
    );
};

export default SearchBar;
