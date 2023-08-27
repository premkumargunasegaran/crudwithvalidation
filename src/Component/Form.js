import { React, useEffect, useState } from "react";
import "./form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:8000/user";

function Form() {
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: "",
    state: "",
  });

  const [error, seterror] = useState({});

  const [status, setstatus] = useState();
  const navigate = useNavigate();
  const handleInput = (e) => {
    const { value, name } = e.target;
    setuserdata(() => {
      return { ...userdata, [name]: value };
    });
  };
  const validate = () => {
    let isvalid = true;
    const errorObj = {
      name: "",
      email: "",
      password: "",
      status: "",
      state: "",
    };
    if (userdata.name.trim() === "") {
      errorObj.name = "Name is Required";
      isvalid = false;
    }
    if (userdata.password.trim() === "") {
      errorObj.password = "password is Required";
      isvalid = false;
    }
    if (!/\S+@\S+\.\S+/.test(userdata.email)) {
      errorObj.email = "Invalid email address";
      isvalid = false;
    }
    if (userdata.state === "") {
      errorObj.state = "state is Required";
      isvalid = false;
    }
    if (userdata.status === "") {
      errorObj.status = "Accepect Status";
      isvalid = false;
    }
    seterror(errorObj);
    return isvalid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newob = { ...userdata, status };

    try {
      if (validate()) {
        axios.post(apiUrl, newob);
        console.log("user added");
        setuserdata({
          name: "",
          email: "",
          password: "",
          state: "",
        });
        setstatus(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(newob);
  };
  return (
    <div className="form-container">
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userdata.name}
            required
            onChange={handleInput}
          />
          {<span className="text-danger">{error.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userdata.email}
            required
            onChange={handleInput}
          />
        </div>
        {<span className="text-danger">{error.email}</span>}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userdata.password}
            required
            onChange={handleInput}
          />
        </div>
        {<span className="text-danger">{error.password}</span>}
        <div className="form-group">
          <label htmlFor="State">Select State:</label>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            name="state"
            value={userdata.state}
            required
            onChange={handleInput}
          >
            <option value="">Select state</option>
            <option value="AN">Andaman and Nicobar Islands</option>
            <option value="AP">Andhra Pradesh</option>
            <option value="AR">Arunachal Pradesh</option>
            <option value="AS">Assam</option>
            <option value="BR">Bihar</option>
            <option value="CH">Chandigarh</option>
            <option value="CT">Chhattisgarh</option>
            <option value="DN">Dadra and Nagar Haveli</option>
            <option value="DD">Daman and Diu</option>
            <option value="DL">Delhi</option>
            <option value="GA">Goa</option>
            <option value="GJ">Gujarat</option>
            <option value="HR">Haryana</option>
            <option value="HP">Himachal Pradesh</option>
            <option value="JK">Jammu and Kashmir</option>
            <option value="JH">Jharkhand</option>
            <option value="KA">Karnataka</option>
            <option value="KL">Kerala</option>
            <option value="LA">Ladakh</option>
            <option value="LD">Lakshadweep</option>
            <option value="MP">Madhya Pradesh</option>
            <option value="MH">Maharashtra</option>
            <option value="MN">Manipur</option>
            <option value="ML">Meghalaya</option>
            <option value="MZ">Mizoram</option>
            <option value="NL">Nagaland</option>
            <option value="OR">Odisha</option>
            <option value="PY">Puducherry</option>
            <option value="PB">Punjab</option>
            <option value="RJ">Rajasthan</option>
            <option value="SK">Sikkim</option>
            <option value="TN">Tamil Nadu</option>
            <option value="TG">Telangana</option>
            <option value="TR">Tripura</option>
            <option value="UP">Uttar Pradesh</option>
            <option value="UT">Uttarakhand</option>
            <option value="WB">West Bengal</option>
          </select>
          {<span className="text-danger">{error.state}</span>}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="defaultCheck1"
              onChange={() => setstatus(!status)}
            />
            <label className="form-check-label" htmlFor="defaultCheck1">
              Status
            </label>
          </div>
          {<span className="text-danger">{error.status}</span>}
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
