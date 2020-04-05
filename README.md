# @neogeek/common-react-hooks

## Install

```bash
$ npm install neogeek/common-react-hooks
```

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

### `useLocalStorage`

```javascript
import { v4 as uuid } from 'uuid';

const userId = useLocalStorage('userId', uuid);
```

### `useSearchParam`

```javascript
const q = useSearchParam('q');
```

### `useUniqueId`

```javascript
const id = useUniqueId();
```

```javascript
const id = useUniqueId('form-field');
```
