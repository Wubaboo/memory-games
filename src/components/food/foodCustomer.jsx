import { getAvatar } from "../../utils/characterGen";

export default function FoodCustomer({ seed, state, artDetails, foods }) {
  function getAvatarState(seed, state) {
    if (state === "neutral")
      return getAvatar(artDetails.code, seed, artDetails.neutral);
    else if (state === "happy")
      return getAvatar(artDetails.code, seed, artDetails.happy);
    else if (state === "angry")
      return getAvatar(artDetails.code, seed, artDetails.angry);
  }

  return (
    <div className="food-customer">
      <img src={getAvatarState(seed, state)} alt="Neutral Character"></img>
    </div>
  );
}
