export async function getApi() {
  return await fetch("http://localhost:8000/product").then((response) =>
    response.json()
  );
}
