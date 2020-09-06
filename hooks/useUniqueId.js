export const ids = new Map();

export const useUniqueId = (prefix = 'id') => {
    const num = (ids.get(prefix) || 0) + 1;

    ids.set(prefix, num);

    return `${prefix}-${num}`;
};
