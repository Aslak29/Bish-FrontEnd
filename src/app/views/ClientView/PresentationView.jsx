import React from "react";
import presentationSVG from "../../assets/images/undraw_team_collaboration_re_ow29_1.svg";
import logo from "../../assets/images/logoBish_3.svg";
import {Helmet} from "react-helmet";

const PresentationView = () => {
  return (
    <div className="flex justify-center items-center flex-col w-3/4 m-auto mt-16 mb-20">
      <Helmet>
        <title>Bish - Qui sommes-nous ?</title>
        <meta name="description" content="Nous sommes Bish, Nous sommes une entreprise de vente de vêtements en ligne français" />
      </Helmet>
      <div>
        <h1 className="flex justify-center text-3xl">Qui sommes-nous ?</h1>
        <br />
        <div className="flex justify-center flex-col md:flex-row mb-10">
          {" "}
          <img className=" h-8 my-auto " src={logo} alt="Connexion" />
          <span className=" text-center sm:text-xl my-auto">est une entreprise de vente de vêtements en ligne français</span> 
        </div>
      </div>
      <div className="flex justify-center items-center flex-col lg:flex-row">
        <img
          className="sm:block lg:w-1/2 mb-10 lg:mb-0 pr-10 pl-10"
          src={presentationSVG}
          alt="Connexion"
        />
        <div className="">
          <p className="text-xl text-center">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            provident earum? Sequi, ullam illo tempore rem corporis id,
            explicabo asperiores esse aut et earum, vero eligendi magnam?
            Consequatur, perspiciatis autem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PresentationView;
