import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
        About One Parasol
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
        One Parasol is a platform that helps individuals and businesses simplify
        their finance, legal, and tax complexities by connecting them with
        top-rated professionals.
        <br />
        <br />
        Our mission is to make expert guidance easily accessible whether you need
        personal finance advice, business consulting, legal assistance, or tax
        planning.
        <br />
        <br />
        We carefully vet and select professionals to ensure you receive the
        highest quality service tailored to your unique needs.
        <br />
        <br />
        At One Parasol, we believe that everyone deserves access to expert advice
        to help them achieve their goals and navigate life's challenges with
        confidence.
        <br />
        <br />
        Join us on our journey to simplify your life and empower your decisions
        with trusted expertise under one roof.
        <br />
        <br />
        <strong>Your One Stop Solution for Finance, Legal, and Tax Needs!</strong>
      </p>

      <p className="mt-6 text-lg text-gray-800 dark:text-gray-200">
        Visit our{" "}
        <Link
          href="/offerings"
          className="text-indigo-5000 dark:text-indigo-400 hover:underline"
        >
          Offerings
        </Link>
      </p>
    </div>
  );
}
