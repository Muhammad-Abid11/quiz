import React from "react";

export default function Progress({ score, color }) {
  return (
    <div>
      <div class="w-full  rounded-full h-2.5 overflow-hidden border-solid border-2 border-black ">
        <div
          className={` h-2.5 rounded-full `}
          style={{ width: `${score}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}
