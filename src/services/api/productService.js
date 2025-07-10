const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    try {
      await delay(300);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "discount_price" } },
          { field: { Name: "images" } },
          { field: { Name: "sizes" } },
          { field: { Name: "colors" } },
          { field: { Name: "category" } },
          { field: { Name: "rating" } },
          { field: { Name: "review_count" } },
          { field: { Name: "in_stock" } },
          { field: { Name: "description" } }
        ]
      };
      
      const response = await apperClient.fetchRecords("product", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching products:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching products:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async getById(id) {
    try {
      await delay(200);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "discount_price" } },
          { field: { Name: "images" } },
          { field: { Name: "sizes" } },
          { field: { Name: "colors" } },
          { field: { Name: "category" } },
          { field: { Name: "rating" } },
          { field: { Name: "review_count" } },
          { field: { Name: "in_stock" } },
          { field: { Name: "description" } }
        ]
      };
      
      const response = await apperClient.getRecordById("product", parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (!response.data) {
        throw new Error("Product not found");
      }
      
      // Transform field names to match UI expectations
      const product = response.data;
      return {
        ...product,
        name: product.Name,
        discountPrice: product.discount_price,
        reviewCount: product.review_count,
        inStock: product.in_stock,
        images: typeof product.images === 'string' ? product.images.split(',') : product.images,
        sizes: typeof product.sizes === 'string' ? product.sizes.split(',') : product.sizes,
        colors: typeof product.colors === 'string' ? product.colors.split(',') : product.colors
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching product with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching product with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  },

  async getByCategory(category) {
    try {
      await delay(350);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "discount_price" } },
          { field: { Name: "images" } },
          { field: { Name: "category" } },
          { field: { Name: "rating" } },
          { field: { Name: "review_count" } }
        ],
        where: [
          {
            FieldName: "category",
            Operator: "EqualTo",
            Values: [category]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("product", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return (response.data || []).map(p => ({
        ...p,
        name: p.Name,
        discountPrice: p.discount_price,
        reviewCount: p.review_count
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching products by category:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching products by category:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async searchProducts(query) {
    try {
      await delay(250);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "discount_price" } },
          { field: { Name: "images" } },
          { field: { Name: "category" } },
          { field: { Name: "rating" } },
          { field: { Name: "review_count" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "Name",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "brand",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "category",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              }
            ]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("product", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return (response.data || []).map(p => ({
        ...p,
        name: p.Name,
        discountPrice: p.discount_price,
        reviewCount: p.review_count
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching products:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error searching products:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async getSimilarProducts(id) {
    try {
      await delay(250);
      
      // First get the current product to find similar ones
      const currentProduct = await this.getById(id);
      if (!currentProduct) {
        return [];
      }
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "discount_price" } },
          { field: { Name: "images" } },
          { field: { Name: "category" } },
          { field: { Name: "rating" } },
          { field: { Name: "review_count" } }
        ],
        whereGroups: [
          {
            operator: "AND",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "category",
                    operator: "EqualTo",
                    values: [currentProduct.category]
                  }
                ]
              }
            ]
          }
        ],
        orderBy: [
          {
            fieldName: "rating",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 5,
          offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords("product", params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      // Filter out current product and limit to 4
      return (response.data || [])
        .filter(p => p.Id !== parseInt(id))
        .slice(0, 4)
        .map(p => ({
          ...p,
          name: p.Name,
          discountPrice: p.discount_price,
          reviewCount: p.review_count
        }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching similar products:", error?.response?.data?.message);
      } else {
        console.error("Error fetching similar products:", error.message);
      }
      return [];
    }
  }
};