import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const urlAPI = "https://jsonplaceholder.typicode.com/";

  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState({
    userId: "",
    title: "",
    body: ""
  });

  const addUser = async (user) => {
    let response = await fetch(urlAPI + "posts", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json"
      }
    });

    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      alert("ocurrio un error");
    }
  };

  const sendInfo = async () => {
    let user = {
      userId: newUser.userId,
      title: newUser.title,
      body: newUser.body
    };
    let response = await addUser(user);
    console.log(response);
    return response;
  };

  const deleteUser = async () => {
    let response = await fetch(urlAPI + `posts/1`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(response);
    return response;
  };

  const modifyUser = async () => {
    let response = await fetch(urlAPI + `posts/1`, {
      method: "PUT",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(response);
    return response;
  };

  useEffect(() => {
    const queryAPI = async () => {
      const response = await fetch(urlAPI + "posts");
      const result = await response.json();

      setUsers(result);
    };

    queryAPI();
  }, []);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <p className="navbar-brand" href="#">
            Test Project
          </p>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            New User
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Modal title
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <input
                  className="form-control form-control-lg"
                  type="number"
                  min="1"
                  value={newUser.userId}
                  name="userId"
                  placeholder="UserId"
                  aria-label=".form-control-lg example"
                  onChange={(e) => {
                    setNewUser({ ...newUser, [e.target.name]: e.target.value });
                  }}
                />
                <input
                  className="form-control"
                  type="text"
                  value={newUser.title}
                  name="title"
                  placeholder="Title"
                  aria-label="default input example"
                  onChange={(e) => {
                    setNewUser({ ...newUser, [e.target.name]: e.target.value });
                  }}
                />
                <input
                  className="form-control form-control-sm"
                  type="text"
                  value={newUser.body}
                  name="body"
                  placeholder="Body"
                  aria-label=".form-control-sm example"
                  onChange={(e) => {
                    setNewUser({ ...newUser, [e.target.name]: e.target.value });
                  }}
                />
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={sendInfo}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-warning"
            onClick={modifyUser}
          >
            Modify User
          </button>
          <button type="button" className="btn btn-danger" onClick={deleteUser}>
            Delete User
          </button>
        </div>
      </nav>
      <div className="App">
        {users.map((item) => {
          return (
            <>
              <div className="container text-center div-father">
                <div className="row align-items-cente">
                  <div className="col">
                    <div
                      className="card text-bg-dark mb-3 div-son"
                      key={item.id}
                    >
                      <div className="card-header">{item.userId}</div>
                      <div className="card-body">
                        <h1 className="card-title">{item.title}</h1>
                        <p className="card-text">{item.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
