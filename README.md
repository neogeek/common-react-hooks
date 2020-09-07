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

#### Simple Usage

```javascript
const [response] = useFetchJSON('/ping');
```

#### Custom Headers

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

#### Force Update

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

#### String

```javascript
const [username, setUsername] = useLocalStorage('scott');
```

#### Function

```javascript
import { v4 as uuid } from 'uuid';

const [userId, setUserId] = useLocalStorage('userId');
```

#### Object

```javascript
const [settings, setSettings] = useLocalStorage('settings', { darkMode: true });
```

### `useSearchParam`

```javascript
const [q, setQ] = useSearchParam('q');
```

### `useUniqueId`

#### Default Key

```javascript
const id = useUniqueId(); // id-1
```

#### Custom Key

```javascript
const id = useUniqueId('form-field'); // form-field-1
```
