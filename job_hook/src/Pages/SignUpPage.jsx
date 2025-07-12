import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";
import { Button } from "@mantine/core";
import gsap from "gsap";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(containerRef.current, {
      x: isLoginPage ? "0%" : "-50%",
      duration: 0.7,
      ease: "power3.inOut",
    });

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    );
  }, [isLoginPage]);

  const handleBack = () => {
    
      navigate("/");
    
  };

  return (
    <div className="min-h-[90vh] !relative bg-mine-shaft-950 font-['poppins'] overflow-hidden">
      <Button
        className="!absolute top-4 left-5 z-50"
        onClick={handleBack}
        leftSection={<IconArrowLeft size={20} />}
        variant="outline"
        color="brightSun.4"
        size="sm"
      >
        Home
      </Button>

      <div
        ref={containerRef}
        className="w-[100vw] h-[100vh] flex [&>*]:flex-shrink-0"
      >
        <Login />
        <div
          ref={contentRef}
          className={`w-1/2 h-full ${
            isLoginPage ? "rounded-l-[200px]" : "rounded-r-[200px]"
          } bg-mine-shaft-800 flex flex-col items-center justify-center gap-6 transition-all duration-500`}
        >
          <div className="flex items-center text-bright-sun-400 group w-fit text-6xl font-extrabold tracking-tight drop-shadow-md">
            {isLoginPage ? "Welcome Back!" : "Hello Welcome"}
          </div>
          <div className="text-center font-semibold text-lg flex flex-col gap-2">
            {isLoginPage
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link to={isLoginPage ? "/signup" : "/login"} className="w-fit mx-auto">
              <Button 
                variant="outline" 
                color="brightSun.4" 
                size="md"
                className="w-full"
              >
                {isLoginPage ? "Sign Up" : "Login"}
              </Button>
            </Link>
          </div>
        </div>
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
