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
        position: 'fixed',
        top: 20,
        right: 0,
        width: '300px',
        zIndex: 1000,
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <List component="nav">
        {categories.map((category) => (
          <div key={category.name}>
            <ListItem
              button
              onMouseEnter={() => handleToggle(category.name)}
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
