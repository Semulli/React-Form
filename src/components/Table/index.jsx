import React, { useEffect, useState } from "react";
import Title from "../Title";
import Table from "react-bootstrap/Table";
import { deletePosts, getPosts } from "../../services/api";
import Button from "react-bootstrap/esm/Button";
import DeleteModal from "../DeleteModal";
import MainForm from "../Form";
import EditModal from "../EditModal";
import { toast } from "react-toastify";
import { useBoolean } from "../Hooks/useBoolean";
import { useCallback } from "react";
import useGetUser from "../Hooks/useGetUser";

function MainTable() {
  // const [formInfo, setFormInfo] = useState([]);
  // const [show, setShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  // const [editShow, setEditShow] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const editModals = useBoolean();
  const deleteModal = useBoolean();

  // const fetchPosts = async () => {
  //   let data = await getPosts();
  //   setFormInfo(data);
  // };
  const { user: formInfo, fetchPosts } = useGetUser();

  useEffect(() => {
    fetchPosts();
  }, [editModals.value]);

  const deletePost = useCallback(async (id) => {
    await deletePosts(id);
    fetchPosts();
    handleClose();
    toast.warning(" deleted !", {
      position: "top-left",
      autoClose: 1000,
    });
  }, []);

  const closeEditModal = () => {
    editModals.setFalse();
    setEditItem(null);
  };
  const handleClose = () => {
    // setShow(false);
    deleteModal.setFalse();
    setDeleteItem(null);
  };

  const handleShow = (userId) => {
    setDeleteItem(userId);
    // setShow(true);
    deleteModal.setTrue();
  };

  const editModal = useCallback((user) => {
    setEditItem(user);
    // setEditShow(true);
    editModals.setTrue();
    fetchPosts();
  }, []);

  const closeEdit = () => {
    // setEditShow(false);
    editModals.setFalse();
    setEditItem(null);
  };
  console.log("formInfo", formInfo);
  return (
    <div>
      <MainForm refreshData={fetchPosts} />
      <Title title="User List" />

      <br />
      <Table
        striped
        bordered
        hover
        border={1}
        className="w-75 mx-auto table-sm"
      >
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

      {deleteModal.value && (
        <DeleteModal
          handleClose={handleClose}
          deletePost={deletePost}
          show={deleteModal.value}
          deleteItem={deleteItem}
        />
      )}

      {editModals.value && (
        <EditModal
          editItem={editItem}
          editShow={editModals.value}
          editClose={closeEdit}
          setEditShow={closeEditModal}
          fetchPosts={fetchPosts}
        />
      )}
    </div>
  );
}

export default MainTable;
