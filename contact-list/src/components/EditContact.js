import React, { useEffect, useState } from "react";
import "../assets/styles.css";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { connect } from "react-redux";

const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const nav = useNavigate();

  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setFname(currentContact.fname);
    setEmail(currentContact.email);
    setPhone(currentContact.phone);
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmailExist = contacts.filter((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkPhoneExist = contacts.filter((contact) =>
      contact.phone === phone && contact.id !== currentContact.id
        ? contact
        : null
    );

    if (!email || !fname || !phone) {
      return toast.warning("Please fill in all fields!");
    }
    if (checkEmailExist.length > 0) {
      return toast.error("This email already exists!");
    }
    if (checkPhoneExist.length > 0) {
      return toast.error("This phone number already exists!");
    }

    const data = {
      id: +(currentContact.id),
      fname,
      email,
      phone,
    };

    updateContact(data);
    toast.success("Contact updated successfully!");
    nav("/");
  };
  return (
    <div className="container">
      {currentContact ? (
        <>
          <h3 className="text-center text-dark pt-3 display-2 fs-3">
            Edit contact {+id + 1}
          </h3>
          <div className="row d-flex flex-column">
            <button
              className="btn  my-4 w-25 shadow-lg"
              onClick={() => nav("/")}
            >
              Go back
            </button>
            <div className="col-md-4 mx-auto shadow-lg p-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    value={fname}
                    placeholder={"Full Name"}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control mt-2"
                    value={email}
                    placeholder={"Email"}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control mt-2"
                    value={phone}
                    placeholder={"Phone"}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group d-flex align-items-center my-2">
                  <button type="submit" className="btn btn-primary mt-3">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-3 mx-3"
                    onClick={() => nav("/")}
                  >
                    cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h2 className="text-center">No Contact Found!</h2>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
