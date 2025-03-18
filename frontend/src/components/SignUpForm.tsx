

import type React from "react"

import { ChangeEvent, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput} from "@kaushik1206/blog-common"
import axios from "axios"
import { BACKEND_URL } from "../../config"

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const [postInputs,setpostInputs] = useState<SignupInput>({
    email:"",
    password:"",
    name:""
  })


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    try{
      // const res = await axios.post(`http://localhost:8787/api/v1/user/signup`,postInputs);
      const res = await axios.post(`${BACKEND_URL}/user/signup`,postInputs);
      const data = res.data;
      localStorage.setItem("token",data.jwt_token);
      // console.log(localStorage.getItem("token"));
      navigate("/blog");

    }catch(e){
      console.log("Error",e);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delay: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Sign up form */}
      {/* {JSON.stringify(postInputs)} */}

      <motion.div
        className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-md space-y-8">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to={"/signin"} className="font-medium underline hover:text-primary">
                Login
              </Link>
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">

              <LabelledInput label={"Email"} htmlFor={"email"} id={"email"} name={"email"} type={"email"} placeholder={"m@example.com"} 
                onChange={(e)=>{setpostInputs({
                  ...postInputs,
                  email:e.target.value
                })}}
              >  
              </LabelledInput>

              <LabelledInput label={"Name"} htmlFor={"name"} id={"name"} name={"name"} placeholder={"John Doe"} 
                onChange={(e)=>{setpostInputs({
                  ...postInputs,
                  name:e.target.value
                })}}
              >  
              </LabelledInput>
              <LabelledInput label={"Password"} htmlFor={"password"} id={"password"} name={"password"} type={"password"}
                onChange={(e)=>{setpostInputs({
                  ...postInputs,
                  password:e.target.value
                })}}
              >  
              </LabelledInput>
            </div>

            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

interface LabelledInputType{
  label:string,
  htmlFor:string,
  id:string,
  name:string,
  type?:string,
  placeholder?:string,
  onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
}

function LabelledInput({label,htmlFor,id,name,type,placeholder,onChange}:LabelledInputType){

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <motion.div variants={itemVariants}>
      <label htmlFor={htmlFor} className="block text-sm font-medium">
        {label}
      </label>
      <Input
        id={id}
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        required
        className="mt-1"
        onChange={onChange}
      />
    </motion.div>
  )
}

