import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Form = () => {
  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')
  const [number, setNumber] = useState(0)
  const [team, setTeam] = useState('')
  const [birthday, setBirthday] = useState('2019-01-01')
  const [country, setCountry] = useState('')
  const [first, setFirst] = useState(2010)
  const [podium, setPodium] = useState(0)
  const [champion, setChampion] = useState(0)

  // 獲取網址字串
  let getUrl = window.location.href;
  // console.log('myUrl', getUrl)
  let getSec = getUrl.split("?");
  // console.log(getSec);
  let getParams = getSec[1].split("&");
  // console.log(getParams);
  let getMethod = getParams[0].split("=")[1];
  // console.log(getMethod);
  let getId = getParams[1].split("=")[1];
  // console.log('getId', getId);
  // useEffect,[1]限制執行次數
  useEffect(() => {
    if (getMethod === "U" || getMethod === "D"){
      axios({
        method: 'GET',
        baseURL: 'http://localhost:5500',
        url: '/f1/driver/' + getId,
        'Content-Type': 'application/json'
      }).then((result) => {
        let data = result.data
        // console.log(data[0])
        if(data){
          setFname(data[0].First_Name)
          setLname(data[0].Last_Name)
          setNumber(data[0].Number)
          setTeam(data[0].Team)
          setBirthday(data[0].Birthday)
          setCountry(data[0].Country)
          setFirst(data[0].First_Season)
          setPodium(data[0].Podium)
          setChampion(data[0].World_Champion)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },[1])
  // onclick送出
  const send = () => {
    let myData = { 
      "First_Name": fName,
      "Last_Name": lName,
      "Team": team,
      "Number": number,
      "Birthday": birthday,
      "Country": country,
      "First_Season": first,
      "Podium": podium,
      "World_Champion": champion
    }
    if(fName === '') {
      alert('請填寫名字')
      return false
    }
    if(lName === '') {
      alert('請填寫姓氏')
      return false
    }
    if(team === '') {
      alert('請填寫車隊')
      return false
    }
    if(country === '') {
      alert('請填寫出生地')
      return false
    }
    // console.log(myData)
    // 新增
    if(getMethod === 'C') {
      // console.log('C')
      axios({
        method: 'POST',
        baseURL: 'http://localhost:5500',
        url: '/f1/drivers/',
        data: myData,
        'Content-Type': 'application/json'
      }).then((response) => {
        console.log(response)
        window.location.assign('/')
      }).catch((err) => {
        console.log(err)
      })
    } else if(getMethod === 'U') {
      // 修改
      axios({
        method: 'PUT',
        baseURL: 'http://localhost:5500',
        url: '/f1/drivers/' + getId,
        data: myData,
        'Content-Type': 'application/json'
      }).then((response) => {
        console.log(response)
        window.location.assign('/')
      }).catch((err) => {
        console.log(err)
      })
      // console.log('U')
    } else if(getMethod === 'D') {
      // console.log('D')
      // 刪除
      axios({
        method: 'DELETE',
        baseURL: 'http://localhost:5500',
        url: '/f1/drivers/' + getId,
      }).then((response) => {
        console.log(response)
        window.location.assign('/')
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  return (
    <div className="container myForm">
      <h1 className="text-center">F1 Drivers 2019</h1>
      <div className="row mt-3">
        <label className="col-lg-2 col-sm-2 col-4 col-form-label text-right px-0">名字：</label>
        <div className="col-lg-9 col-sm-9 col-7 pl-0">
          <input type="text" className="form-control" value={fName} placeholder="請輸入名字" onChange={(e) => {setFname(e.target.value)}} />
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row mt-3">
        <label className="col-lg-2 col-sm-2 col-4 col-form-label text-right px-0">姓氏：</label>
        <div className="col-lg-9 col-sm-9 col-7 pl-0">
          <input type="text" className="form-control" value={lName} placeholder="請輸入姓氏" onChange={(e) => {setLname(e.target.value)}} />
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row mt-3">
        <label className="col-lg-2 col-sm-2 col-4 col-form-label text-right px-0">車號：</label>
        <div className="col-lg-9 col-sm-9 col-7 pl-0">
          <input type="number" className="form-control" value={number} placeholder="請輸入車號" onChange={(e) => {setNumber(e.target.value)}} />
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row mt-3">
        <label className="col-lg-2 col-sm-2 col-4 col-form-label text-right px-0">車隊：</label>
        <div className="col-lg-9 col-sm-9 col-7 pl-0">
          <input type="text" className="form-control" value={team} placeholder="填寫車隊名字喔！" onChange={(e) => {setTeam(e.target.value)}} />
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row mt-3">
        <label className="col-lg-2 col-sm-2 col-4 col-form-label text-right px-0">生日：</label>
        <div className="col-lg-9 col-sm-9 col-7 pl-0">
          <input type="date" className="form-control" value={birthday} onChange={(e) => {setBirthday(e.target.value)}} />
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row mt-3">
        <label className="col-lg-2 col-sm-2 col-4 col-form-label text-right px-0">出生地：</label>
        <div className="col-lg-9 col-sm-9 col-7 pl-0">
          <input type="text" className="form-control" value={country} placeholder="請輸入出生地" onChange={(e) => {setCountry(e.target.value)}} />
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row mt-3">
        <label className="col-lg-2 col-sm-2 col-4 col-form-label text-right px-0">首個賽季：</label>
        <div className="col-lg-9 col-sm-19 col-7 pl-0">
          <input type="number" className="form-control" value={first} placeholder="你的第一個賽季" onChange={(e) => {setFirst(e.target.value)}} />
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row mt-3">
        <label className="col-lg-2 col-sm-2 col-4 col-form-label text-right px-0">頒獎台次：</label>
        <div className="col-lg-9 col-sm-9 col-7 pl-0">
          <input type="number" className="form-control" value={podium} placeholder="您上頒獎台的次數" onChange={(e) => {setPodium(e.target.value)}} />
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row mt-3">
        <label className="col-lg-2 col-sm-2 col-4 col-form-label text-right px-0">世界冠軍：</label>
        <div className="col-lg-9 col-sm-9 col-7 pl-0">
          <input type="number" className="form-control" value={champion} placeholder="您奪得了幾次世界冠軍" onChange={(e) => {setChampion(e.target.value)}} />
        </div>
        <div className="col-1"></div>
      </div>
      <div className="myBtn text-center">
        {(() => {
          // console.log('id', getMethod, getId)
          if(getMethod === 'U') {
            return (
              <button
                className="btn btn-success"
                onClick={send}>修改
              </button>
            )
          } else if(getMethod === 'D') {
            return (
              <button
                className="btn btn-success"
                onClick={send}>刪除
              </button>
            )
          }
          return (
            <button
              className="btn btn-success"
              onClick={send}>新增
            </button>
          )
        })()}
        {/* <button
          className="btn btn-success"
          onClick={() => {
            window.location.assign('/')
          }}>新增
        </button> */}
        <Link to='/' className="btn btn-warning">
          返回
        </Link>
      </div>
    </div>
  )
}
export default Form