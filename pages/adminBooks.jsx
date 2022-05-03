import { useState } from "react"; // Using to handle forms?
import React from "react";
import styles from "../styles/AdminManage.module.scss";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import EditBook from "../components/EditBook";
import AddBook from "../components/AddBook";
import { prisma } from "../lib/prisma";
import axios from "axios";
import { useRouter } from "next/router";
import ManageHeader from "../components/ManageHeader";

// https://www.tutorialrepublic.com/codelab.php?topic=bootstrap&file=crud-data-table-for-database-with-modal-form

export default function AdminPanel({ booksData }) {
  const [inputs, setInputs] = useState({});
  //const [isOpen, setIsOpen] = React.useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [addisOpen, addsetIsOpen] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({ title: "", isbn: "", author: "", vendor: "", price: "", genre: "", description: "", });
  const [debugContent, setDebugContent] = useState();
  const [isEdit, setIsEdit] = useState(false);
  
  const router = useRouter();

  async function deleteBook(data) {
    const dataP = { id: data };

    await axios.post("/api/deleteBook", dataP);
    router.replace(router.asPath);
  }

  const card = {
    backgroundColor: "white",
    padding: "3rem 3rem 5rem 3rem",
    boxShadow: "0px 2px 5px #B98B73",
    borderRadius: ".25rem",
    marginBottom: "1rem",
    marginTop: "2rem",
  };

  return (
    <div
      className="container-fluid min-h-screen w-screen"
      style={{ backgroundColor: "#DDBEA9" }}
    >
      <div className="" style={{ backgroundColor: "#B98B73" }}>
        <ManageHeader />
      </div>
      <div className="container-lg">
        <div className="table_responsive" style={{ marginTop: "5%" }}>
          <div className={styles.table_wrapper}>
            <div className={styles.table_title}>
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    <b>Manage Books</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <a
                    className="btn btn-success"
                    data-toggle="modal"
                    style={{ ...{ float: "right" }, ...{ marginLeft: "5%" } }}
                    onClick={() => addsetIsOpen(!isOpen)}
                  >
                    <AddBook
                      addisOpen={addisOpen}
                      addsetIsOpen={addsetIsOpen}
                    />
                    <i className="material-icons">&#xE147;</i>{" "}
                    <span>Add New Book</span>
                  </a>
                </div>
              </div>
            </div>
            <table className="table table_striped table_hover">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Title</th>
                  <th>Vendor</th>
                  <th>ISBN</th>
                  <th>Price</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {booksData
                  ? booksData.map((book) => (
                    <>
                      <tr>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.vendor}</td>
                        <td>{book.isbn}</td>
                        <td>${book.price}</td>

                        <td>
                          <a
                            className="edit"
                            data-toggle="modal"
                            style={{ float: "left" }}
                            //onClick={() => setIsOpen(!isOpen)}
                            onClick={() => {
                              setFormData({
                                title: book.title,
                                isbn: book.isbn,
                                author: book.author,
                                price: book.price,
                                description: book.description,
                                vendor: book.vendor,
                                genre: book.genre,
                              });
  
                              setDebugContent({
                                title: book.title,
                                isbn: book.isbn,
                                author: book.author,
                                price: book.price,
                                description: book.description,
                                vendor: book.vendor,
                                genre: book.genre,
                              });
  
                              setIsEdit(true);
  
                            }}
                          >
                            <FaEdit />
                            {/*<EditBook isOpen={isOpen} setIsOpen={setIsOpen} />
                            <i data-toggle="tooltip" title="Edit">
                              <FaEdit />
                            </i>
                  */}
                          </a>
                          <a
                            className="delete"
                            data-toggle="modal"
                            style={{ float: "right" }}
                          >
                            <i data-toggle="tooltip" title="Delete">
                              <FaTrash onClick={() => deleteBook(book.id)} />
                            </i>
                          </a>
                        </td>
                      </tr>
                    </>
                  ))
                  : null}
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
                  placeholder="Title"
                  value={formData.title}

                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }

                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full overflow-x-hidden"
                />

                <input
                  type="input"
                  placeholder="Vendor"
                  onChange={(e) => {
                    setFormData({ ...formData, vendor: e.target.value });
                  }}

                  value={formData.vendor}
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full overflow-x-hidden"
                />

                <input
                  type="input"
                  placeholder="Image URL"
                  onChange={(e) => {
                    setFormData({ ...formData, image: e.target.value });
                  }}

                  value={formData.image}
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full overflow-x-hidden"
                />

                <input
                  type="input"
                  placeholder="ISBN"
                  onChange={(e) => {
                    setFormData({ ...formData, isbn: e.target.value });
                  }}

                  value={formData.isbn}
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full overflow-x-hidden"
                />

                <input
                  type="input"
                  placeholder="Author"
                  onChange={(e) => {
                    setFormData({ ...formData, author: e.target.value });
                  }}

                  value={formData.author}
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full overflow-x-hidden"
                />

                <input
                  type="input"
                  placeholder="Genre"
                  onChange={(e) => {
                    setFormData({ ...formData, genre: e.target.value });
                  }}

                  value={formData.genre}
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full overflow-x-hidden"
                />

                <input
                  type="input"
                  placeholder="Price"
                  onChange={(e) => {
                    setFormData({ ...formData, price: e.target.value });
                  }}

                  value={formData.price}
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-full overflow-x-hidden"
                />

                <input
                  type="input"
                  placeholder="Description"
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                  }}

                  value={formData.description}
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
  const booksData = await prisma.book.findMany({
    select: {
      isbn: true,
      title: true,
      price: true,
      author: true,
      description: true,
      id: true,
    },
  });
  console.log(booksData);
  return {
    props: {
      booksData,
    },
  };
}
