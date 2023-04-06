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
];

export default cards;
