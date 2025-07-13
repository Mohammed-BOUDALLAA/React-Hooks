import { useState, useEffect } from 'react';


const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // nombre d'éléments par page

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.daaif.net/products?delay=1000&page=${page}&limit=${limit}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / limit)); // si l'API donne total
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]); // dépend de page

  const reload = () => {
    fetchProducts();
  };

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    products,
    loading,
    error,
    reload,
    page,
    totalPages,
    nextPage,
    prevPage,
    setPage,
  };
};

export default useProductSearch;
