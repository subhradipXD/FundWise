import LoggedInMenu from "../../inc/LoggedInMenu";
import addPost from "../../assets/feed/addPost.png";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { MdHandshake } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import axios from "axios";

function Feed() {
  const baseURL = "http://localhost:2000";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      // formData.append("user_id", profileUser._id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", postImage);

      if (postImage !== null) {
        formData.append("image", postImage);
      }
      console.log(title);
      console.log(description);
      console.log(postImage);

      const res = await axios.post(`${baseURL}/post/feed`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.error === false) {
        // If error is false, show the success message
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000, // Close after 2 seconds
        });
      }

      getPosts(); // Refresh posts
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
      // Handle error
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get(`${baseURL}/post/`);
      console.log(res.data);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <LoggedInMenu />
      <div className="mt-0 pt-0">
        <div className="container">
          <div className="row mx-0 mt-2">
            <div className="card shadow p-2 mb-3 bg-body-tertiary rounded">
              <div className="card-body">
                <div className="container">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    What's in your mind?
                  </label>
                  <input
                    type="button"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="What's in your mind?"
                    data-toggle="modal"
                    data-bs-target="#myModal3"
                    data-bs-toggle="modal"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-0">
            <div className="col-md-4 my-2">
              <form>
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Separated link
                      </a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
            <div className="col-md-4 my-2"></div>
            <div className="col-md-4 my-2">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search By #Tags . . ."
                  aria-label="Search"
                />
                <button className="btn btn-outline-primary" type="submit">
                  <IoSearchOutline style={{ fontSize: "20px" }} />
                </button>
              </form>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-1"></div>
            <div className="col-md-8">
              <ul className="list-unstyled">
                {posts.map((post) => (
                  <li
                    key={post._id}
                    className="mb-1 shadow p-3 bg-body-tertiary rounded"
                  >
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text text-muted">{post.description}</p>
                      <img src="" />
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-outline-danger"
                          style={{ fontSize: "15px" }}
                        >
                          <CiHeart style={{ fontSize: "20px" }} /> like
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          style={{ fontSize: "15px" }}
                        >
                          <FaRegCommentDots style={{ fontSize: "20px" }} />{" "}
                          Comment
                        </button>
                        <button
                          className="btn btn-outline-success"
                          style={{ fontSize: "15px" }}
                        >
                          <MdHandshake style={{ fontSize: "20px" }} />{" "}
                          Interested
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>

      <div className="modal modal-xl" tabIndex="-1" id="myModal3">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add your post...</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ backgroundColor: "#F2f7FD" }}>
              <div className="row">
                <div className="col-md-6">
                  <img src={addPost} alt="img" width={550} />
                </div>
                <div className="col-md-6">
                  <form
                    className="shadow p-2 mb-3 bg-body-tertiary rounded"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                  >
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Write here...
                      </label>
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Write here..."
                        value={title}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                      >
                        Add Description
                      </label>
                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows={3}
                        value={description}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="formFileMultiple" className="form-label">
                        Choose your image
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFileMultiple"
                        // multiple
                        accept=".jpeg, .jpg, .png, .webp"
                        onChange={(e) => {
                          // setImagePreview(URL.createObjectURL(e.target.files[0]));
                          setPostImage(e.target.files[0]);
                        }}
                      />

                      {/* <input
          type="file"
          id="postImagePicker"
          className="hidden"
          accept=".jpeg, .jpg, .png, .webp"
          onChange={(e) => {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            setPostImage(e.target.files[0]);
          }}
        /> */}
                    </div>
                    <div className="mb-3">
                      <button className="btn btn-sm btn-primary" type="submit">
                        Add post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;
