export async function getApi() {
  return await fetch("http://localhost:8000/product").then((response) =>
    response.json()
  );
}

export function setApi(item) {
  return fetch("http://localhost:8000/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item }),
  }).then((data) => data.json());
}

export function putApi(item) {
  return fetch("http://localhost:8000/product/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item }),
  })
    .then((data) => data.json())
    .then((data) => this.setState({ postId: data.id }));
}

export function deleteApi(item) {
  return fetch("http://localhost:8000/product/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item }),
  })
    .then((data) => data.json())
    .then((data) => this.setState({ postId: data.id }));
}
