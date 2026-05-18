import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const {loading, handleRegister} = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await handleRegister({username,email,password})

    if (data?.user) {
      navigate("/")
    }
  };
  
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loading ? <button disabled className="button button-primary">Signing Up.....</button>:
          <button className="button button-primary">Submit</button>
          }
        </form>
        <p>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
