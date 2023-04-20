export default function FoodResult({
  customers,
  orders,
  customerStates,
  mistakes,
  getAvatarState,
  setStartGame,
  setWin,
  setCurrentCustomer,
}) {
  return (
    <div className="food-results">
      <div className="food-customer-results">
        {customers.map((c, i) => {
          return (
            <div className="food-customer" key={i}>
              <img
                src={getAvatarState(c, customerStates[i])}
                alt="Customer"
              ></img>
              <div className="food-order">
                {orders[i]?.map((o, j) => (
                  <img key={j} src={o.imagePath} alt={o.name}></img>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p>
        {mistakes === 0
          ? "Nice! You satisfied all your customers!"
          : mistakes === customers.length
          ? "You didn't get any customers' order right!"
          : `You got ${customers.length - mistakes} order${
              customers.length - mistakes === 1 ? "" : "s"
            } correct.`}
      </p>
    </div>
  );
}
