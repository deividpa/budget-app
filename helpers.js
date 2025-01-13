// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

// Detelete data from local storage
export const deleteData = ({ key }) => {
    localStorage.removeItem(key);
}