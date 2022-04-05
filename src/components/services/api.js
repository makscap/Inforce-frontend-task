export async function getApi() {
  return await fetch(
    "https://product-shop-json-server.herokuapp.com/product"
  ).then((response) => response.json());
}
