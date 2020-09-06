import '@testing-library/jest-dom';

import React from 'react';

import { render } from '@testing-library/react';

import { ids, useUniqueId } from '../hooks/useUniqueId';

beforeEach(() => {
    ids.clear();
});

test('check if unique ID is created', () => {
    const { container } = render(
        <ul>
            <li id={useUniqueId()}>test</li>
            <li id={useUniqueId()}>test</li>
            <li id={useUniqueId()}>test</li>
        </ul>
    );

    const listItems = container.querySelectorAll('li');

    expect(listItems[0].getAttribute('id')).toEqual('id-1');
    expect(listItems[1].getAttribute('id')).toEqual('id-2');
    expect(listItems[2].getAttribute('id')).toEqual('id-3');
});

test('check if unique ID is created with a custom key', () => {
    const { container } = render(
        <ul id={useUniqueId()}>
            <li id={useUniqueId('list')}>test</li>
            <li id={useUniqueId('list')}>test</li>
            <li id={useUniqueId('list')}>test</li>
        </ul>
    );

    const listItems = container.querySelectorAll('li');

    expect(listItems[0].getAttribute('id')).toEqual('list-1');
    expect(listItems[1].getAttribute('id')).toEqual('list-2');
    expect(listItems[2].getAttribute('id')).toEqual('list-3');
});
