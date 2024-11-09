import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useState , useEffect } from 'react'
import './project.css'

// Todo list.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus  } from '@fortawesome/free-solid-svg-icons/faPlus';

const getData = () => {
  const list = localStorage.getItem("todolist");
  if (list) {
    return JSON.parse(list);
  }
  else {
    return [];
  }
}
const Do = () => {
  const [data, setData] = useState("");
  const [dataModify, setDataModify] = useState("");
  const [dataList, setDataList] = useState(getData());
  const [toggle, setToggle] = useState(true);
  const addItem = () => {
    if (!data) {
      alert("Fill the data");
    }
    else  if (data && !toggle ) {
      setDataList(
        dataList.map((curelem) => {
          if (curelem.id === dataModify) {
            return { ...curelem, name: data };
          }
          return curelem;
        })
      )
      setData("");
      setToggle("true");
    }
    else {
      const newTo = {
        id: new Date().getTime().toString(),
        name: data,
      };
      setDataList([...dataList, newTo]);
      setData("");
    }
  }
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(dataList));
  }, [dataList]);

  const deleteItem = (curelem) => {
    const newList = dataList.filter((e) => {
      return curelem.id !== e.id;
    });
    setDataList(newList);
  }

  const modifyItem = (index) => {
    const New_data = dataList.find((curelem) => {

      return curelem.id === index.id;
        });
    setData(New_data.name);
    setToggle(false);
    setDataModify(index.id);
  }

  return (
    <div className='my-5 p-3'>
      <h1 className="text-center mt-3  text-danger"> Todo list </h1>
      <div className=' mx-auto p-1 d-flex bord widt rounded-3'>
        <input type='text' id='input' value={data} className='fs-3 border-0 focus-ring' onChange={(e) => { setData(e.target.value) }} placeholder='✍️ Add items...' ></input>
        {toggle ?
          <button className='border-0 '><FontAwesomeIcon onClick={addItem} className="fs-2" icon={faPlus}></FontAwesomeIcon></button> : <button className='border-0 '><FontAwesomeIcon onClick={addItem} className="fs-2" icon={faEdit}></FontAwesomeIcon></button>}
      </div>
      <br />

      {dataList.map((curelem, index) => {
        return (
          <div className=' mx-auto my-2 p-1 d-flex bord widt rounded-3' key={index}>
            <h2 className='widt2 px-2 py-1'>{curelem.name}</h2>
            <button className='border-0 px-2' onClick={() => { modifyItem(curelem) }}><FontAwesomeIcon className="fs-2" icon={faEdit}></FontAwesomeIcon></button>
            <button className='border-0 px-2' onClick={() => { deleteItem(curelem) }}><FontAwesomeIcon className="fs-2" icon={faTrash}></FontAwesomeIcon></button>
          </div>
        )
      })}

      <br />
      <div className=' mx-auto p-1 d-flex widt rounded-3'>
        <button className='btn btn-success fs-3 p-2 px-4' onClick={() => { setDataList([]) }}>Check list</button>
      </div>
    </div>
  )
}

export default Do;


