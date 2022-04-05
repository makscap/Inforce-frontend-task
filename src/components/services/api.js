export async function getApi() {
  return await fetch("https://product-shop-api.herokuapp.com/product").then(
    (response) => response.json()
  );
}
