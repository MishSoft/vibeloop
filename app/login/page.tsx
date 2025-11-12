import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="h-screen flex justify-center items-center w-full bg-hover">
      <div className="bg-background flex flex-col items-center  px-6 lg:px-12 py-6 rounded-md max-w-[400px] w-[90%]">
        <Image
          src={"/logo.png"}
          alt="logo image"
          width={300}
          height={300}
          className="w-11 h-11"
        />
        <h2 className="text-2xl font-bold text-white my-2 mb-4 text-center">
          Log in to VibeLoop
        </h2>
        <form>
          <input
            type="text"
            placeholder="Your Email"
            className="outline-none border border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-natural-600 mb-6 focus:text-secondary-text"
          />

          <input
            type="password"
            placeholder="*******"
            className="outline-none border border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-natural-600 mb-6 focus:text-secondary-text"
          />

          <button className="w-full  p-2 bg-primary text-white rounded-md cursor-pointer hover:bg-primary/80 duration-200">
            Continue
          </button>

          <p className="text-primary-text text-center m-2 text-sm">
            Don&apos;t have an account?{" "}
            <Link className="underline text-white" href="/">
              {" "}
              Sign up now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
