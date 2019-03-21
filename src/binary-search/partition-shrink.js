export default (from, to) => {
  if (to > from) {
    const diff = to - from;
    return to - Math.round(diff / 2);
  }

  return null;
};
