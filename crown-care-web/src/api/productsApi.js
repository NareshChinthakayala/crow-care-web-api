import { mockDb, mockError, mockResponse, nextNumber } from "./mockDb";

export const productsApi = {
  /** GET /products */
  list: () => mockResponse(mockDb.data.products),

  /** POST /products */
  create(input) {
    const { products } = mockDb.data;
    const product = { id: nextNumber(products, (p) => p.id), ...input };
    products.push(product);
    return mockResponse(product);
  },

  /** PUT /products/:id */
  update(id, input) {
    const product = mockDb.data.products.find((p) => p.id === id);
    if (!product) return mockError("Product not found");
    Object.assign(product, input);
    return mockResponse(product);
  },
};
