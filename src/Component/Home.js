import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = "http://localhost:8000/user";

function Home() {
  const [userdata, setuserdata] = useState([]);
  useEffect(() => {
    getdata();
  }, []);
  const getdata = () => {
    axios.get(apiUrl).then((response) => {
      setuserdata(response.data);
    });
  };

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:8000/user/${id}`);
    getdata();
  };
  const handleEdit = (data) => {
    console.log(data);
  };
  return (
    <div className="container">
      <button className="btn btn-primary float-end mb-5">
        {" "}
        <Link to="add" className="text-white text-decoration-none">
          {" "}
          Add
        </Link>
      </button>
      <table className="usertabel">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>State</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((value, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.state}</td>
                <td>{value.status ? "Active" : "Not Active"}</td>
                <td>
                  <button
                    className="btn-success btn me-3"
                    onClick={() => {
                      handleEdit(value);
                    }}
                  >
                    <Link
                      to={`/edit/${value.id}`}
                      className="text-white text-decoration-none"
                    >
                      Edit
                    </Link>
                  </button>
                  <button
                    className="btn-danger btn"
                    onClick={() => {
                      handleDelete(value.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
