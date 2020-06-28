# @neogeek/common-react-hooks

[![NPM Version](http://img.shields.io/npm/v/@neogeek/common-react-hooks.svg?style=flat)](https://www.npmjs.org/package/@neogeek/common-react-hooks)

## Install

```bash
$ npm install @neogeek/common-react-hooks
```

## Documentation

### `useFetchJSON`

```javascript
const [response] = useFetchJSON('/ping');
```

```javascript
const [users] = useFetchJSON('/users', {
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

const [userId, setUserId] = useLocalStorage('userId', uuid);
```

### `useSearchParam`

```javascript
const [q, setQ] = useSearchParam('q');
```

### `useUniqueId`

```javascript
const id = useUniqueId();
```

```javascript
const id = useUniqueId('form-field');
```
