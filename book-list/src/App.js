import React, { useEffect, useState } from "react";
import { View } from "./components/View";
const getDataFromLS = () => {
  const data = localStorage.getItem("books");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
function App() {
  const [books, setBooks] = useState(getDataFromLS());

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");

  const handleAddBook = (e) => {
    e.preventDefault();
    let book = {
      title,
      author,
      isbn,
    };
    setBooks([...books, book]);
    setTitle("");
    setAuthor("");
    setIsbn("");
  };

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const deleteBook = (isbn) => {
    const filterBooks = books.filter((el, index) => {
      return el.isbn != isbn;
    });
    setBooks(filterBooks);
  };

  return (
    <div className="wrapper">
      <h1>BookList App</h1>
      <p>Add and view your books using Local Storage</p>
      <div className="main">
        <div className="form-container">
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={handleAddBook}
          >
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <br></br>
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              required
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            ></input>
            <br></br>
            <label>ISBN</label>
            <input
              type="text"
              className="form-control"
              required
              value={isbn}
              onChange={(e) => {
                setIsbn(e.target.value);
              }}
            ></input>
            <br></br>
            <button type="submit" className="btn btn-success btn-md">
              Add
            </button>
          </form>
        </div>
        <div className="view-container">
          {books.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>ISBN</th>
                      <th id="delete">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View books={books} deleteBook={deleteBook} />
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-danger btn-md"
                onClick={() => setBooks([])}
              >
                Remove All
              </button>
            </>
          )}
          {books.length < 1 && <div>No books are added yet!</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
