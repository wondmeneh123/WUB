import React from "react";

const Cart = ({ cart }) => {
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="p-4">
      <h2>Cart</h2>
      <div className="grid grid-cols-2 gap-4">
        {cart.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <img src={item.image} width={200} className="rounded-2xl" />
            <p className="text-md ml-2 my-1">
              {item.price}
              <b> Br</b>
            </p>
          </div>
        ))}
      </div>
      <p className="text-md ml-2 my-1">
        Total: {getTotal()}
        <b> Br</b>
      </p>
    </div>
  );
};

export default Cart;
