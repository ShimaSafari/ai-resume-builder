import Header from "@/components/custom/Header";
import { AtomIcon, Edit, Share2 } from "lucide-react";
import React from "react";

function Home() {
  return (
    <div>
      <div class="fixed left-0 top-0 -z-10 h-full w-full">
        <div
          class="absolute inset-0 -z-10 h-full w-full bg-white 
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
        >
          <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_300px,#C9EBFF,transparent)]"></div>
        </div>
      </div>
      <Header />
      <div>
        <section className="z-50">
          <div
            className="py-8 px-4 mx-auto max-w-screen-xl text-center 
          lg:py-16 lg:px-12"
          >
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
              Build Your Resume <span className="text-primary">With AI</span>
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 xl:px-48">
              Effortlessly Craft a Standout Resume with Our AI-Powered Builder
            </p>
            <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a
                href="/dashboard"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r  from-sky-500 to-indigo-500 focus:ring-4 focus:ring-primary-300
                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200"
              >
                Get Started Now 🤍
              </a>
            </div>
            <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
              <span className="font-semibold text-gray-400 uppercase">
                FEATURED IN
              </span>
              <div className="flex flex-wrap justify-center items-center mt-8 sm:justify-between">
                <a href="https://react.dev/"  className="mr-5 mb-5 lg:mb-0" target="_blank">
                  <img src="/react.svg" alt="react.js" width={50} height={50}/>
                </a>
                <a href="https://vitejs.dev/" className="mr-5 mb-5 lg:mb-0" target="_blank">
                  <img src="/vite.svg" alt="vitejs" width={50} height={50} />
                </a>
                <a href="https://tailwindcss.com/" className="mr-5 mb-5 lg:mb-0" target="_blank">
                  <img src="/tailwind.svg" alt="tailwindCss" width={50} height={50}/>
                </a>
                <a href="https://ui.shadcn.com/" className="mr-5 mb-5 lg:mb-0" target="_blank">
                  <img src="/shadcn.png" alt="shadcn"width={50} height={50}className="rounded-lg" />
                </a>
                <a href="https://ai.google.dev/gemini-api" className="mr-5 mb-5 lg:mb-0" target="_blank">
                  <img src="/gemini.png" alt="gemini-api" width={50} height={50}/>
                </a>
                <a href="https://clerk.com/" className="mr-5 mb-5 lg:mb-0" target="_blank">
                  <img src="/clerk.png" alt="notLoad" width={50} height={50} />
                </a>
                <a href="https://strapi.io/" className="mr-5 mb-5 lg:mb-0" target="_blank">
                  <img src="/strapi.png" alt="strapi" width={50} height={50} />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="z-50 py-8 px-4 mx-auto mt-6 max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h2 className="font-bold text-3xl">How it Works?</h2>
          <h2 className="text-md text-gray-500">
            Build your resume in just 3 simple steps
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl border bg-white
               border-gray-200 p-8 shadow-lg hover:border-primary/20
                hover:shadow-primary/20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200"
              href="#"
            >
              <AtomIcon className="h-8 w-8 text-primary" />

              <h2 className="mt-4 text-xl font-bold text-black">
                Write prompt for your form
              </h2>

              <p className="my-6 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut
                quo possimus adipisci distinctio alias voluptatum blanditiis
                laudantium.
              </p>
            </a>

            <a
              className="block rounded-xl border bg-white
               border-gray-200 p-8 shadow-lg hover:border-primary/20
               hover:shadow-primary/20 transition ease-in-out delay-150     hover:-translate-y-1 hover:scale-110 duration-200"
              href="#"
            >
              <Edit className="h-8 w-8 text-primary"/>

              <h2 className="mt-4 text-xl font-bold text-black">
                Edit Your form
              </h2>

              <p className="my-6 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut
                quo possimus adipisci distinctio alias voluptatum blanditiis
                laudantium.
              </p>
            </a>

            <a
              className="block rounded-xl border bg-white
               border-gray-200 p-8 shadow-lg hover:border-primary/20
                hover:shadow-primary/20 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-200"
              href="#"
            >
              <Share2 className="h-8 w-8 text-primary" />

              <h2 className="mt-4 text-xl font-bold text-black">
                Share & Download
              </h2>

              <p className="my-6 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut
                quo possimus adipisci distinctio alias voluptatum blanditiis
                laudantium.
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Home;