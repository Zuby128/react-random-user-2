import { useState, useEffect } from "react";
import "./App.css";
import emailSvg from "./assets/email.svg";
import phoneSvg from "./assets/phone.svg";
import locationSvg from "./assets/location.svg";
import axios from 'axios'
import zuber from './assets/zuberlogo.png'

function App() {
  const [user, setUser] = useState();
  const [arr, setArr] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios.get("https://randomuser.me/api/")
      .then(res => setUser(res?.data?.results))
  }

  const addUser = () => {
    setArr(arr => [...arr, user[0]]);
    getUser();
  }


  // const getUser = () => {
  //   fetch("https://randomuser.me/api/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUser(data.results);
  //       console.log(data.results);
  //     });
  // };

  return (
    <div className="App mb-5">
      {user?.map((item, index) => (
        <div key={index} className="card-wrapper">
          <div>
            <img width="50px" src={zuber} alt="zuberman logo" />
          </div>
          <div className="header-container">
            <img src={item?.picture?.large} alt="user" />
            <p className="header">
              {item?.name?.title} {item?.name?.first} {item?.name?.last}
            </p>
          </div>
          <div className="par-container">
            <img src={emailSvg} alt="" className="icon" />
            <p className="par">{item?.email}</p>
          </div>

          <div className="par-container">
            <img src={phoneSvg} alt="" className="icon" />
            <p className="par">{item?.cell}</p>
          </div>
          <div className="par-container">
            <img src={locationSvg} alt="" className="icon" />
            <p className="par">
              {item?.location?.city} - {item?.location?.country}
            </p>
          </div>
          <p> Age: {item.dob.age}</p>
          <p>Register Date: {item?.registered?.date.substr(0, 10)}</p>
        </div>
      ))}
      <div>
        <button onClick={getUser} className="btn btn-primary mr-3">Random User</button>
        <button onClick={addUser} className="btn btn-warning ml-3">Add User</button>
      </div>

      <div className="last-div">
        {arr.length > 0 && <div className="card w-75">
          <table className="table table-borderless m-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {arr.map((item, i) => (
                <tr key={i}>
                  <td>{item?.name?.title} {item?.name?.first} {item?.name?.last}</td>
                  <td>{item?.email}</td>
                  <td>{item?.cell}</td>
                  <td>{item?.location?.city} - {item?.location?.country}</td>
                  <td><button className="btn btn-danger" onClick={() => {
                    const reducedArray = [...arr]
                    reducedArray.splice(i, 1)
                    setArr(reducedArray)
                    }}>del</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
      </div>
    </div>
  );
}

export default App;
