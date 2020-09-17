import React, { useState, useEffect } from 'react';
import './App.css';
import { List, ListItem } from './List';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error)
      .finally(setLoading(false));
  }, []);

  const [value, setValue] = useState('');
  return (
    <div className="App">
      <input
        className="search-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
      />
      {!loading ? (
        <List className={'list'} query={value}>
          {posts.map((post) => (
            <ListItem
              key={post.id}
              className={'list-item'}
              searchattribute={post.title}
            >
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
