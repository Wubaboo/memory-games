import { useState, useEffect } from "react";
export default function FoodCustomer({
  seed,
  state,
  artDetails,
  order,
  getAvatarState,
}) {
  const [animate, setAnimate] = useState(false);
  const [fade, setFade] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    async function sleep(time) {
      await new Promise((r) => setTimeout(r, time));
      setAnimate(true);
      setFade(false);
    }
    setAnimate(false);
    setShowOrder(false);
    setFade(true);
    sleep(1000);
  }, [seed]);

  const customerStyle = {
    animationName: animate ? "move-customer" : fade ? "fade-customer" : null,
    animationDuration: animate ? "2s" : fade ? "0.25s" : null,
    animationFillMode: "forwards",
  };

  return (
    <div
      className="food-customer"
      style={customerStyle}
      onAnimationEnd={() => {
        setShowOrder(true);
      }}
    >
      <img src={getAvatarState(seed, state)} alt="Neutral Character"></img>
      {showOrder && (
        <div className="food-order">
          {order?.map((o, i) => (
            <img key={i} src={o.imagePath} alt={o.name}></img>
          ))}
        </div>
      )}
    </div>
  );
}
