import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, ListItemIcon, Box } from '@mui/material';
import { ExpandLess, ExpandMore, Category } from '@mui/icons-material';

const ExpandableList = ({ categories }) => {
  const [open, setOpen] = useState({});

  const handleToggle = (category) => {
    setOpen((prevOpen) => ({ ...prevOpen, [category]: !prevOpen[category] }));
  };

  const handleCloseAll = () => {
    setOpen({});
  };

  const renderSubcategories = (subcategories, level = 0) => {
    return subcategories.map((subcategory) => (
      <div key={subcategory.name}>
        <ListItem
          button
          onMouseEnter={() => handleToggle(subcategory.name)}
          sx={{ pl: 4 * (level + 1) }}
        >
          <ListItemText primary={subcategory.name} />
          {subcategory.subcategories ? (open[subcategory.name] ? <ExpandLess /> : <ExpandMore />) : null}
        </ListItem>
        {subcategory.subcategories && (
          <Collapse in={open[subcategory.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderSubcategories(subcategory.subcategories, level + 1)}
            </List>
          </Collapse>
        )}
      </div>
    ));
  };

  return (
    <Box
      onMouseLeave={handleCloseAll} // Close all categories on mouse leave
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '20px', // Adjust the space between items
        position: 'fixed',
        top: 70,
        left: 20, // Adjust left positioning
        maxWidth: 'calc(100vw - 40px)', // Adjust the maximum width as needed
        zIndex: 1000,
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        overflowX: 'auto', // Enable horizontal scrolling if needed
      }}
    >
      <List component="nav" sx={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap', padding: 0 }}>
        {categories.map((category) => (
          <div key={category.name}>
            <ListItem
              button
              onMouseEnter={() => handleToggle(category.name)}
              sx={{ minWidth: '150px' }} // Adjust min width for each item
            >
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary={category.name} />
              {category.subcategories ? (open[category.name] ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItem>
            {category.subcategories && (
              <Collapse in={open[category.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {renderSubcategories(category.subcategories)}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Box>
  );
};

export default ExpandableList;
