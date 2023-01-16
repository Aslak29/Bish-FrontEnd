import React from "react";

const Customer = () => {
  return (
    <div>
      <h5 className="mb-2">Utilisateur Récents :</h5>
      <table className="w-full text-center table-fixed">
        <thead className="bish-bg-blue bish-text-white">
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
          </tr>
        </thead>
        <tbody className="bish-bg-product-detail">
          <tr className="border-b-2">
            <td className="truncate">Cholewa</td>
            <td className="truncate">Alexandre</td>
            <td className="truncate">alexandre@outlook.fr</td>
            <td className="truncate">0683135984</td>
          </tr>
          <tr className="border-b-2">
            <td>Cholewa</td>
            <td>Alexandre</td>
            <td>alexandre@outlook.fr</td>
            <td>0683135984</td>
          </tr>
          <tr className="border-b-2">
            <td>Cholewa</td>
            <td>Alexandre</td>
            <td>alexandre@outlook.fr</td>
            <td>0683135984</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
