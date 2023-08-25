// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

export const woocommerceBaseUrl = "https://mollie.no/wp-json/wc/v3/products";
const consumerKey = "ck_4610f0d6eeb34112a6c99680b0dc29e1bfbf0068";
const consumerSecret = "cs_7f1291d689278bcb23359a9a9662dbac95a4a1a4";

export async function fetchProducts() {
  try {
    const response = await fetch(woocommerceBaseUrl, {
      headers: {
        Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching products: ${response.status} ${response.statusText}`
      );
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error("An error occurred while fetching products:", error);
    return [];
  }
}

export async function fetchSingleProd(id) {
  try {
    const response = await fetch(
      `${woocommerceBaseUrl}/wp-json/wc/store/products/${id}`
    );
    const product = await response.json();
    return product;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
}
