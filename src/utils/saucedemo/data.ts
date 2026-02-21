export const Products = {
  SAUCE_LABS_BACKPACK: "add-to-cart-sauce-labs-backpack",
  SAUCE_LABS_BIKE_LIGHT: "add-to-cart-sauce-labs-bike-light",
} as const;

export type Product = (typeof Products)[keyof typeof Products];
