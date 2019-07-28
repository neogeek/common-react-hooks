# @neogeek/common-react-hooks

## Documentation

### `useFetchJSON`

```javascript
const data = useFetchJSON('/ping');
```

```javascript
const data = useFetchJSON('/users', {
    method = 'GET',
    body = null,
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});
```

### `useUniqueId`

```javascript
const id = useUniqueId();
```

```javascript
const id = useUniqueId('form-field');
```
