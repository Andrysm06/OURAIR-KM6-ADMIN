import React from "react";

const Card = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-3xl">{value}</p>
    </div>
  );
};

export default Card;
