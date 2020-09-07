# @neogeek/common-react-hooks

[![Build Status](https://travis-ci.com/neogeek/common-react-hooks.svg?branch=master)](https://travis-ci.com/neogeek/common-react-hooks)
[![codecov](https://codecov.io/gh/neogeek/common-react-hooks/branch/master/graph/badge.svg)](https://codecov.io/gh/neogeek/common-react-hooks)
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

```javascript
const [latest, updateLatest] = useFetchJSON('/latest');

return (
    <div>
        <ul>
            {latest.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>

        <button onClick={updateLatest}>Update Latest</button>
    </div>
);
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
const id = useUniqueId(); // id-1
```

```javascript
const id = useUniqueId('form-field'); // form-field-1
```
