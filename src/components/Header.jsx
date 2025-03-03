"use client";

import { FaCoins } from "react-icons/fa6";
import Link from "next/link";
import { usePoints } from "@/context/PointsContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { points } = usePoints();
  const [clientPoints, setClientPoints] = useState(null);

  useEffect(() => {
    setClientPoints(points);
  }, [points]);

  if (clientPoints === null) {
    return null;
  }

  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-4 px-8 flex flex-col lg:flex-row justify-between items-center shadow-xl rounded-lg">
      <Link
        href="/"
        className="text-3xl sm:text-4xl font-extrabold text-white hover:text-yellow-400 transition-colors duration-300 tracking-wide text-center lg:text-left sm:flex-wrap"
      >
        Programming Quiz
      </Link>

      <div className="flex items-center space-x-4 mt-4 lg:mt-0 text-lg font-semibold">
        <FaCoins className="text-yellow-400 text-3xl sm:text-4xl" />
        <div className="flex flex-col items-end">
          <span className="text-gray-200">Points</span>
          <span className="text-xl sm:text-2xl font-bold text-blue-200">
            {clientPoints}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
