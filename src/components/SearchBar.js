import React from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';

const SearchBar = ({ categories, onSearch }) => {
  const flattenCategories = (categories, parent = '') =>
    categories.flatMap((category) => {
      const fullPath = parent ? `${parent} -> ${category.name}` : category.name;
      return category.subcategories ? flattenCategories(category.subcategories, fullPath) : [fullPath];
    });

  const allCategories = flattenCategories(categories);

  const handleSearch = (event, value) => {
    if (value) {
      const searchCategory = value.split(' -> ').pop();
      onSearch(searchCategory);
    } else {
      onSearch('');
    }
  };

  return (
    <Box mt={2} ml={2}> {/* Adjust margin top (mt) and margin left (ml) as needed */}
      <Autocomplete
        freeSolo
        options={allCategories}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Categories"
            variant="outlined"
            size="small"
            style={{ width: 300 }} // Adjust width as needed
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch(event, params.inputProps.value);
              }
            }}
          />
        )}
        onChange={handleSearch}
      />
    </Box>
  );
};

export default SearchBar;
