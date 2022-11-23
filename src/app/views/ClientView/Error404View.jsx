import React from "react";
import error from "../../assets/images/error.gif";
import {Helmet} from "react-helmet-async";

const Error404View = () => {
  return (
    <div className="m-auto my-12 text-xl container-404 flex flex-col space-y-14 place-items-center bg-white border-solid border-2 rounded-3xl bish-border-gray sm:mt-20 w-3/4">
        <Helmet>
            <title>Bish - Erreur 404</title>
        </Helmet>
      <h1 className="text-lg bish-text-gray font-extrabold mt-10 sm:text-5xl">
        Error 404
      </h1>
      <p className="text-base bish-text-blue font-bold text-center text-2xl md:text-xl sm:text-base sm:mx-10">
        La page que vous demandez n'existe pas
      </p>
      <img
        src={error}
        alt="gif je suis perdu"
        className="mb-10 m-auto rounded-b-3xl"
      />
    </div>
  );
};

export default Error404View;
