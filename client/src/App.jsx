import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import ItemsList from './pages/ItemsList';
import ItemDetails from './pages/ItemDetails';
import CreateItem from './pages/CreateItem';
import EditItem from './pages/EditItem';

const App = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this crewmate?')) return;
    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  let element = useRoutes([
    { path: '/', element: <ItemsList items={items} onDelete={handleDelete} /> },
    { path: '/item/:id', element: <ItemDetails onDelete={handleDelete} /> },
    { path: '/new', element: <CreateItem onCreated={fetchItems} /> },
    { path: '/edit/:id', element: <EditItem onUpdated={fetchItems} /> },
    { path: '/*', element: <h2 style={{ textAlign: 'center', marginTop: '50px' }}>404 Not Found</h2> }
  ]);

  return (
    <div className="App">
      <header>
        <div className="header-container">
          <div className="header-left">
            <h1>Crewmate Builder</h1>
          </div>
          <div className="header-right">
            <Link to="/"><button className="homeBtn">Gallery</button></Link>
            <Link to="/new"><button className="addBtn">+ New Crewmate</button></Link>
          </div>
        </div>
      </header>

      <main>{element}</main>
    </div>
  );
};

export default App;