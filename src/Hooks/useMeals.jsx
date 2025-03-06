import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useMeals = (category, sortby, name, minPrice, maxPrice) => {
    const {data: meals = [], refetch, isLoading} = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/data?category=${category}&sortby=${sortby}&name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
            return response.json();
        }
    })
    return {meals, refetch, isLoading}
};

export default useMeals;