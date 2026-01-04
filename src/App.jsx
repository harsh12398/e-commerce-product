import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import FilterBar from './components/FilterBar';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';
import { useProducts } from './hooks/useProducts';
import { useDebounce } from './hooks/useDebounce';
import './App.css'; // Optional additional app-wide styles

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products, categories, loading, error } = useProducts();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  // Filtering and Sorting Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (category) {
      result = result.filter(p => p.category === category);
    }

    // Filter by Search (Case insensitive)
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort
    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, debouncedSearch, sort]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSort('');
  };

  return (
    <CartProvider>
      <div className="app-container">
        <Header onOpenCart={() => setIsCartOpen(true)} />

        <main className="main-content">
          <div className="container">
            <h1>Our Products</h1>

            {loading ? (
              <div className="loading">Loading products...</div>
            ) : error ? (
              <div className="error">Error: {error}</div>
            ) : (
              <>
                <FilterBar
                  search={search}
                  setSearch={setSearch}
                  category={category}
                  setCategory={setCategory}
                  sort={sort}
                  setSort={setSort}
                  categories={categories}
                  onClear={clearFilters}
                />
                <ProductList products={filteredProducts} />
              </>
            )}
          </div>
        </main>

        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}

export default App;
