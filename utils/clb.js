module.exports = {
  replaceAll: (w, toReplace, newChar = '') => {
    while (w.includes(toReplace)) w = w.replace(toReplace, newChar)
    return w
  },
}