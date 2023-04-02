function getSliderMarks(min, max, step = 1) {
  let marks = [];
  for (let i = min; i <= max; i += step) {
    marks.push({ value: i, label: i });
  }
  return marks;
}

export { getSliderMarks };
