"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SubjectCard({ subject }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/quiz/${subject.name.toLowerCase().trim()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-4 hover:scale-105 hover:shadow-xl"
    >
      {/* Image Section */}
      <div className="overflow-hidden">
        <Image
          src={subject.image}
          alt={`${subject.name} image`}
          width={400}
          height={600}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-4 bg-gradient-to-b from-white to-gray-50">
        <h2 className="text-3xl font-semibold text-center text-black group-hover:text-blue-600 transition-colors duration-300">
          {subject.name}
        </h2>
        <p className="text-center text-gray-700 text-lg mt-2 group-hover:text-gray-800 transition-colors duration-300">
          {subject.questions.length} Questions
        </p>
      </div>

      {/* Gradient underline */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>

      {/* Border on hover */}
      <div className="absolute top-0 left-0 right-0 bottom-0 border-2 border-transparent group-hover:border-blue-400 transition-all duration-300 ease-in-out"></div>
    </div>
  );
}
