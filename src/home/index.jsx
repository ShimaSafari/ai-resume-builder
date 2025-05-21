import Header from "@/components/custom/Header";
import { LogIn, AtomIcon, Edit, Share2 } from "lucide-react";
import React from "react";
import Particles from "@/components/ui/particles";
import Footer from "@/components/custom/Footer";

const featured = [
  {
    name: "Vite",
    url: "https://vitejs.dev/",
    img: "/vite.svg",
    alt: "vitejs",
  },
  {
    name: "React",
    url: "https://react.dev/",
    img: "/react.svg",
    alt: "react.js",
  },

  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    img: "/tailwind.svg",
    alt: "tailwindCss",
  },
  {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com/",
    img: "/shadcnui.svg",
    alt: "shadcn",
  },
  {
    name: "Gemini API",
    url: "https://ai.google.dev/gemini-api",
    img: "/gemini.png",
    alt: "gemini-api",
  },
  {
    name: "Clerk",
    url: "https://clerk.com/",
    img: "/clerk.png",
    alt: "clerk",
  },
  {
    name: "Strapi",
    url: "https://strapi.io/",
    img: "/strapi.png",
    alt: "strapi",
  },
  {
    name: "Supabase",
    url: "https://supabase.com/",
    img: "/supabase.svg",
    alt: "supabase",
  },
];

const steps = [
  {
    icon: (
      <LogIn className="h-8 w-8 text-primary group-hover:scale-110 transition" />
    ),
    title: "Sign In or Get Started",
    desc: "Create an account or sign in with Google or Github account to access all features and securely save your resume progress.",
  },
  {
    icon: (
      <AtomIcon className="h-8 w-8 text-primary group-hover:scale-110 transition" />
    ),
    title: "Describe Your Role",
    desc: "Start by entering your job title and key details. Our AI will use this information to generate a tailored resume structure for you.",
  },
  {
    icon: (
      <Edit className="h-8 w-8 text-primary group-hover:scale-110 transition" />
    ),
    title: "Customize Your Resume",
    desc: "Easily customize your resume by editing sections such as personal details, skills, experience, and education. Make your resume truly yours.",
  },
  {
    icon: (
      <Share2 className="h-8 w-8 text-primary group-hover:scale-110 transition" />
    ),
    title: "Share and Download",
    desc: "Download your finished resume as a PDF or share your unique resume link with employers and friends instantly.",
  },
];

function Home() {
  return (
    <div>
      <Header />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={500}
        ease={120}
        color={"#97dffc"}
        refresh
      />
      <div className="my-10">
        <section className="py-10 px-4 mx-auto max-w-screen-xl flex flex-col items-center justify-center pt-16 pb-8">
          <div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl text-center">
              Build Your Resume <span className="text-primary">With AI</span>
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-8 xl:px-12 text-center">
              Effortlessly Craft a Standout Resume with Our AI-Powered Builder
            </p>
            <div className="my-12 flex items-center justify-center gap-4">
              <a
                href="/dashboard"
                className="flex justify-center items-center py-3 px-5 text-base font-semibold text-center text-white rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 shadow-lg hover:shadow-2xl focus:ring-4 focus:ring-primary-300 transition-all duration-200 hover:-translate-y-1 hover:scale-105"
              >
                Get Started Now 🤍
              </a>
            </div>
            {/* FEATURED IN */}
            <div className="my-24 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg ">
              <span className="font-semibold text-gray-400 uppercase tracking-widest block mb-6">
               Built with technologies
              </span>
              <div className="flex flex-wrap justify-evenly items-center gap-4">
                {featured.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grayscale hover:grayscale-0 group p-4 flex flex-col items-center transition-all duration-200 hover:-translate-y-1 hover:scale-110"
                  >
                    <img
                      src={item.img}
                      alt={item.alt}
                      width={40}
                      height={40}
                      className="mb-2 transition-transform duration-200 group-hover:scale-110"
                    />
                    <span className="text-xs text-gray-500 font-medium group-hover:text-primary transition">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="relative z-10 py-16 px-4 mx-auto max-w-screen-xl text-center">
          <h2 className="font-bold text-3xl mb-2 drop-shadow">How it Works?</h2>
          <h3 className="text-md text-gray-500 mb-10">
            Build your resume in just 4 simple steps
          </h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="group text-left bg-white/80 border border-blue-100 rounded-2xl shadow-md p-8 transition-all duration-200 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/90"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-sky-100 to-indigo-100 mb-4 shadow">
                  {step.icon}
                </div>
                <h2 className="mt-2 text-xl font-bold text-black">
                  {step.title}
                </h2>
                <p className="my-6 text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}
export default Home;
