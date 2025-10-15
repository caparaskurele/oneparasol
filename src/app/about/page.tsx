import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
        About One Parasol
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
        One Parasol is a platform that helps individuals and businesses address
        their finance, legal, and tax complexities.
        <br />
        <br />
        Our mission is to make expert-level guidance easily accessible from
        personal finance, setting up of a new business, business consulting for expanding existing business, 
        legal assistance, to tax planning.
        <br />
        <br />
        We have a strong team of professionals to ensure you receive the
        highest quality service tailored to your specific needs.
        <br />
        <br />
        At One Parasol, we believe that everyone deserves access to expert advice
        to help them achieve their goals and deal all the challenges with
        confidence.
        <br />
        <br />
        
      </p>

      <p className="mt-6 text-lg text-gray-800 dark:text-gray-200">
        Click here to visit our{" "}
        <Link
          href="/offerings"
          className="text-indigo-600 dark:text-indigo-400 font-bold underline hover:opacity-90"
        >
          Offerings page
        </Link>
      </p>
    </div>
  );
}
