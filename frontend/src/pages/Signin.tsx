import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { SigninInput } from "@kaushik1206/blog-common"
import { BACKEND_URL } from "../../config"
import axios from "axios"

export function Signin() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const [postInputs,setpostInputs] = useState<SigninInput>({
      email:"",
      password:"",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    try{
      // const res = await axios.post(`http://localhost:8787/api/v1/user/signup`,postInputs);
      const res = await axios.post(`${BACKEND_URL}/user/signin`,postInputs);
      const data = res.data;
      localStorage.setItem("token",data.jwt_token);
      // console.log(localStorage.getItem("token"));
      navigate("/blogs");

    }catch(e){
      console.log("Error",e);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-xl rounded-lg p-8 space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-16 h-16 bg-black rounded-full mx-auto flex items-center justify-center"
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-center text-gray-800"
          >
            Welcome Back
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                placeholder="Enter your email"
                onChange = {(e)=>{
                  setpostInputs({...postInputs,email:e.target.value});
                }}
              />
            </motion.div>

            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1"
                placeholder="Enter your password"
                onChange={(e)=>{
                  setpostInputs({
                    ...postInputs,
                    password:e.target.value
                  })
                }}
              />
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-gray-600"
          >
            Don't have an account?{" "}
            <Link to={"/signup"} className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

