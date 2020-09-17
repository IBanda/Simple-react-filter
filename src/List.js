import React from 'react';
import PropTypes from 'prop-types';
import stringFormat from './StringFormat';

export function List({ query, children, className, customMethod }) {
  const listItems = React.Children.toArray(children).filter((child) => {
    const searchable = child.props.searchattribute;
    const queryRegex = new RegExp(query, 'i');
    if (customMethod) {
      return customMethod(searchable, query);
    }
    if (Array.isArray(searchable)) {
      return (
        !stringFormat(query) ||
        searchable.some((string) => queryRegex.test(string))
      );
    }
    return !stringFormat(query) || queryRegex.test(searchable);
  });

  return <ul className={className}>{listItems}</ul>;
}

export function ListItem({ searchattribute, children, className }) {
  return (
    <li className={className} searchattribute={searchattribute}>
      {children}
    </li>
  );
}

List.propTypes = {
  customMethod: PropTypes.func,
  query: PropTypes.string,
  className: PropTypes.string,
};
List.defaultProps = {
  customMethod: null,
};

ListItem.propTypes = {
  className: PropTypes.string,
  searchattribute: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
};
