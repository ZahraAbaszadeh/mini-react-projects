import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddContacts = ({ contacts, addContact }) => {
  const nav = useNavigate();

  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmailExist = contacts.filter((contact) =>
      contact.email === email ? contact : null
    );

    const checkPhoneExist = contacts.filter((contact) =>
      contact.phone === phone ? contact : null
    );

    if (!fname || !email || !phone) {
      return toast.warning("Please fill in all fields!!");
    }

    if (checkEmailExist.lenght > 0) {
      return toast.error("This email already exists!");
    }

    if (checkPhoneExist.lenght > 0) {
      return toast.error("This phone number already exists!");
    }

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id+1 : 0,
      fname,
      email,
      phone,
    };
    addContact(data);
    toast.success("Contact added successfully!");
    nav("/");
  };
  return (
    <div className="container-fluid">
      <h5 className="text-center text-dark py-5 display-2 fs-3">Add Contact</h5>
      <div className="row">
        <div className="col-md-4 p-5 mx-auto shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control mt-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control mt-2"
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="btn btn-primary mt-4"
                type="submit"
                value="Add Contact"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddContacts);
