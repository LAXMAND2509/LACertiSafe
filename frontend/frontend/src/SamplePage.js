import React, { useEffect, useState } from "react";
import axios from "axios";

function SamplePage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/hello")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Sample Page</h1>
      <p>Message from backend: {message}</p>
    </div>
  );
}

export default SamplePage;
