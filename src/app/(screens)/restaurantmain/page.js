"use client";
import React, { useRef, useState } from "react";
import { ReactSVG } from "react-svg";
// import dynamic from "next/dynamic";
// const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });
import QrReader from 'react-qr-reader';
import { useRouter } from "next/navigation";

// Example JSON data
const data = [
  { id: 1, src: "/svgs/hat.svg", name: "Hat 1" },
  { id: 2, src: "/svgs/people.svg", name: "Hat 2" },
  { id: 3, src: "/svgs/security.svg", name: "Hat 3" },
  { id: 4, src: "/svgs/janitor.svg", name: "Hat 4" },
  { id: 5, src: "/svgs/hat.svg", name: "Hat 5" },
  { id: 6, src: "/svgs/hat.svg", name: "Hat 6" },
  { id: 7, src: "/svgs/hat.svg", name: "Hat 7" },
  { id: 8, src: "/svgs/hat.svg", name: "Hat 8" },
  { id: 9, src: "/svgs/hat.svg", name: "Hat 9" },
  { id: 10, src: "/svgs/hat.svg", name: "Hat 10" },
  { id: 11, src: "/svgs/hat.svg", name: "Hat 11" },
  { id: 12, src: "/svgs/hat.svg", name: "Hat 12" },
  { id: 13, src: "/svgs/hat.svg", name: "Hat 13" },
  { id: 14, src: "/svgs/hat.svg", name: "Hat 14" },
  { id: 15, src: "/svgs/hat.svg", name: "Hat 15" },
  { id: 16, src: "/svgs/hat.svg", name: "Hat 16" },
];

const staffData = [
  {
    id: 1,
    name: "佐藤聖絵",
    role: "Incharge",
    icons: ["/svgs/note.svg", "/svgs/delete.svg"],
  },
  {
    id: 2,
    name: "田中健一",
    role: "Manager",
    icons: ["/svgs/note.svg", "/svgs/delete.svg"],
  },
  {
    id: 3,
    name: "田中健一",
    role: "Manager",
    icons: ["/svgs/note.svg", "/svgs/delete.svg"],
  },
  {
    id: 4,
    name: "田中健一",
    role: "Manager",
    icons: ["/svgs/note.svg", "/svgs/delete.svg"],
  },
  {
    id: 5,
    name: "田中健一",
    role: "Manager",
    icons: ["/svgs/note.svg", "/svgs/delete.svg"],
  },
  {
    id: 6,
    name: "田中健一",
    role: "Manager",
    icons: ["/svgs/note.svg", "/svgs/delete.svg"],
  },
  {
    id: 7,
    name: "田中健一",
    role: "Manager",
    icons: ["/svgs/note.svg", "/svgs/delete.svg"],
  },
  // Add more staff data as needed
];

export default function RestaurantMain() {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const router = useRouter();

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setStartY(e.pageY - e.currentTarget.offsetTop);
    setScrollLeft(e.currentTarget.scrollLeft);
    setScrollTop(e.currentTarget.scrollTop);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - e.currentTarget.offsetLeft;
    const y = e.pageY - e.currentTarget.offsetTop;
    const walkX = (x - startX) * 2; // Adjust scrolling speed
    const walkY = (y - startY) * 2; // Adjust scrolling speed
    e.currentTarget.scrollLeft = scrollLeft - walkX;
    e.currentTarget.scrollTop = scrollTop - walkY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    if (e.currentTarget) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  const handleVerticalWheel = (e) => {
    if (e.currentTarget) {
      e.currentTarget.scrollTop += e.deltaY;
    }
  };
  const [showScanner, setShowScanner] = useState(false);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleScan = (data) => {
    if (data) {
      console.log(data); // handle scanned data
      setShowScanner(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setShowScanner(false);
  };
  const image = "/images/bannerpic.png"; // Add the image path here

  return (
    <div className="fixed inset-0 mx-auto flex justify-center w-full max-w-xl sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
      <div className="mx-auto  rounded w-full">
        <div className="relative">
          {/* Conditionally render the image or SVG based on the availability of the image */}
          {/* If image is available, render the <img> tag */}
          {image ? (
            <img
              src={image}
              alt="Banner"
              className="w-full h-auto"
            />
          ) : (
            /* If image is not available, render the <svg> tag */
            <div className="bg-[#212121] h-[280px] pb-60" id="new">
              <ReactSVG
                src="/svgs/defbanner.svg"
                alt="alt"
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="absolute inset-0 flex justify-center mt-4 bg-opacity-70 text-white">
            <p className="text-xl font-medium">Restaurant Detail</p>
          </div>
         
          <div className="absolute inset-0 flex flex-col justify-between px-[18px] bg-opacity-70 text-white">
    <div className="flex justify-between mt-16"> {/* Vertical margin of 10px */}
      <p className="text-xl font-medium">次郎寿司</p>
      <div className="flex items-center gap-3 border border-white h-[30px] w-[78px] rounded">
        <p className="text-xs ml-1 font-medium">次</p>
        <p className="text-xs font-medium">English</p>
      </div>
    </div>
    <p className="text-sm font-normal mt-[-30px]">Branch No: 654321</p> {/* Vertical margin of 10px */}
    <p className="text-sm font-normal mt-[-30px]">Reg. No: 09876754321</p> {/* Vertical margin of 10px */}
    <p className="text-sm font-normal mb-[30px] mt-[-30px]">Address:兵庫県神戸市小河通</p>
  </div>
        </div>

        <div className="bg-white rounded-tl-3xl px-[18px] rounded-tr-3xl w-full h-full mt-[-20px] relative">
          <div className="flex justify-center">
            <ReactSVG className="mt-[10px]" src="/svgs/bottomsheetbar.svg" />
          </div>
          <div className="flex justify-between mt-6">
            <p className="text-base font-semibold">Total Earnings:</p>
            <div className="h-7 w-24 text-sm bg-[#FFECEC] rounded">
              <p className="text-center text-sm mt-1 cursor-pointer">
                View All
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex h-9 justify-between items-center">
              <div className="flex gap-5 w-[50%]">
                <p className="font-semibold text-[26px]">¥255k</p>
                <div className="text-sm">
                  <p className="text-sm mt-1">Total Earning</p>
                </div>
              </div>
              {/* <div className="flex items-center">
                <div className="border-l ml-12 border-[#E0E0E0] h-6 mr-4"></div>
              </div> */}
              <div className="flex gap-5 items-center justify-end  w-[50%]">
                <p className="font-semibold text-[26px]">¥255k</p>
                <div className="text-sm">
                  <p className="text-sm mt-1">Earning this month</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p>Departments list:</p>
            <div className="flex mt-4">
            <ReactSVG className="mt-5" src="/svgs/plusicon.svg" />
              <div className=" flex flex-row items-center">
                <div className="border-l ml-4 border-[#E0E0E0] h-[92px] mr-4"></div>
              </div>
            <div
              ref={scrollRef1}
              className="flex flex-row  overflow-x-auto no-scrollbar"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              
              <div className="flex gap-3">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="w-[54px] h-[54px] rounded-full mt-5 bg-[#FFECEC] flex justify-center"
                  >
                    <ReactSVG className="mt-3" src={item.src} />
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <p className="text-base font-semibold">Staff list:</p>
            <div>
              <div className="flex gap-[10px]">
                <div className="h-7 w-24 text-sm bg-[#FFECEC] rounded">
                  <p className="text-center text-sm mt-1 cursor-pointer">
                    Add New
                  </p>
                </div>
                <div className="h-7 w-24 text-sm bg-[#FFECEC] rounded">
                  <p className="text-center text-sm mt-1 cursor-pointer">
                    Edit
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={scrollRef2}
            className="mt-5 overflow-y-auto no-scrollbar"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleVerticalWheel}
            style={{ maxHeight: "300px" }} // Adjust height as needed
          >
            {staffData.map((staff) => (
              <div
                key={staff.id}
                className="px-[10px] mt-5 flex justify-between"
              >
                <div className="flex items-center">
                  <img
                    src="/images/staff.png"
                    className="w-[50px] h-[50px]"
                    alt="staff"
                  />
                  <div className="ml-2">
                    <p className="font-medium">{staff.name}</p>
                    <p className="text-sm text-gray-600">{staff.role}</p>
                  </div>
                </div>
                <div className="flex items-center  gap-2">
                  <ReactSVG
                    className="w-6 h-6 cursor-pointer"
                    src="/svgs/note.svg"
                  />
                  <ReactSVG
                    className="w-6 h-6 cursor-pointer"
                    src="/svgs/delete.svg"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Bottom Tab Navigator */}
        </div>

        <div className="flex justify-center">
        <div className="fixed bottom-0 w-full bg-white flex justify-around py-5 shadow-lg mx-auto max-w-xl sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
          <div className="text-center" onClick={() => handleNavigation('/homepwa')}>
            <ReactSVG src="/svgs/home.svg" className="w-6 h-6 mx-auto cursor-pointer" />
            <p className="text-xs text-[#484C52]">Home</p>
          </div>
          <div className="text-center" onClick={() => setShowScanner(true)}>
            <ReactSVG src="/svgs/scan.svg" className="w-6 h-6 relative mt-[-25px] mx-auto cursor-pointer" />
          </div>
          <div className="text-center" onClick={() => handleNavigation('/profile')}>
            <ReactSVG src="/svgs/profile.svg" className="w-6 h-6 mx-auto cursor-pointer" />
            <p className="text-xs text-[#484C52]">Profile</p>
          </div>
        </div>
      </div>

      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="w-full max-w-md">
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setShowScanner(false)}
            >
              Close Scanner
            </button>
          </div>
        </div>
      )}
      </div>

      
    </div>
  );
}
