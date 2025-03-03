"use client";

import { useEffect, useState } from "react";
import SubjectCard from "@/components/SubjectCard";

export default function Home() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch("/data/questions.json");
      if (response.ok) {
        const data = await response.json();
        setSubjects(data.subjects);
        console.log(data);
      } else {
        console.error("Failed to fetch subjects");
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="p-8 sm:p-14 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-semibold text-blue-800 mb-6 text-center">
        Welcome to the Programming Quiz App
      </h1>
      <p className="text-xl text-gray-700 mb-10 text-center sm:text-left">
        Select a subject to get started and test your knowledge!
      </p>
      <div className="w-full max-w-screen-lg">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-16">
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <SubjectCard key={subject.name} subject={subject} />
            ))
          ) : (
            <p className="text-lg text-center text-gray-500 animate-pulse">
              Loading subjects...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
