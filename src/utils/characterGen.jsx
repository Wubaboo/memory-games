const artStyles = [
  {
    name: "Default",
    code: "avataaars",
    neutral: [
      "eyebrows=default,defaultNatural,flatNatural",
      "eyes=default,happy,squint,surprised",
      "mouth=serious",
    ],
    happy: [
      "eyebrows=raisedExcited,raisedExcitedNatural,unibrowNatural",
      "eyes=hearts",
      "mouth=default,smile",
    ],
    angry: [
      "eyebrows=angry,angryNatural,sadConcerned",
      "eyes=closed,cry,eyeRoll,side,squint,surprised,xDizzy",
      "mouth=concerned,disbelief,grimace,sad,screamOpen,vomit",
    ],
  },
  {
    name: "Pixel Art",
    code: "pixel-art",
    neutral: [
      "eyes=variant01,variant05,variant06,variant09,variant10,variant11",
      "mouth=happy01,happy02,happy03,happy04,happy05,happy12,happy13,sad04,sad05,sad06,sad07",
    ],
    happy: [
      "eyes=variant01,variant05,variant06,variant09,variant10,variant11",
      "mouth=happy06,happy09",
    ],
    angry: ["mouth=sad01,sad02,sad03,sad08,sad09"],
  },
  //   { name: "Black White", code: "notionists" },
  //   { name: "Crazy", code: "croodles" },
];

function getAvatar(style, seed, options) {
  const baseURI = `https://api.dicebear.com/6.x/${style}/svg?seed=${seed}`;
  return baseURI + "&" + options.join("&");
}

export { artStyles, getAvatar };
