import { useState, useEffect } from 'react';
import Main from "./Components/Main";
import SideBar from "./Components/SideBar";
import Footer from "./Components/Footer";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  // fetching data from NASA API
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = process.env.REACT_APP_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
      try {
        const res = await fetch(url);
        const apiData = await res.json();
        setData(apiData)
        console.log('DATA\n', apiData)
      } catch (err) {
        console.log(err.message);
      }
    }
    // fetchAPIData();
  }, []);

  // What th App function returns
  return (
    <>
    {data ? (<Main />): (
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
    )}
    {/* {Conditaionlly renders SideBar if showModal is true} */}
    {showModal && (<SideBar handleToggleModal={handleToggleModal} />)}
    {/* {Passing props showModal to the footer, allowing the Footer component to receive the props} */}
    {data && (<Footer handleToggleModal={handleToggleModal}/>)}
    </>
  );
}

export default App;
