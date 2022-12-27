# @neogeek/common-react-hooks

[![Tests](https://github.com/neogeek/common-react-hooks/actions/workflows/test.workflow.yml/badge.svg)](https://github.com/neogeek/common-react-hooks/actions/workflows/test.workflow.yml)
[![NPM Version](http://img.shields.io/npm/v/@neogeek/common-react-hooks.svg?style=flat)](https://www.npmjs.org/package/@neogeek/common-react-hooks)

## Install

```bash
$ npm install @neogeek/common-react-hooks
```

## Documentation

### `useDisabledFocus(ref, disabled)`

```typescript
const ExampleFunction = () => {
  const [disabled, setDisabled] = useState(false);

  const ref = useRef<HTMLButtonElement>(null);

  useDisabledFocus(ref, disabled);

  return (
    <button ref={ref} onClick={() => setDisabled(true)}>
      Save
    </button>
  );
};
```

### `useFlash(trigger, [timeoutInMilliseconds = 1000])`

```javascript
const isFlashVisible = useFlash(false);
```
