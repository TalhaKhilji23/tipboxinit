"use client";
import React, { useEffect, useState, useRef } from "react";
import BottomSheet2 from "@/components/BottomSheet2";
import { ReactSVG } from "react-svg";

import { useRouter } from "next/navigation";

import LanguageChange from "@/components/LanguageChange";
const Modal = () => {
  return (
    <div className="fixed inset-0 mx-auto z-50 flex items-center justify-center  w-[428px] bg-[#FFECEC] ">
      <div className=" mx-auto p-4 rounded">
        <div className="flex justify-center items-center h-full">
          <ReactSVG src="/svgs/icon.svg" />
        </div>
      </div>
    </div>
  );
};


const LoginPage = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const isFirstVisit = localStorage.getItem("isFirstVisit") === null;
  const startY = useRef(0);
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/restaurantmain");
  };
  useEffect(() => {
    if (isFirstVisit) {
      setShowPrivacyPolicy(true);
      localStorage.setItem("isFirstVisit", "false");
      const timer = setTimeout(() => {
        setShowPrivacyPolicy(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleTouchMove = (e) => {
      const dragDistance = startY.current - e.touches[0].clientY;
      if (dragDistance > 50) {
        // Adjust the drag distance threshold as needed
        setIsBottomSheetOpen(true);
      }
    };

    const handleTouchEnd = () => {
      startY.current = 0;
    };

    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const containerRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (event) => {
    isDown = true;
    startX = event.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (event) => {
    if (!isDown) return;
    event.preventDefault();
    const x = event.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 3; // Adjust scrolling sensitivity
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isDown = false;
    const scrollPos = containerRef.current.scrollLeft;
    const divWidth = containerRef.current.offsetWidth;
    const halfwayPoint = divWidth / 2;

    // Determine which div to scroll to based on current scroll position
    if (scrollPos < halfwayPoint) {
      // Scroll to div 1
      containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else if (scrollPos < halfwayPoint * 3) {
      // Scroll to div 2
      containerRef.current.scrollTo({ left: divWidth, behavior: "smooth" });
    } else {
      // Scroll to div 3
      containerRef.current.scrollTo({ left: divWidth * 2, behavior: "smooth" });
    }
  };

  return (
    <div className="flex  mx-auto flex-col  justify-center min-h-screen bg-white w-[428px]  p-4 sm:p-0">
      <div className="z-10">{showPrivacyPolicy && <Modal />}</div>

      <div>
        <LanguageChange />
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto whitespace-nowrap h-full scrollbar-hide w-full max-w-4xl"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="inline-block w-full   max-w-md">
          <div
            id="1"
            className="bg-white p-8 rounded w-full max-w-md"
            style={{ top: "-70px", position: "relative" }}
          >
            <div className="flex justify-center">
              <ReactSVG src="/svgs/screen1.svg" />
            </div>
            <p className="text-black text-center mt-9">
              Scan, Smile, Support <br />
              Tip Staff via <span className="text-[#F00]">QR Code</span>
            </p>
            <div className="flex justify-center">
              <p className="text-center text-4xl text-[#FF0000]">.</p>
              <p className="text-center text-4xl text-[#E0E0E0]">.</p>
              <p className="text-center text-4xl text-[#E0E0E0]">.</p>
            </div>
          </div>
        </div>

        <div className="inline-block w-full max-w-md relative">
          <div
            id="2"
            className="bg-white p-10 rounded w-full max-w-md"
            style={{ top: "-120px", position: "relative" }}
          >
            <div className="flex justify-center">
              <ReactSVG src="/svgs/screen2.svg" />
            </div>{" "}
            <p className="text-black text-center mt-9">
              <span className="text-[#F00]">Sign Up</span> now to maintain a
              complete <br />
              transaction record
            </p>
            <div className="flex justify-center">
              <p className="text-center text-4xl text-[#E0E0E0]">.</p>
              <p className="text-center text-4xl text-[#FF0000]">.</p>
              <p className="text-center text-4xl text-[#E0E0E0]">.</p>
            </div>
          </div>
        </div>

        <div className="inline-block w-full max-w-md">
          <div id="3" className="bg-white p-10 rounded w-full max-w-md">
            <div className="flex justify-center">
              <ReactSVG src="/svgs/screen3.svg" />
            </div>
            <p className="text-black text-center mt-9">
              Your Journey Begins Here <br />
              <span className="text-[#F00]">Login</span> to Get Started
            </p>
            <div className="flex justify-center">
              <p className="text-center text-4xl text-[#E0E0E0]">.</p>
              <p className="text-center text-4xl text-[#E0E0E0]">.</p>
              <p className="text-center text-4xl text-[#FF0000]">.</p>
            </div>

            <div
              className="bg-[#F00] h-10 w-[100%] self-center rounded-md mt-20"
              onClick={handleLoginClick}
            >
              <p className="text-center cursor-pointer text-white mt-2 pt-2">Login</p>
            </div>
            <div className="border border-[#F00] h-10 w-[100%] self-center rounded-md mt-5">
              <p className="text-center text-[#F00] mt-2">Send tip directly</p>
            </div>
          </div>
        </div>
      </div>
      <BottomSheet2
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      />
    </div>
  );
};

export default LoginPage;
