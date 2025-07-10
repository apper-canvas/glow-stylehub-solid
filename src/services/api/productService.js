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
  }
};