import React from "react";
import { Helmet } from "react-helmet-async";
import TailleComponent from "../../components/layouts/TailleComponent";

const ProductView = () => {
  return (
    <div className='w-3/4 m-auto'>
      <Helmet>
        <title>Bish - Inscription</title>
        <meta
          name="description"
          content="Creer votre compte bish, pour pouvoir commander tout les produits que vous aimez à tout moment !"
        />
      </Helmet>
      <div>ProductDetailView</div>
      <div>
        <TailleComponent />
      </div>
    </div>
  );
};

export default ProductView;
