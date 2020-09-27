export const  randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export const getKeyByValue = (object, value)  => {
  return Object.keys(object).find(key => object[key] === value);
}
