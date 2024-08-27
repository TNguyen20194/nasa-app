import { useState, useEffect } from 'react';
import Main from "./Components/Main";
import SideBar from "./Components/SideBar";
import Footer from "./Components/Footer";

function App() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  function handleFooterButtonClick() {
    setIsButtonVisible(false); //Hide the button in Footer when clicked
    handleToggleModal() //Close the SideBar
  }

  function handleSideBarClick() {
    setIsButtonVisible(true); //Show the buttin in Footer when the SideBar button is clicked
    handleToggleModal() //Toggle the SideBar
  }

  // fetching data from NASA API
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = process.env.REACT_APP_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

      const today = (new Date()).toDateString();
      //Create a unique key for localStorage based on the current date
      const localKey = `NASA-${today}`;
  
      //Try to retrieve cached data from localStorage using the generated key
      const storedData = localStorage.getItem(localKey);

      //Check if there's cached data available for today
       if(storedData) {
        const apiData = JSON.parse(storedData)
        //Update the current state with the cached data
        setData(apiData)
        console.log('Fetch from cache today')
        //Exit the function early as we have successfully fetched data from cache
        return;
       }
       //Clear all items in localStorage if no cached data is available
       localStorage.clear()

      try {
        const res = await fetch(url);
        const apiData = await res.json();
          // Store the fetched data in localStorage with today's date as the key
        localStorage.setItem(localKey, JSON.stringify(apiData))
        //Update 'data'
        setData(apiData)
        console.log('Fetch from API today')
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAPIData();
  }, []);

  // What the App function returns
  return (
    <>
    {data ? (
      <Main data={data} />): (
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
    )}
    {/* {Conditaionlly renders SideBar if showModal is true} */}
    {showModal && (
      <SideBar data={data} handleSideBarClick={handleSideBarClick} />
      )}
    {/* {Passing props handleToggleModal to the footer, allowing the Footer component to receive the props} */}
    {data && (
      <Footer data={data} handleToggleModal={handleFooterButtonClick} isButtonVisible={isButtonVisible}/>
      )}
    </>
  );
}

export default App;
