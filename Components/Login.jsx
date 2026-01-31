import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnchangeName = (e) => {
    setName(e.target.value);
    //console.log(name)
  };
  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
    //console.log(password)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "admin" && password === "1234") {
      navigate("/dashboard");
    } else {
      navigate("/relogin");
    }
  };
  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center bg-linear-to-t from-green-100 via-green-300 to-green-500 bg-fixed">
      <div className="bg-green-50 p-10 rounded-2xl shadow-2xl space-y-5">
        <h2 className="text-2xl font-sans text-center font-extrabold text-blue-500">Login</h2>
        <form className="flex flex-col space-y-7" onSubmit={handleSubmit}>
          <input
    
          //class="bg-neutral-secondary-medium border border-default-medium text-heading 
          // text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs 
          className="bg-neutral-50 border border-default-meduim text-sm text-heading rounded-base w-60 px-3 py-2.5 shadow-2xl"
            type="text"
            placeholder="User Name"
            value={name}
            onChange={handleOnchangeName}
            required
          />
          <input
          className="bg-neutral-50 border border-default-meduim text-sm text-heading rounded-base w-60 px-3 py-2.5 shadow-2xl block"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleOnchangePassword}
            required
          />
          <button className="text-white bg-blue-500 box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
