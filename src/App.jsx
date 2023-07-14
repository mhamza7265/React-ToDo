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

  const DeletePost = (btn) =>{
    let idx = btn.target.parentNode.getAttribute('id');
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
    let idxz = btn.target.parentNode.getAttribute('id');
    let idxxx = Number(idxz);
    let indexx = current.map(function(objj){return objj.id}).indexOf(idxxx);
    let curr = current.slice();
    curr.splice(indexx , 1)
    setCurrent(curr);
    let cur = current.at(indexx);
    let currarr = completed.slice();
    currarr.unshift(cur);
    setCompleted(currarr);   
  }

  const DeletePost3 = (btn) =>{
    let idz = btn.target.parentNode.getAttribute('id');
    let idzz = Number(idz);
    let indexz = completed.map(function(obj){return obj.id}).indexOf(idzz);
    let complete = completed.slice();
    complete.splice(indexz, 1)
    setCompleted(complete);
  }

  const TodoStructure = ({index , id , content}) => {
    return(
      <div className="row" id={id}>
        <p className="sr-no">{index+1}</p>
        <input className="content" defaultValue={content}/>
        <button className="dlt-btn" onClick={(e) => DeletePost(e)}>{CheckIcon()}</button>
      </div>
    )
  }

  const TodoStructure2 = ({index , id , content}) => {
    return(
      <div className="row" id={id}>
        <p className="sr-no">{index+1}</p>
        <input className="content" defaultValue={content}/>
      </div>
    )
  }

  const TodoStructure3 = ({index , id , content}) => {
    return(
      <div className="row" id={id}>
        <p className="sr-no">{index+1}</p>
        <input className="content" defaultValue={content}/>
        <button className="dlt-btn" onClick={(e) => DeletePost2(e)}>{CheckIcon()}</button>
      </div>
    )
  }

  const TodoStructure4 = ({index , id , content}) => {
    return(
      <div className="row" id={id}>
        <p className="sr-no">{index+1}</p>
        <input className="content" defaultValue={content}/>
        <button className="dlt-btn" onClick={(e) => DeletePost3(e)}>{DeleteIcon()}</button>
      </div>
    )
  }

  const handleClick = (search) => {
    const listid = list.length;
    const obj = {id:listid, text:search};
    const lists = list.slice();
    listData != "" ? lists.push(obj):null;
    setList(lists)
  };
    
  const searchhandleClick = () => {
    let search = searchTerm;
    let newarr = list.filter(function(el){
      return el.text == search;
    })
    setSearchedData(newarr);
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
            <input placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button onClick={() => searchhandleClick()}>{SearchIcon()}</button>
            <button onClick={() => setSearchTerm("")}>{RefreshIcon()}</button>
          </div>
        </div>
        <div className='container-div'>
          <h5>{list.length == 0? "NO":list.length} TASKS TO DO</h5>
          <div className="container">
            <div className='inner'>
              {searchTerm == ""? (list.map((item, key) => (
                <TodoStructure index={key} id={item.id} content={item.text}/>
                ))):searchedData.map((item, key) => (
                <TodoStructure2 index={key} id={item.id} content={item.text}/>
                ))}
            </div>
          </div>
        </div>
        <div className="container2-div">
          <h5>{current.length == 0? "NO":current.length} TASKS IN PROGRESS</h5>
          {current.map((item, key) => (
            <TodoStructure3 index={key} id={item.id} content={item.text}/>
          ))}
        </div>
        <div className="container3-div">
          <h5>{completed.length == 0? null:completed.length} TASKS COMPLETED {completed.length == 0? "(Empty)":null}</h5>
            {completed.map((item, key) => (
              <TodoStructure4 index={key} id={item.id} content={item.text}/>
            ))}
        </div>
              
      </div>
    </div>
  )
}

export default App;