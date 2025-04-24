
import React from 'react';
import { Link } from 'react-router-dom';
import categories from '@/data/categories';

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={category.id === 'all' ? '/' : `/category/${category.id}`}
          className="flex flex-col items-center p-4 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-saffron-100 transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-saffron-50 flex items-center justify-center mb-3">
            {React.createElement(category.icon, {
              size: 20,
              className: 'text-saffron-500',
            })}
          </div>
          <span className="text-gray-800 font-medium text-center">{category.name}</span>
          <span className="text-gray-500 text-xs font-nepali text-center">{category.name_np}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
