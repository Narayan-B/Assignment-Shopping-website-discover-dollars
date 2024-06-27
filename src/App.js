import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import ExpandableList from './components/ExpandableList';
import SearchBar from './components/SearchBar';
import categoriesData from './data/categories.json';

const App = () => {
  const [filteredCategories, setFilteredCategories] = useState(categoriesData);

  const filterCategories = (searchTerm, categories) => {
    return categories.filter(category => {
      if (category.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      if (category.subcategories) {
        category.subcategories = filterCategories(searchTerm, category.subcategories);
        return category.subcategories.length > 0;
      }
      return false;
    });
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const newCategories = filterCategories(searchTerm, JSON.parse(JSON.stringify(categoriesData)));
      setFilteredCategories(newCategories);
    } else {
      setFilteredCategories(categoriesData);
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
