import React, { useEffect, useState, useRef } from "react";
export default function LanguageChange() {
    const [showNames, setShowNames] = useState(false);

  const handleLanguageChangeClick = () => {
    setShowNames(!showNames);
  };
  return (
   <div >
     <div   onClick={handleLanguageChangeClick}>
    <div className="flex cursor-pointer  justify-end mr-4">
      <div className="border flex justify-between px-2 pt-1 border-red-500 w-24 h-8 rounded-md">
        <p className="text-sm">本</p>
        <p className="text-sm">Enlgish</p>
      </div>
    </div>
  </div>
  {showNames && (
       <div  className='mr-10 pt-20  h-full w-full'>
        <div className="flex justify-end mb-10 w-full">
         <div className="absolute top-0 mt-[115px] mr-8  flex flex-col  bg-white p-4 border rounded-2xl shadow-lg">
          <p className="text-sm cursor-pointer">日本語</p>
          <p className="text-sm cursor-pointer">English</p>
          <p className="text-sm cursor-pointer">中文</p> 
     
        </div>
       </div>
       </div>
      )}
   </div>
  )
}
