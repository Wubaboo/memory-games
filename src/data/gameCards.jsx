const cards = [
  {
    label: "Numbers",
    alt: "Number Game screenshot",
    caption: "Click the numbers in increasing order",
    imagePath: process.env.PUBLIC_URL + "/assets/numbers.png",
    path: "/numbers/",
  },
  {
    label: "Matching",
    alt: "Matching Game screenshot",
    caption: "Match the pairs of images",
    imagePath: process.env.PUBLIC_URL + "/assets/matching.png",
    path: "/matching/",
  },
  {
    label: "Mosaic",
    alt: "Mosaic Game screenshot",
    caption: "Recreate the pattern",
    imagePath: process.env.PUBLIC_URL + "/assets/mosaic.png",
    path: "/mosaic/",
  },
  {
    label: "Sequences",
    alt: "Sequences Game screenshot",
    caption: "Memorize as many consecutive digits as possible",
    imagePath: process.env.PUBLIC_URL + "/assets/sequence.png",
    path: "/sequence/",
  },
  {
    label: "Minefield",
    alt: "Minefield Game screenshot",
    caption: "Memorize the path to the goal",
    imagePath: process.env.PUBLIC_URL + "/assets/minefield.png",
    path: "/minefield/",
  },
  {
    label: "Food",
    alt: "Food Game screenshot",
    caption: "Memorize the customers' orders",
    imagePath: process.env.PUBLIC_URL + "/assets/food.png",
    path: "/food/",
  },
];

export default cards;
