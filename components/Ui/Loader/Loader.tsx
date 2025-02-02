'use client'
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="flex space-x-2">
        <Image src="/loader.svg" alt="Loading..." width={150} height={150} />

      </div>
    </div>
  );
};

export default Loader;