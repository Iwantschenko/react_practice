// import { useState } from 'react';
import { ProductItem } from './ProductItem';

// const SORT_PRODUCTS = 'prod';
// const SORT_CATEGORY = 'categoty';
// const SORT_USERNAME = 'user';
// const SORT_ID = 'Id';

// let countSort = 0;

// function getSortedProducts(products, { sortOption, sortOrder }) {
//   // const copySort = [...products];

//   // if (typeof sortOption === 'number') {
//   //   return copySort.sort((it1, it2) => );
//   // }

//   return
// }

export const ProductList = ({ products }) => {
  // const [sortOption, setSortOption] = useState('');
  // const validProducts = getSortedProducts(products, { sortOption, sortOrder });
  const validProducts = products;

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              ID
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Product
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-down" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Category
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              User
              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {validProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};
