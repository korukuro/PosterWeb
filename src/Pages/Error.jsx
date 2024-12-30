import React from "react";
import { BackgroundLines } from "../components/ui/background-lines";

export function Error() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 -z-10">
      <h2
        className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"
      >
       "{404}" <br /> <p>ERROR!!</p>
      </h2>
    </BackgroundLines>
  );
}
