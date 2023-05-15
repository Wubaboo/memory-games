function getSliderMarks(min, max, step = 1, labelStep = null) {
  let marks = [];
  for (let i = min; i <= max; i += step) {
    if (labelStep) {
      if (i % labelStep === 0) {
        marks.push({ value: i, label: null });
      } else {
        marks.push({ value: i, label: i });
      }
    } else {
      marks.push({ value: i, label: i });
    }
  }
  return marks;
}

export { getSliderMarks };
