// src/AllProducts.jsx (logic)
import React, { useState, useEffect } from 'react';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    minRating: 0,
    maxRating: 5,
    minPrice: 0,
    maxPrice: 1000,
    availability: 'all', // all, inStock, outOfStock
  });
  const [sortBy, setSortBy] = useState('default'); // default, price, rating, discount

  const fetchProducts = async () => {
    try {
      const response = await fetch(buildAPIUrl(filters));
      const data = await response.json();
      setProducts(data.products.map(generateProductId)); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, sortBy]); 
  const buildAPIUrl = (filters) => {
    const baseUrl = 'http://20.244.56.144/test/companies/';
    const companyParam = filters.company ? `companies/${filters.company}/` : '';
    const categoryParam = filters.category ? `categories/${filters.category}/` : '';
    const params = new URLSearchParams({
      top: 100, 
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    });
    return `${baseUrl}${companyParam}${categoryParam}products?${params.toString()}`;
  };

  const generateProductId = (product) => {
    
    return { ...product };
  };

  const filterProducts = (products) => {
    // Implement filtering logic based on current filters (category, company, rating, price, availability)
    return products.filter((product) => {
      // ... (check each product against filter criteria)
    });
  };

  const sortProducts = (products) => {
    switch (sortBy) {
      case 'price':
        return products.sort((a, b) => a.price - b.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'discount':
       
        return products;
      default:
        return products;
    }
  };

  const filteredAndSortedProducts = filterProducts(sortProducts(products));



  return filteredAndSortedProducts;
};

export default AllProducts;
