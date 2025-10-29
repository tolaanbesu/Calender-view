import React from "react";

interface NowLineProps {
  nowOffset: number;
}

export const NowLine: React.FC<NowLineProps> = ({ nowOffset }) => (
  <div
    className="absolute left-0 right-0 z-20 transition-all duration-100 ease-linear pointer-events-none"
    style={{ top: `${nowOffset}px` }}
    aria-hidden="true"
  >
    <div className="absolute -left-1.5 h-3 w-3 bg-red-600 rounded-full top-[-6px] shadow-lg " />
    <hr className="border-t-2 border-red-600" />
    <span className="absolute top-[-12px] right-2 text-xs text-red-600 font-semibold bg-white px-1 rounded shadow-md">
      Now
    </span>
  </div>
);
