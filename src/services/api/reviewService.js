const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const reviewService = {
  async getByProductId(productId) {
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
          { field: { Name: "product_id" } },
          { field: { Name: "user_name" } },
          { field: { Name: "user_avatar" } },
          { field: { Name: "rating" } },
          { field: { Name: "comment" } },
          { field: { Name: "date" } },
          { field: { Name: "helpful_votes" } }
        ],
        where: [
          {
            FieldName: "product_id",
            Operator: "EqualTo",
            Values: [parseInt(productId)]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("review", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return (response.data || []).map(r => ({
        ...r,
        productId: r.product_id,
        userName: r.user_name,
        userAvatar: r.user_avatar,
        helpfulVotes: r.helpful_votes
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching reviews by product ID:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching reviews by product ID:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async create(review) {
    try {
      await delay(200);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [
          {
            Name: review.userName + " - Review",
            product_id: review.productId,
            user_name: review.userName,
            user_avatar: review.userAvatar,
            rating: review.rating,
            comment: review.comment,
            date: new Date().toISOString(),
            helpful_votes: 0
          }
        ]
      };
      
      const response = await apperClient.createRecord("review", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} reviews:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating review:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating review:", error.message);
        throw new Error(error.message);
      }
    }
  },

  async toggleHelpful(id) {
    try {
      await delay(200);
      
      // First get the current review to increment helpful votes
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const getParams = {
        fields: [
          { field: { Name: "helpful_votes" } }
        ]
      };
      
      const currentResponse = await apperClient.getRecordById("review", parseInt(id), getParams);
      
      if (!currentResponse.success || !currentResponse.data) {
        throw new Error("Review not found");
      }
      
      const currentVotes = currentResponse.data.helpful_votes || 0;
      
      const params = {
        records: [
          {
            Id: parseInt(id),
            helpful_votes: currentVotes + 1
          }
        ]
      };
      
      const response = await apperClient.updateRecord("review", params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} reviews:${failedUpdates}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error toggling helpful vote:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error toggling helpful vote:", error.message);
        throw new Error(error.message);
      }
    }
  }
};