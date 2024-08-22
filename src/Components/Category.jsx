import React from "react";
import Widget from "./Widget";
import AddWidget from "./AddWidget";

const Category = ({ category }) => {
  return (
    <div className="category">
      <h2>{category.name}</h2>
      <div className="widgets">
        {category.widgets.map(widget => (
          <Widget key={widget.id} widget={widget} categoryId={category.id} />
        ))}
      </div>
      <AddWidget categoryId={category.id} />
    </div>
  );
};

export default Category;
