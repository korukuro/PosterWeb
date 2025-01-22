import React from "react";
const InfiniteLoop = () => {
  const texts = [
    "|",
    "EAST",
    "OR",
    "WEST",
    "POSTERWEB",
    "IS",
    "BEST",
    "|",
    "BUDGET",
    "FRIENDLY",
    "PLUS",
    "GREAT",
    "QUALITY",
  ];

  return (
    <div className="flex overflow-hidden bg-black h-40 items-center">
      <ul className="flex animate-infinite-scroll gap-10 py-4 text-white text-5xl">
        {[...texts, ...texts].map((text, idx) => {
          return (
            <li key={idx} className="text-white">
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InfiniteLoop;
