import { React, useEffect, useState } from "react";
import "./form.css";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:8000/user";

function Edit() {
  const { id } = useParams();
  const [updatedata, setupdatedata] = useState([]);
  const [checkbox, setCheckbox] = useState();
  useEffect(() => {
    axios.get(`http://localhost:8000/user/${id}`).then((res) => {
      setupdatedata(res.data);
    });
  }, []);

  const navigate = useNavigate();
  const handleEdit = (e) => {
    // e.preventDefualt();
    const { name, value } = e.target;
    setupdatedata({
      ...updatedata,
      [name]: value,
    });
    console.log(updatedata);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // const newdata = {...updatedata, }

    axios.put(`http://localhost:8000/user/${id}`, updatedata);
    setupdatedata({
      name: "",
      email: "",
      password: "",
      state: "",
      status: false,
    });
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2 className="text-center text-primary">Edit page</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedata.name}
            onChange={handleEdit}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={updatedata.email}
            onChange={handleEdit}
          />
        </div>

        <div className="form-group">
          <label htmlFor="State">Select State:</label>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            name="state"
            value={updatedata.state}
            onChange={handleEdit}
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="defaultCheck1"
              name="status"
              checked={updatedata.status}
            />
            <label className="form-check-label" htmlFor="defaultCheck1">
              Status
            </label>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </div>
  );
}

export default Edit;
