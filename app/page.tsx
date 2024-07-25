"use client"
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();
  return (
    <main>
      <Navbar session={session} />
      <div className="container mx-auto">
        <h3 className="mt-3">Welcome to home page</h3>
        <hr className="mt-3" />
        <p>Hi Meow</p>
        <div className="flex flex-wrap justify-between mt-4 space-x-3">
          <img
            className="w-1/4 h-auto rounded-md"
            src="https://i.pinimg.com/564x/b9/2f/9a/b92f9a878ea790ccbfb164cb01f37678.jpg"
            alt="Beautiful Scenery 1"
          />
          <img
            className="w-1/4 h-auto rounded-md"
            src="https://i.pinimg.com/564x/9f/33/17/9f33179d3c925f4a24ce00ec8ee55b23.jpg"
            alt="Beautiful Scenery 2"
          />
          <img
            className="w-1/4 h-auto rounded-md"
            src="https://i.pinimg.com/564x/66/d1/4a/66d14aec6cd11d59264dd58525fdb449.jpg"
            alt="Beautiful Scenery 3"
          />
        </div>
      </div>
    </main>
  );
}
