import React,{ useState } from 'react';
import { Link } from 'react-router-dom';

const Form = (props) => {
  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')
  const [number, setNumber] = useState(0)
  const [team, setTeam] = useState('')
  const [birthday, setBirthday] = useState('2019-01-01')
  const [country, setCountry] = useState('')
  const [first, setFirst] = useState(0)
  const [podium, setPodium] = useState(0)
  const [champion, setChampion] = useState(0)
  return (
    <div classNameName="container myForm">
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
        <button
          className="btn btn-success"
          onClick={() => {
            window.location.assign('/')
          }}>新增</button>
        <Link to='/'>
          <button className="btn btn-warning">
            返回
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Form