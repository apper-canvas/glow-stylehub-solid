import productsData from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    await delay(300);
    return [...productsData];
  },

  async getById(id) {
    await delay(200);
    const product = productsData.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  async getByCategory(category) {
    await delay(350);
    return productsData.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    ).map(p => ({ ...p }));
  },

  async searchProducts(query) {
    await delay(250);
    const lowercaseQuery = query.toLowerCase();
    return productsData.filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.brand.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery)
    ).map(p => ({ ...p }));
  },

  async filterProducts(filters) {
    await delay(300);
    let filtered = [...productsData];

    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(p => filters.category.includes(p.category));
    }

    if (filters.brand && filters.brand.length > 0) {
      filtered = filtered.filter(p => filters.brand.includes(p.brand));
    }

    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.discountPrice >= filters.priceRange.min && 
        p.discountPrice <= filters.priceRange.max
      );
    }

    if (filters.rating) {
      filtered = filtered.filter(p => p.rating >= filters.rating);
}

    return filtered.map(p => ({ ...p }));
  },

  async getSimilarProducts(id) {
    await delay(250);
    const currentProduct = productsData.find(p => p.Id === parseInt(id));
    if (!currentProduct) {
      return [];
    }

    // Find products in the same category, excluding current product
    let similar = productsData.filter(p => 
      p.Id !== parseInt(id) && 
      p.category === currentProduct.category
    );

    // If we have fewer than 4 products in same category, add products from same brand
    if (similar.length < 4) {
      const brandProducts = productsData.filter(p => 
        p.Id !== parseInt(id) && 
        p.brand === currentProduct.brand &&
        !similar.find(sp => sp.Id === p.Id)
      );
      similar = [...similar, ...brandProducts];
    }

    // Sort by rating and limit to 4 products
    similar = similar
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    return similar.map(p => ({ ...p }));
  }
};