"use client"
import React, { FormEvent, useState } from "react";

import { BaseRespone } from "../types";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try{
      let request_data=JSON.stringify({username:username,password:password})
      
    const request=await fetch("/api/user",{method:"POST",   headers: {
      'Content-Type': 'application/json'
    }, body:request_data} )
    const data=await request.json() as BaseRespone
    setStatus(data.message)
  }
  catch(err){
    console.log(err)
  }
}

  return (
    <div className="mt-5">
      <div className="bg-gray-300 rounded  shadow-lg w-1/2 mx-auto p-3">
        <div className="mx-3 ">
          <div className="text-2xl text-center text-gray-700 font-semibold">
            Register
          </div>
        </div>
      </div>
      <div className="flex w-full mt-3">
        <div className="mx-auto max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                value="Submit"
              />
            </div>
            {status && (
              <div className="p-3 bg-gray-500 font-semibold text-center text-white mt-3">
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;