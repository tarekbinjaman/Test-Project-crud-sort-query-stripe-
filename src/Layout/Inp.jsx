import React, { useEffect, useState } from 'react';
import useMeals from '../Hooks/useMeals';

const Inp = () => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortby, setSortby] = useState('');
    const [searchByName, setSearchByName] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxprice] = useState('');
    const handleMinPrice = (e) => {
        setMinPrice(e.target.value);
    }
    const handleMaxPrice = (e) => {
        setMaxprice(e.target.value);
    }
    const { meals, refetch } = useMeals(categoryFilter, sortby, searchByName, minPrice, maxPrice);
    if(meals.length < 0) {
        return <p>Loading</p>
    }
    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value);
        console.log(categoryFilter)
    }
    const handleSortChange = (e) => {
        setSortby(e.target.value);
    }
    const handleSearchChange = (e) => {
        setSearchByName(e.target.value);
    }
    useEffect(() => {
        refetch();
    }, [categoryFilter, sortby, searchByName, minPrice, maxPrice]);
    return (
        <div>
            <div className='flex justify-between'>
                <div>
                <p className='text-xl'>Min price</p>
                <input type="number" placeholder='Minimum price' value={minPrice} onChange={handleMinPrice} />
                </div>
                <div>
                <p className='text-xl'>Max price</p>
                <input type="number" placeholder='Maximum price' value={maxPrice} onChange={handleMaxPrice} />
                </div>
            </div>
            <div className='lg:flex md:flex mt-8'>
                <div className='flex-1/3'>
                    <p className='text-xl'>Search By Name</p>
                    <br />
                    <input type="text" placeholder='food name' value={searchByName} onChange={handleSearchChange} id="" />
                </div>
                <div className='flex-1/3'>
                    <p className='text-xl'>Search By category</p>
                    <br />
                    <label>
                        <select value={categoryFilter} onChange={handleCategoryChange}>
                            <option value="">All Category</option>
                            <option value="Snack">Snack</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                        </select>
                    </label>
                </div>
                <div className='flex-1/3'>
                    <p className='text-xl'>Sort by likes and comment</p>
                    <br />
                    <select value={sortby} onChange={handleSortChange}>
                        <option value="">Sort by</option>
                        <option value="likes">Likes</option>
                        <option value="reviews_count">Review count</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Inp;