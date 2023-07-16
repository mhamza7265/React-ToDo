import React from 'react';
import { useState } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import DeleteIcon from './DeleteIcon';
import CheckIcon from './CheckIcon';
import SearchIcon from './SearchIcon';
import RefreshIcon from './RefreshIcon';
import PlusIcon from './PlusIcon';

const App = () => {
  const [listData, setListData] = useState("");
  const [list, setList] = useState([]);
  const [searchTerm , setSearchTerm] = useState("");
  const [searchedData , setSearchedData] = useState([]);
  const [current , setCurrent] = useState([]);
  const [completed , setCompleted] = useState([]);
  const [select , setSelect] = useState("");
  const [err , setErr] = useState(false);

  const DeletePost = (btn) =>{
    let idx = btn.getAttribute('id');
    let idxx = Number(idx);
    let index = list.map(function(obj){return obj.id}).indexOf(idxx);
    let newlist = list.slice();
    newlist.splice(index,1);
    setList(newlist);
    let cur = list.at(index);
    let currarr = current.slice();
    currarr.unshift(cur);
    setCurrent(currarr);
  }

  const DeletePost2 = (btn) =>{
    let idxz = btn.getAttribute('id');
    let idxxx = Number(idxz);
    let indexx = current.map(function(objj){return objj.id}).indexOf(idxxx);
    let curr = current.slice();
    console.log(current);
    console.log(idxxx)
    console.log(indexx)
    curr.splice(indexx , 1)
    setCurrent(curr);
    let cur = current.at(indexx);
    let currarr = completed.slice();
    currarr.unshift(cur);
    setCompleted(currarr);   
  }

  const DeletePost3 = (btn) =>{
    let idz = btn.getAttribute('id');
    let idzz = Number(idz);
    console.log(idzz)
    let indexz = completed.map(function(obj){return obj.id}).indexOf(idzz);
    let complete = completed.slice();
    complete.splice(indexz, 1)
    setCompleted(complete);
  }

  const TodoStructure = ({index , id , content}) => {
    let d = new Date();
    let y = d.getFullYear();
    let m = d.getMonth();
    let day = d.getDate();
    return(
      <div className="row" id={id}>
        <p className="sr-no">{index+1}</p>
        <input className="content" defaultValue={content}/>
        <p className='date'>{day + '-' + m}</p>
        <button className="dlt-btn" onClick={(e) => DeletePost(e.target.parentNode)}>{'\u2713'}</button>
      </div>
    )
  }

  const TodoStructureTwo = ({index , id , content}) => {
    return(
      <div className="row" id={id}>
        <p className="sr-no">{index+1}</p>
        <input className="content" defaultValue={content}/>
      </div>
    )
  }

  const TodoStructureThree = ({index , id , content}) => {
    let d = new Date();
    let y = d.getFullYear();
    let m = d.getMonth();
    let day = d.getDate();
    return(
      <div className="row" id={id}>
        <p className="sr-no">{index+1}</p>
        <input className="content" defaultValue={content}/>
        <p className='date'>{day + '-' + m}</p>
        <button className="dlt-btn" onClick={(e) => DeletePost2(e.target.parentNode)}>{'\u2713'}</button>
      </div>
    )
  }

  const TodoStructureFour = ({index , id , content}) => {
    let d = new Date();
    let y = d.getFullYear();
    let m = d.getMonth();
    let day = d.getDate();
    return(
      <div className="row" id={id}>
        <p className="sr-no">{index+1}</p>
        <input className="content" defaultValue={content}/>
        <p className='date'>{day + '-' + m}</p>
        <button className="dlt-btn" onClick={(e) => DeletePost3(e.target.parentNode)}>{'\u2421'}</button>
      </div>
    )
  }

  const handleClick = (search) => {
    const listid = Math.floor(Math.random() * 1000000);
    const obj = {id:listid, text:search};
    const lists = list.slice();
    listData != "" ? lists.unshift(obj):null;
    setList(lists);
    setListData("");
  };
  const searchhandleClick = (searchdata) => {
    var selectt;
    if(select == "list"){
      selectt = list;
    }else if(select == "current"){
      selectt = current;
    }else{
      selectt = completed;
    }
    let search = searchdata;
    let newarr = selectt.filter(function(el){
      return el.text == search;
    })
    setSearchedData(newarr);
    newarr.length == 0 ? setErr(true) : setErr(false);
    if(searchdata == 0){
      setErr(false);
      setSearchTerm("");
    };
  }

  const NotFound = () => {
    return <h5 className='n-found'>Not Found</h5>
  }

  return(
    <div className="app">
      <div className='title'>
        <h3>To-Do List</h3>
      </div>
      <div className='flex'>
        <div className='input-field-div'>
          <h5>ADD TO LIST</h5>
          <div className="input-field">
            <input placeholder='Enter Notes....' value={listData} onChange={(e) => setListData(e.target.value)}/>
            <button onClick={() => handleClick(listData)}>{PlusIcon()}</button>
          </div>
          <h5>SEARCH</h5>
          <div className='input-field-2'>
            <select className='select' defaultValue="" value={select} onChange={e => setSelect(e.target.value)}>
              <option value=""></option>
              <option value="list">Tasks To Do</option>
              <option value="current">Tasks In Progress</option>
              <option value="completed">Tasks Completed</option>
            </select>
            <input placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button onClick={() => searchhandleClick(searchTerm)}>{SearchIcon()}</button>
            <button onClick={() => searchhandleClick(0)}>{RefreshIcon()}</button>
          </div>
          <div className='search-div'>
            {searchedData != "" && <h5>{searchedData.length} TASK{searchedData.length > 1 ? "S": null} FOUND</h5>}
            {searchedData.map((item, key) => (
              <TodoStructureTwo index={key} id={item.id} content={item.text}/>
              ))}
            {err == true? <NotFound/>  : null}
          </div>
        </div>
        <div className='container-div'>
          <h5>{list.length == 0? "NO":list.length} TASK{list.length > 1 ? "S": null} TO DO</h5>
          <div className="container">
            <div className='inner'>
              {list.map((item, key) => (
                <TodoStructure index={key} id={item.id} content={item.text}/>
                ))}
            </div>
          </div>
        </div>
        <div className="container2-div">
          <h5>{current.length == 0? "NO":current.length} TASK{current.length > 1 ? "S": null} IN PROGRESS</h5>
          {current.map((item, key) => (
            <TodoStructureThree index={key} id={item.id} content={item.text}/>
          ))}
        </div>
        <div className="container3-div">
          <h5>{completed.length == 0? null:completed.length} TASK{completed.length > 1 ? "S": null} COMPLETED {completed.length == 0? "(Empty)":null}</h5>
            {completed.map((item, key) => (
              <TodoStructureFour index={key} id={item.id} content={item.text}/>
            ))}
        </div>
              
      </div>
    </div>
  )
}

export default App;