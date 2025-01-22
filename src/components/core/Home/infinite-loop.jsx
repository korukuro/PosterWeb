import React from "react";
const InfiniteLoop = () => {
  const texts = [
    "Hello",
    "World",
    "How",
    "Are",
    "You",
    "Doing",
    "Today",
    "?",
    "money",
    "money",
    "$",
    "Hello",
    "World",
    "How",
    "Are",
    "You",
    "Doing",
    "Today",
    "?",
    "money",
    "money",
    "$",
  ];

  return (
    <div className="flex overflow-hidden bg-black h-40 items-center">
      <ul className="flex animate-infinite-scroll gap-10 py-4 text-white">
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
