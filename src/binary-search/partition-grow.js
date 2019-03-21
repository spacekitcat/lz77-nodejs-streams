export default (from, to, parentSize, expected) => {
  if (to < parentSize - 1 && to >= from) {
    let diff = parentSize - to;
    return to + Math.round(diff / 2);
  }

  return null;
};
