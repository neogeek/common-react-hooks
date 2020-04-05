const useLocalStorage = (key, defaultValueFunc = () => {}) => {
    const value = localStorage.getItem(key);

    if (value) {
        return value;
    }

    const defaultValue = defaultValueFunc();

    localStorage.setItem(key, defaultValue);

    return defaultValue;
};

export default useLocalStorage;
