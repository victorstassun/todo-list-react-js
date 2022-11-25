import './App.scss';
import Sidebar from './components/SideBar';
import Home from './Pages/Home';
import FilteredListPage from './Pages/FilteredListPage';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';


function App() {
  const [listItems, setListItems] = useState([])
  const [notStartedItems, setNotStartedItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [finishedItems, setFinishedItems] = useState([]);

    const deleteListItem = (id) => {
        var filtered = listItems.filter((item) => item.id !== id);
        setListItems(filtered || []);
    };

    const addListItem = (listItem) => {
        setListItems([...listItems, listItem])
    }

    useEffect(() => {
      const notStartedItemsList = listItems.filter(item => item.status === 'not-started');
      setNotStartedItems(notStartedItemsList)

      const inProgressItemsList = listItems.filter(item => item.status === 'in-progress');
      setInProgressItems(inProgressItemsList)

      const finishedItemsList = listItems.filter(item => item.status === 'finished');
      setFinishedItems(finishedItemsList)
    }, [listItems]);

  return (
      <section class="container">
        <Router>
        <Sidebar class="sidebar" listItem={listItems} addListItem={addListItem} />
        <div class="pages-container">
          <div class="navbar">
            <Navbar addListItem={addListItem} listItems={listItems} />
          </div>
          <Routes>
            <Route path="/" element={<Home class="pages-content" addListItem={addListItem} deleteListItem={deleteListItem} listItems={listItems} setListItems={setListItems} />} /> 
            <Route path="/not-started" element={<FilteredListPage class="pages-content" filteredItems={notStartedItems} status={"Not started"} />} />
            <Route path="/in-progress" element={<FilteredListPage class="pages-content" filteredItems={inProgressItems} status={"In progress"} />} />
            <Route path="/finished" element={<FilteredListPage class="pages-content" filteredItems={finishedItems} status={"Finished"} />} />
          </Routes>
        </div>
        </Router>
      </section>
  );
}

export default App;
