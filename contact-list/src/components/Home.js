import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../assets/styles.css";
import { toast } from "react-toastify";

const Home = ({ contacts, deleteContact }) => {


  return (
    <div className="container w-75">
      <div className="row d-flex flex-column homeLink mx-auto">
        <div className="mx-auto my-5 text-center">
          <Link to="/add" className="my-5 text-decoration-none">
            <span class="p-2 border border-success fs-5 text-success">
              Add Contact
            </span>
          </Link>
        </div>
        <div className="col-md-12 mx-auto my-3 text-center">
          <table className="table table-hover ">
            <thead className="table-header bg-success bg-opacity-75 bg-gradient text-white border border-success">
              <tr>
                <th scope="col" className="fw-normal fs-5">
                  Id
                </th>
                <th scope="col" className="fw-normal fs-5">
                  Name
                </th>
                <th scope="col" className="fw-normal fs-5">
                  Email
                </th>
                <th scope="col" className="fw-normal fs-5">
                  Phone
                </th>
                <th scope="col" className="fw-normal fs-5"></th>
              </tr>
            </thead>
            <tbody className="border">
            {contacts.length > 0 ? (
                contacts.map((contact, id) => (
                  <tr key={id}>
                    <td>{id+1}</td>
                    <td>{contact.fname}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td className="text-center">
                      <Link
                        to={`/edit/${contact.id}`}
                        className="btn btn-sm btn-primary mx-3"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          toast.error("This Contact removed!");
                          return deleteContact(contact.id);
                          }}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No contacts found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
