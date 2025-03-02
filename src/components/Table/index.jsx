import React, { useEffect, useState } from "react";
import Title from "../Title";
import Table from "react-bootstrap/Table";
import { deletePosts, getPosts } from "../../services/api";
import Button from "react-bootstrap/esm/Button";
import DeleteModal from "../DeleteModal";
import MainForm from "../Form";
import EditModal from "../EditModal";
function MainTable() {
  const [formInfo, setFormInfo] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const fetchPosts = async () => {
    let data = await getPosts();
    setFormInfo(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [editShow]);

  const deletePost = async (id) => {
    await deletePosts(id);
    fetchPosts();
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    setDeleteItem(null);
  };

  const handleShow = (userId) => {
    setDeleteItem(userId);
    setShow(true);
  };

  const editModal = (user) => {
    setEditItem(user);
    setEditShow(true);
    fetchPosts();
  };

  const closeEdit = () => {
    setEditShow(false);
    setEditItem(null);
  };
  console.log("formInfo", formInfo);
  return (
    <div>
      <MainForm refreshData={fetchPosts} />
      <Title title="User List" />

      <br />
      <Table striped bordered hover border={1} className="w-75 mx-auto table-sm">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {formInfo.length == 0 && (
            <tr>
              <td
                colSpan={6}
                style={{ backgroundColor: "white", padding: "12px 24px" }}
              >
                There is no information to show
              </td>
            </tr>
          )}
          {formInfo.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el.firstName}</td>
                <td>{el.email}</td>
                <td>{el.age}</td>
                <td>{el.position}</td>

                <td>
                  <Button
                    variant="warning"
                    onClick={() => {
                      editModal(el);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleShow(el)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {show && (
        <DeleteModal
          handleClose={handleClose}
          deletePost={deletePost}
          show={show}
          deleteItem={deleteItem}
        />
      )}

      {editShow && (
        <EditModal
          editItem={editItem}
          editShow={editShow}
          editClose={closeEdit}
          setEditShow={setEditShow}
          fetchPosts={fetchPosts}
        />
      )}
    </div>
  );
}

export default MainTable;
