import Button from "react-bootstrap/Button";

const ButtonEdit = (handleShowAddProduct) => {
  return (
    <div>
      <Button
        variant="outline-warning"
        style={{ margin: "20px", width: "100px" }}
        onClick={handleShowAddProduct}
      >
        Edit
      </Button>
      {/* <Modal show={productShow} onHide={handleCloseAddProduct}>
        <Modal.Header closeButton>
          <Modal.Title>ADD new product in the collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onChange={(event) => setItemInput(event.target.value)}
            value={itemInput}
            // onSubmit={handleSubmitPut}
          >
            <label id="imgurl" style={{ margin: "10px" }}>
              ImgUrl:
              <input
                ref={imgurl}
                onChange={(e) => setImgUrl(e.target.value)}
              ></input>
            </label>

            <label style={{ margin: "10px" }}>
              name:
              <input
                ref={name}
                id="id"
                onChange={(e) => setId(e.target.value)}
              ></input>
            </label>

            <label style={{ margin: "10px" }}>
              count:
              <input
                ref={count}
                id="count"
                onChange={(e) => setId(e.target.value)}
              ></input>
            </label>

            <label id="size" style={{ margin: "10px" }}>
              size:
              <input
                ref={size}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </label>
            <label id="weight" style={{ margin: "10px" }}>
              weight:
              <input
                ref={weight}
                id="name"
                onChange={(e) => setNewProduct(e.target.value)}
              ></input>
            </label>
            <button type="submit">Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddProduct}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default ButtonEdit;
