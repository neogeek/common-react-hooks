const ids = new Map();

const useUniqueId = (prefix = 'id') => {
    const num = ids.get(prefix) || 0;

    ids.set(prefix, num + 1);

    return `${prefix}-${num}`;
};

export default useUniqueId;
