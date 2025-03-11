/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import { ProductList } from './components/ProductList';

// import { UserFilter } from './components/UserFilter';

function getUserById(userId) {
  return usersFromServer.find(user => user.id === userId);
}

function getCategoryById(categoryId) {
  return categoriesFromServer.find(category => category.id === categoryId);
}

function getFilteredProduts(
  products,
  { selectUser, inputQuery, categoriesFilter },
) {
  let copyProducts = [...products];

  if (selectUser !== 'All') {
    copyProducts = copyProducts.filter(
      product => product.user.id === selectUser.id,
    );
  }

  if (inputQuery !== '') {
    copyProducts = copyProducts.filter(
      product => product.name.toLowerCase().includes(inputQuery.toLowerCase()),
      // eslint-disable-next-line function-paren-newline
    );
  }

  if (categoriesFilter.length !== 0) {
    copyProducts = copyProducts.filter(product =>
      // eslint-disable-next-line prettier/prettier
      categoriesFilter.includes(product.category.id));
  }

  return copyProducts;
}

const products = productsFromServer.map(product => {
  const category = getCategoryById(product.categoryId); // find by product.categoryId
  const user = getUserById(category.ownerId); // find by category.ownerId

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [selectUser, setSelectUser] = useState('All');
  const [inputQuery, setInputQuery] = useState('');
  const [categoriesFilter, setCategiesFilter] = useState([]);

  const validProducts = getFilteredProduts(products, {
    selectUser,
    inputQuery,
    categoriesFilter,
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>
            {/* Filter User */}
            <p className="panel-tabs has-text-weight-bold">
              <a
                onClick={() => setSelectUser('All')}
                className={classNames({
                  'is-active': selectUser === 'All',
                })}
                data-cy="FilterAllUsers"
                href="#/"
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => setSelectUser(user)}
                  className={classNames({
                    'is-active': user.id === selectUser.id,
                  })}
                >
                  {user.name}
                </a>
              ))}
            </p>
            {/* input */}
            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={event => setInputQuery(event.currentTarget.value)}
                  value={inputQuery}
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {inputQuery !== '' && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      onClick={() => setInputQuery('')}
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                    />
                  </span>
                )}
              </p>
            </div>
            {/* Filter for category */}
            <div className="panel-block is-flex-wrap-wrap">
              <a
                onClick={() => setCategiesFilter([])}
                className={classNames('button is-success mr-6', {
                  'is-outlined': categoriesFilter.length !== 0,
                })}
                href="#/"
                data-cy="AllCategories"
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  onClick={() => {
                    if (categoriesFilter.includes(category.id)) {
                      return setCategiesFilter(
                        // eslint-disable-next-line no-undef
                        filters.filter(f => f !== category.id),
                      );
                    }

                    return setCategiesFilter(filters => [
                      ...filters,
                      category.id,
                    ]);
                  }}
                  data-cy="Category"
                  className={classNames('button mr-2 my-1', {
                    'is-info': categoriesFilter.includes(category.id),
                  })}
                  href="#/"
                >
                  {category.title}
                </a>
              ))}
            </div>
            {/* RESET BUTTON */}
            <div className="panel-block">
              <a
                onClick={() => {
                  setSelectUser('All');
                  setInputQuery('');
                  setCategiesFilter([]);
                }}
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {validProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <ProductList products={validProducts} />
          )}
        </div>
      </div>
    </div>
  );
};
