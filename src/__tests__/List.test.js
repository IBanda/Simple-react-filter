import React from 'react';
import {
  render,
  getByText,
  queryByText,
  queryAllByRole,
} from '@testing-library/react';
import { List, ListItem } from '../List';

const items = [
  { title: 'one', body: 'I am one' },
  { title: 'two', body: 'I am two' },
  { title: 'three', body: 'I am three' },
];

test('search for "one" should render only "one"', () => {
  const value = 'one';
  render(
    <List query={value}>
      {items.map((item) => (
        <ListItem key={item.title} searchattribute={item.title}>
          {item.title}
        </ListItem>
      ))}
    </List>
  );
  expect(getByText(document.documentElement, 'one')).toBeInTheDocument();
  expect(queryByText(document.documentElement, 'two')).not.toBeInTheDocument();
  expect(
    queryByText(document.documentElement, 'three')
  ).not.toBeInTheDocument();
});

test('should filter with array "searchattribute"', () => {
  const value = 'two';
  render(
    <List query={value}>
      {items.map((item) => (
        <ListItem key={item.title} searchattribute={[item.title, item.body]}>
          {item.title}
        </ListItem>
      ))}
    </List>
  );

  expect(getByText(document.documentElement, 'two')).toBeInTheDocument();
  expect(queryByText(document.documentElement, 'one')).not.toBeInTheDocument();
  expect(
    queryByText(document.documentElement, 'three')
  ).not.toBeInTheDocument();
});
test('invalid query should return no result', () => {
  const value = '21312w2e';
  render(
    <List query={value}>
      {items.map((item) => (
        <ListItem key={item.title} searchattribute={item.title}>
          {item.title}
        </ListItem>
      ))}
    </List>
  );
  expect(queryAllByRole(document.documentElement, 'listitem')).toHaveLength(0);
});

function customMethod(searchable, query) {
  return !query || searchable.includes(query);
}

test('using customMethod with valid query should return items', () => {
  const value = 'e';
  render(
    <List customMethod={customMethod} query={value}>
      {items.map((item) => (
        <ListItem key={item.title} searchattribute={item.title}>
          {item.title}
        </ListItem>
      ))}
    </List>
  );

  expect(getByText(document.documentElement, 'one')).toBeInTheDocument();
  expect(getByText(document.documentElement, 'three')).toBeInTheDocument();
  expect(queryByText(document.documentElement, 'two')).not.toBeInTheDocument();
});
