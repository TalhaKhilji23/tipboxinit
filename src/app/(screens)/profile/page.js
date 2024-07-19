"use client";
import React from 'react'
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    const handleNavigation = (path) => {
        router.push(path);
      };
  return (
    <div>Profile pwa


        <button onClick={() => handleNavigation("/restaurantmain")}>back</button>
    </div>
  )
}
