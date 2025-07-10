import reviewsData from "@/services/mockData/reviews.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let data = [...reviewsData];
let nextId = Math.max(...data.map(r => r.Id)) + 1;

export const reviewService = {
  async getByProductId(productId) {
    await delay(300);
    return data
      .filter(r => r.productId === parseInt(productId))
      .map(r => ({ ...r }));
  },

  async getAll() {
    await delay(300);
    return [...data];
  },

  async create(review) {
    await delay(200);
    const newReview = {
      ...review,
      Id: nextId++,
      date: new Date().toISOString(),
      helpfulVotes: 0
    };
    data.push(newReview);
    return { ...newReview };
  },

  async update(id, reviewData) {
    await delay(200);
    const index = data.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Review not found");
    }
    data[index] = { ...data[index], ...reviewData };
    return { ...data[index] };
  },

  async delete(id) {
    await delay(200);
    const index = data.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Review not found");
    }
    const deleted = data.splice(index, 1)[0];
    return { ...deleted };
  },

  async toggleHelpful(id) {
    await delay(200);
    const index = data.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Review not found");
    }
    data[index].helpfulVotes += 1;
    return { ...data[index] };
  }
};