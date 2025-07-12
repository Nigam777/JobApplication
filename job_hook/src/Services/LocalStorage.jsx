const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  const getItem = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };
  
  const removeItem = (key) => {
    localStorage.removeItem(key);
  };
  
  export { setItem, getItem, removeItem };
  