import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import ExpandableList from './components/ExpandableList';
import SearchBar from './components/SearchBar';
import categoriesData from './data/categories.json';

const App = () => {
  const [filteredCategories, setFilteredCategories] = useState(categoriesData);

  const findCategoryByPath = (pathArray, categories) => {
    let currentCategories = categories;
    for (let i = 0; i < pathArray.length; i++) {
      const categoryName = pathArray[i];
      const foundCategory = currentCategories.find(category => category.name === categoryName);
      if (foundCategory) {
        currentCategories = foundCategory.subcategories || [];
      } else {
        return null; // Return null if any part of the path is not found
      }
    }
    return currentCategories;
  };

  const handleSearch = (searchPath) => {
    if (typeof searchPath === 'string') {
      const pathArray = searchPath.split(' -> ');
      const categoriesArray = findCategoryByPath(pathArray, categoriesData);
      if (categoriesArray) {
        setFilteredCategories(categoriesArray);
      } else {
        setFilteredCategories(categoriesData); // Reset if path not found
      }
    } else {
      setFilteredCategories(categoriesData);
    }
  };

  return (
    <Container>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <SearchBar categories={categoriesData} onSearch={handleSearch} />
        </Grid>
        <Grid item xs={12}>
          <ExpandableList categories={filteredCategories} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
