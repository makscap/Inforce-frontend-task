import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ButtonBar = ({
  handleCloseAddProduct,
  handleShowAddProduct,
  productShow,
  setItemInput,
  itemInput,
  postProduct,
  imgUrl,
  setName,
  setImgUrl,
  setCount,
  setSize,
  setWeight,
  setComments,
}) => {
  // function putApi(item) {
  //   const data = {
  //     imgUrl: imgurl.current.value,
  //     name: name.current.value,
  //     count: count.current.value,
  //     size: size.current.value,
  //     weight: weight.current.value,
  //   };

  //   return fetch(`http://localhost:8000/product/1`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   }).then((data) => data.json());
  // }

  // const handleSubmitPut = (e) => {
  //   e.preventDefault();
  //   putApi(id, name, imgUrl);
  //   handleCloseAddProduct();
  // };

  return (
    <div>
      <Button
        onClick={handleShowAddProduct}
        variant="outline-success"
        style={{ margin: "20px", width: "100px" }}
      >
        Add
      </Button>
      <Modal show={productShow} onHide={handleCloseAddProduct}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ display: "flex", justifyContent: "center" }}>
              ADD new product in the collection
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              marginRight: "60px",
            }}
            value={itemInput}
            onSubmit={postProduct}
          >
            <label style={{ margin: "10px 0px" }}>
              imgUrl:
              <input
                id="imgUrl"
                onChange={(e) => setImgUrl(e.target.value)}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>

            <label style={{ margin: "10px 0px" }}>
              name:
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>

            <label style={{ margin: "10px 0px" }}>
              count:
              <input
                id="count"
                onChange={(e) => setCount(e.target.value)}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>

            <label id="size" style={{ margin: "10px 0px" }}>
              size:
              <input
                onChange={(e) => setSize(e.target.value)}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>
            <label id="weight" style={{ margin: "10px 0px" }}>
              weight:
              <input
                id="weight"
                onChange={(e) => setWeight(e.target.value)}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>
            <label id="comments" style={{ margin: "10px 0px" }}>
              comments:
              <input
                id="comments"
                onChange={(e) => setComments(e.target.value)}
                style={{ marginLeft: "10px", width: "250px" }}
              ></input>
            </label>
            <button style={{ display: "flex", justifyContent: "center" }}>
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" type="submit" onClick={handleCloseAddProduct}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ButtonBar;
