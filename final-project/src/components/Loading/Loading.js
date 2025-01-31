import React from "react";
import "./loading.scss";

// Loading Componenti internet üzerinden alınmıştır. Bu projede kullanılmıştır.

function Loading() {
  return (
    <div className="loading">
      <div id="loader">
        <div className="ls-particles ls-part-1"></div>
        <div className="ls-particles ls-part-2"></div>
        <div className="ls-particles ls-part-3"></div>
        <div className="ls-particles ls-part-4"></div>
        <div className="ls-particles ls-part-5"></div>
        <div className="lightsaber ls-left ls-green"></div>
        <div className="lightsaber ls-right ls-red"></div>
      </div>
    </div>
  );
}

export default Loading;
