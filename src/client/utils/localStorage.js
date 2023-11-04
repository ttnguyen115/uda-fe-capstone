const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

const setItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
