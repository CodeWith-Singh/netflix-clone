import Input from "@/components/input";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVarinat = useCallback(() => {
    setVariant((curentVariant) =>
      curentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password]);

  return (
    <div className="relative h-full w-full bg-[url(/images/hero.jpg)] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12"></img>
        </nav>
        <div className="flex justify-center">
          <div className=" bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-4xl font-semibold text-white mb-8">
              {variant === "login" ? "Register" : "Sign In"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "login" && (
                <Input
                  id="name"
                  label="Username"
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  value={name}
                />
              )}

              <Input
                id="email"
                label="Email"
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                type="email"
                value={email}
              />
              <Input
                id="password"
                label="Password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "register" ? login : register}
              className="bg-red-600 text-white py-3 rounded-md w-full mt-10 hover:bg-red-800 transform"
            >
              {variant === "login" ? "Sign up" : "Login"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => {
                  signIn("google", { callbackUrl: "/profiles" });
                }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => {
                  signIn("github", { callbackUrl: "/profiles" });
                }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center  hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            {variant === "register" && (
              <div className="flex flex-row justify-center">
                <p className="text-neutral-500 mt-12">
                  First time using Netflix?
                  <span
                    onClick={toggleVarinat}
                    className="text-white ml-1 hover:underline cursor-pointer"
                  >
                    {" "}
                    Create an account
                  </span>
                </p>
              </div>
            )}
            {variant === "login" && (
              <div className="flex flex-row justify-center">
                <p className="text-neutral-500 mt-12">
                  Already have an account?
                  <span
                    onClick={toggleVarinat}
                    className="text-white ml-1 hover:underline cursor-pointer"
                  >
                    {" "}
                    Login
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
