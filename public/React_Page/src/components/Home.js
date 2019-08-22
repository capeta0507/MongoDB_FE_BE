import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Home = () =>{
  // var f1Data = [];
  const [f1Data, setF1Data] = useState([])
  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: 'http://localhost:5500',
      url: '/f1/drivers',
      'Content-Type': 'application/json'
    }).then((result) => {
      setF1Data(result.data)
    }).catch((err) => {
      console.log(err)
    })
  },[])
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 center">
          <h1>F1 Drivers 2019</h1>
          <div id="myDiv">
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Team</th>
                  <th scope="col">Number</th>
                  <th scope="col">
                    功能 
                    <Link to='/Form?method=C&id=00000' className="btn btn-success btn-sm">
                      新增 + 
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody id='myDriver'>
                {(() => {
                  if (f1Data) {
                    return f1Data.map((data, idx) => {
                      // console.log(data)
                      let id = idx + 1
                      let driverId = data._id
                      console.log(driverId)
                      return (
                        <tr key={idx}>
                          <th scope="row">{id}</th>
                          <td>{data.Last_Name}</td>
                          <td>{data.Team}</td>
                          <td>{data.Number}</td>
                          <td>
                            <Link to={`/Form?method=U&id=${driverId}`} className='btn btn-primary btn-sm'>
                              修改
                            </Link>
                            <Link to={`/Form?method=D&id=${driverId}`} className='btn btn-danger btn-sm'>
                              刪除
                            </Link>
                          </td>
                        </tr>
                      )
                    })
                  }
                })()}
              </tbody>
            </table>
          </div>
          <div id="message"></div>
        </div>
      </div>
    </div>
  )
}
export default Home