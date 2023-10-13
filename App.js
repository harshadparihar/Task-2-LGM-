import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://reqres.in/api/users?page=1");
      const delay=850;
      await new Promise((resolve) => setTimeout(resolve, delay));
      const data = await response.json();
      setUsers(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching users:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <nav>
        <div className="navbar">
          <div className="brand">Lets Grow More </div>
          <button onClick={fetchUsers} class="button-6">Get Users</button>
        </div>
      </nav>

      <div className="user-card-grid">
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          users.map((user) => (
            <div className="user-card" key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <h3>{user.id}) {`${user.first_name} ${user.last_name}`}</h3>
              <p>Email: {user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;