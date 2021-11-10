import React from "react";

const Nav = ({ libraryActive, setLibraryActive }) => {
  return (
    <nav className="nav">
      <h1 className="title">Chill. Vibe. Music.</h1>
      <button
        onClick={() => setLibraryActive(!libraryActive)}
        className={`btn-library ${libraryActive ? "library-active" : ""}`}
      >
        Library
      </button>
    </nav>
  );
};

export default Nav;
