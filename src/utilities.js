export const  randomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export const getKeyByValue = (object, value)  => {
  return Object.keys(object).find(key => object[key] === value);
}

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
