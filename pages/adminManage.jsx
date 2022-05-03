import { useState } from "react"; // Using to handle forms?
import React from "react";
import styles from "../styles/AdminManage.module.scss";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditUser from "../components/EditUser";
import AddUser from "../components/AddUser";
import { prisma } from "../lib/prisma";
import axios from "axios";
import { useRouter } from "next/router";
import ManageHeader from "../components/ManageHeader";
// https://www.tutorialrepublic.com/codelab.php?topic=bootstrap&file=crud-data-table-for-database-with-modal-form

export default function AdminPanel({ userData }) {
  const [inputs, setInputs] = useState({});
  //const [isOpen, setIsOpen] = React.useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [addisOpen, addsetIsOpen] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", id: "", userRole: "" });
  const [debugContent, setDebugContent] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();

  const handleSubmit = (data) => {
    update(formData);
  };


  async function deleteUser(data) {
    const dataP = { email: data };
    await axios.post("/api/deleteUser", dataP);
    router.replace(router.asPath);
    // console.log(data);
  }


  return (
    <div
      className="container-fluid min-h-screen w-screen"
      style={{ backgroundColor: "#DDBEA9" }}
    >
      <div className="" style={{ backgroundColor: "#B98B73" }}>
        <ManageHeader />
      </div>
      <div className="container-xl">
        <div className="table_responsive" style={{ marginTop: "5%" }}>
          <div className={styles.table_wrapper}>
            <div className={styles.table_title}>
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    <b>Manage Users</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <a
                    className="btn btn-success"
                    data-toggle="modal"
                    style={{ ...{ float: "right" }, ...{ marginLeft: "5%" } }}
                    onClick={() => addsetIsOpen(!addisOpen)}
                  >
                    <AddUser
                      addisOpen={addisOpen}
                      addsetIsOpen={addsetIsOpen}
                    />
                    <i className="material-icons">&#xE147;</i>{" "}
                    <span>Add New Account</span>
                  </a>
                </div>
              </div>
            </div>
            <table className="table table_striped table_hover">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Type</th>
                  <th>Username</th>
                  <th>Email</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <>
                    <tr>
                      <td>{user.id}</td>
                      <td>
                        {user.userRole === "user" ? "Customer" : "Vendor"}
                      </td>
                      <td>{user.username}</td>

                      <td>{user.email}</td>

                      <td>
                        <a
                          className="edit"
                          data-toggle="modal"
                          style={{ float: "left" }}
                          //onClick={() => setIsOpen(!isOpen)}
                          onClick={() => {
                            setFormData({
                              username: user.username,
                              email: user.email,
                              id: user.id,
                              userRole: user.userRole,
                            });

                            setDebugContent({
                              username: user.username,
                              email: user.email,
                              id: user.id,
                              userRole: user.userRole,
                            });

                            setIsEdit(true);

                          }}
                        >
                          <FaEdit />
                          {/*
                          <EditUser isOpen={isOpen} setIsOpen={setIsOpen} />
                          <i data-toggle="tooltip" title="Edit"></i>
                        */}
                        </a>
                        <a
                          className="delete"
                          data-toggle="modal"
                          style={{ float: "right" }}
                        >
                          <i data-toggle="tooltip" title="Delete">
                            <FaTrash onClick={() => deleteUser(user.email)} />
                          </i>
                        </a>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <div className="mb-4" >
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(formData);
                  setIsEdit(false);
                }}
              >
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Content
                </label>
                <input
                  type="input"
                  placeholder="Name"
                  value={formData.username}

                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }

                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full overflow-x-hidden"
                />

                <input
                  type="input"
                  placeholder="Email"
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}

                  value={formData.email}
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full overflow-x-hidden"
                />

                <input
                  type="input"
                  placeholder="Type"
                  onChange={(e) => {
                    setFormData({ ...formData, userRole: e.target.value });
                  }}

                  value={formData.userRole}
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full overflow-x-hidden"
                />

                <input
                  className={"py-2 px-4 bg-yellow-400 text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300"}
                  type="submit" // Updates
                  disabled={isDisabled}
                />
                {/* <p className="w-full overflow-x-hidden">
                Debug: <pre>{JSON.stringify(debugContent)}</pre>
                <Link href="/">Home</Link>
              </p>*/}

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const userData = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      userRole: true,
    },
  });
  console.log(userData);
  return {
    props: {
      userData,
    },
  };
}
