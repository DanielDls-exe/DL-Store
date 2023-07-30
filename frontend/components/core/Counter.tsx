"use client";

import { useState } from "react";

export const Counter = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <button
      onClick={increment}
      tw="p-4 border border-slate-200 text-slate-500 uppercase"
    >
      Incrementar + {counter}
    </button>
  );
};
