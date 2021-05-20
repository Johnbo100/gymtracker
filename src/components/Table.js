import React, { useState, useEffect } from 'react';
import '../App.css';
import firebase from '../firebase';
import Update from './Update'
import { FiDelete } from 'react-icons/fi';
import { AiOutlineEdit } from 'react-icons/ai';
import { Bar } from 'react-chartjs-2';


const Table = () => {
    const [lists, setLists] = useState([])
    //used to hold the id for document updating
    const [updateId, setUpdateId]=useState()
    const [updateDate, setUpdateDate]=useState()
    const [edit,setEdit]=useState(false)
    const [recs, setRecs] = useState(0)  
    const [abs,setAbs] = useState(0)  
    const [chest,setChest] = useState(0)
    const [back,setBack] = useState(0)
    const [traps,setTraps] = useState(0)
    const [bi,setBi] = useState(0)
    const [tri,setTri] = useState(0)
    const [hams,setHams] = useState(0)
    const [quads,setQuads] = useState(0)
    const [calves,setCalves] = useState(0)
    const [daysSince, setDaysSince] = useState(0)
    const [weight,setWeight]=useState([])

    useEffect(() => {
       firebase
        .firestore()
        .collection("exercises")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot => {
          const lists = snapshot.docs.map(doc => ({          
            id: doc.id,
            ...doc.data(), 
                
          }))

          setLists(lists)
          setRecs(lists.length)
          setAbs(lists.filter((list) => list.abs === true).length)
          setChest(lists.filter((list) => list.chest === true).length)
          setBack(lists.filter((list) => list.back === true).length)
          setTraps(lists.filter((list) => list.traps === true).length)
          setBi(lists.filter((list) => list.biceps === true).length)
          setTri(lists.filter((list) => list.triceps === true).length)
          setHams(lists.filter((list) => list.hams === true).length)
          setQuads(lists.filter((list) => list.quads === true).length)
          setCalves(lists.filter((list) => list.calves === true).length)
          setDaysSince(getRatios)
          
      })
  }, [])

  const handleOnDelete = id => {
      console.log("This is the id: "+id)
    firebase
      .firestore()
      .collection("exercises")
      .doc(id)
      //.delete()
  } 
  
  const handleOnUpdate=(e)=>{
    console.log("This is the id: "+e.target.name)
    setUpdateId(e.target.name)
    setUpdateDate(e.target.value)
    setEdit(true)
    setEdit(!edit)

  }


  const getRatios = () =>{
    const now = new Date();
    const startdate = new Date(2020,8,9);
    let difference = now - startdate;
    let millisecondsDay = 1000 * 60 * 60 * 24;
    let tdays = Math.ceil(difference / millisecondsDay);
    console.log('rendering getratios')
    return tdays
    
  }
  
  
  
    
    return (
            
        <div className="listTable">
          <div className="queries">
            <div><h1><b>There are {recs} Records and {daysSince} of potential workout days</b></h1>
            
          </div>
          <Bar
            data = {{
              labels:['abs','chest','back','bi','tri','quads','hams','calves','quads','traps'],
              
              
              datasets:[{
                label:'Muscle',
                data:[abs,chest,back,bi,tri,quads,hams,calves,quads,traps], 
                backgroundColor:['green','blue','orange','red','yellow','purple','pink','white','black','brown'],
                borderColor: "rgba(219, 0, 0, 1)"
              },
              {
                label:'Muscle2',
               
              }

              ],
            }}
            height={200}
            width={900}
            options={{ 
              maintainAspectRatio: true,
               
            }}
          />

</div> 

          
            <table>
              <th>Comments</th>
              <th>Abs</th>  
              <th>Back</th>
              <th>Bi</th>
              <th>Cal</th>
              <th>Che</th>
              <th>Delts</th>
              <th>Fore</th>
              <th>Hams</th>
              <th>Quads</th>
              <th>Traps</th>
              <th>Tris</th>
              <th>Date</th>
              <th>Cig</th>
              <th>Skip</th>
              <th>Tread</th>
              <th>Loc</th>
              <th>Hum</th>
              <th>Temp</th>
              <th>KG</th>
              <th>Ox</th>
              <th>bpm</th>
            {lists.map(list => {   
              
                return (
                    <tr>
                        <td><textarea value={list.com}>{list.com}</textarea></td>
                        <td><input type="checkbox" name="abs" checked={list.abs} /></td>
                        <td><input type="checkbox" checked={list.back}/></td>
                        <td><input type="checkbox" checked={list.biceps}/></td>
                        <td><input type="checkbox" checked={list.calves}/></td>
                        <td><input type="checkbox" checked={list.chest}/></td>
                        <td><input type="checkbox" checked={list.delts}/></td>
                        <td><input type="checkbox" checked={list.forearms}/></td>
                        <td><input type="checkbox" checked={list.hams}/></td>
                        <td><input type="checkbox" checked={list.quads}/></td>
                        <td><input type="checkbox" checked={list.traps}/></td>
                        <td><input type="checkbox" checked={list.triceps}/></td>
                        <td>{list.date}</td>
                        <td><input type="text" value={list.cigs}/></td>
                        <td><input type="text" value={list.skip}/></td>
                        <td><input type="text" value={list.tread}/></td>
                        <td><input type="text" value={list.loc}/></td>
                        <td><input type="text" value={list.hum}/></td>
                        <td><input type="text" value={list.temp}/></td>
                        <td><input type="text" value={list.weight}/></td>
                        <td><input type="text" value={list.ox}/></td>
                        <td><input type="text" value={list.bpm}/></td>

                        <td><button onClick={() => handleOnDelete(list.id)}><FiDelete /></button></td>
                        <td><button className="editBtn" name={list.id}value={list.date} onClick={handleOnUpdate}><AiOutlineEdit /></button></td>
                    </tr>
                        )  
                })}   
             {edit && <Update Id={updateId} Date={updateDate}/>}           
            </table>       
        
        </div>
        
    )
}



export default Table;