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
    let searchCategory = '';

    if (value && typeof value === 'string') {
      searchCategory = value.split(' -> ').pop().toLowerCase();
    }

    const filteredOptions = allCategories.filter(option =>
      option.toLowerCase().includes(searchCategory)
    );

    onSearch(filteredOptions);
  };

  return (
    <Box mt={2} ml={2}>
      <Autocomplete
        freeSolo
        options={allCategories}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Categories"
            variant="outlined"
            size="small"
            style={{ width: 300 }}
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
