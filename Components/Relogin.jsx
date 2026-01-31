import React from "react";

function Relogin() {
  return (
    <div class="bg-gray-100 h-screen w-screen font-sans flex flex-col items-center rounded-2xl">
      <div class="bg-white px-30 flex flex-col items-center rounded-xs shadow-2xl mt-1">
        <p>The System could not log you on.</p>
        <p>Make sure that Caps Lock is not accidentally on.</p>
        <a class="text-blue-500" href="/">
          Re Login
        </a>
      </div>
    </div>
  );
}

export default Relogin;
