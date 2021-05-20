import React, { useState } from 'react';
import '../App.css';
import firebase from '../firebase';
import { GrDocumentUpdate } from 'react-icons/gr';

const Update = (props) => {
    console.log("Current props id: "+props.Id)
    const fullDate = new Date(props.Date).toDateString();
    const[activity,setActivity]=useState([])   
    console.log(props.Id, " ",fullDate)   
    const postValues = (e) => {
        e.preventDefault()
        let postvals = activity
        firebase
        .firestore()
        .collection("exercises")
        .doc(props.Id)
        .update(
            postvals
        ).then(function() {
            console.log("Document successfully written!"+activity)
            document.getElementById('editForm').style.display ='none';
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        })
    
    };

    //for checkbox values
    const updateField = e => {
        setActivity({
          ...activity,
          [e.target.name]: e.target.checked
        });
      };

    //For non checkbox values
      const updateField2 = e => {
        setActivity({
          ...activity,
          [e.target.name]: e.target.value
        });
      };

      const closeForm=()=>{
        document.getElementById('editForm').style.display ='none';
      }
    return (
        <div id="editForm">
            <div>
            <button onClick={closeForm}>Close</button>
            <h4>EDIT YOUR WORKOUT</h4>
            <h4>DATE:{fullDate}</h4>
            </div>
            <form onSubmit={postValues}>
              <div>
                <input type="date" name="date" onChange={updateField2}/>
                <input type="checkbox" checked={activity.back} name="back" onChange={updateField}/>Back
                <input type="checkbox" name="chest" onChange={updateField}/>Chest
                <input type="checkbox" name="biceps" onChange={updateField}/>Biceps
                <input type="checkbox" name="triceps" onChange={updateField}/>Triceps
                <input type="checkbox" name="forearms" onChange={updateField}/>FArms
                <input type="checkbox" name="quads" onChange={updateField}/> Quads
                <input type="checkbox" name="hams" onChange={updateField}/>Hams
                <input type="checkbox" name="calves" onChange={updateField}/>Calves
                <input type="checkbox" name="abs" onChange={updateField}/>Abs
                <input type="checkbox" name="delts" onChange={updateField}/>Delts
                <input type="checkbox" name="traps" onChange={updateField}/>Traps
              </div>
              <div>
                <select name="tread" onChange={updateField2}>Tread
                <option>0</option>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                    </select>
                Skipping:<select name="skip" onChange={updateField2}>
                    <option>0</option>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                    </select>
                Cigs:<select name="cigs" onChange={updateField2}>
                    <option>0</option>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>20+</option>
                    </select>
                Location:<select name="loc" onChange={updateField2}>
                    <option>gym</option>
                    <option>home</option>
                    <option>park</option>
                    </select>
                    <input type="number" name="weight" min='80' max='120' onChange={updateField}/>Weight
                Comments:<textarea name="com" onChange={updateField2}></textarea>
              </div>
              <div>
                <button type="submit"><GrDocumentUpdate /> Update record</button>
              </div>
            </form>
            </div>
    )
};

export default Update;