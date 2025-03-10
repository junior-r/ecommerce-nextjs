import Navbar from "@/components/pages/navbar";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative z-10 flex flex-col items-center gap-4 text-center mx-auto">
          <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
            Fresh From Farm to Your Table
          </h1>
          <p className="max-w-[700px] text-white md:text-xl">
            Discover premium quality agricultural products sourced directly from
            local farmers.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-gray-500 hover:text-black dark:text-white dark:hover:text-black hover:bg-white dark:hover:bg-white border-white"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
