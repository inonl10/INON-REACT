import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ marginTop: "25px", textAlign: "center" }}>
      <h4>Welcome to Our Restaurant</h4>
      <h6 style={{ marginTop: "30px" }}>Please press the button to continue</h6>
      <div style={{ marginTop: "40px" }}></div>
      <Link to={"category/all"} className="btn btn-primary">
        Continue
      </Link>
    </div>
  );
}

export default Home;
