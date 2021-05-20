import React, { useState } from 'react';
import Table from './Table';
import firebase from '../firebase';
const Form = () => {

    const[activity,setActivity]=useState({
        date:Date.now(),
        timestamp:Date.now(),
        back:false,
        chest:false,
        biceps:false,
        triceps:false,
        forearms:false,
        quads:false,
        hams:false,
        calves:false,
        abs:false,
        delts:false,
        traps:false,
        tread:0,
        skip:0,
        cigs:0,
        com:"",
        weight:"",
        loc:"gym",
        ox:"",
        bpm:""
    });
    const postValues = (e) => {
        e.preventDefault()
        let postvals = activity
        console.log(postvals)
        firebase
        .firestore()
        .collection("exercises")
        .add(
            postvals
        ).then(function() {
            console.log("Document successfully written!")
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
    return (
        <div >
            ADD YOUR WORKOUT
            <form   onSubmit={postValues}>
                <div className="addForm">
                <input type="date" name="date" onChange={updateField2}/>
                <input type="checkbox" checked={activity.back} name="back" onChange={updateField}/><b>Back</b>
                <input type="checkbox" name="chest" onChange={updateField}/><b>Chest</b>
                <input type="checkbox" name="biceps" onChange={updateField}/><b>Biceps</b>
                <input type="checkbox" name="triceps" onChange={updateField}/>Triceps
                <input type="checkbox" name="forearms" onChange={updateField}/>Forearms
                <input type="checkbox" name="quads" onChange={updateField}/>Quads
                <input type="checkbox" name="hams" onChange={updateField}/>Hamstrings
                <input type="checkbox" name="calves" onChange={updateField}/>Calves
                <input type="checkbox" name="abs" onChange={updateField}/>Abs
                <input type="checkbox" name="delts" onChange={updateField}/>Deltoids
                <input type="checkbox" name="traps" onChange={updateField}/>Traps
                </div>
                <div className="addForm">
                <b>Treadmill:</b><select name="tread" onChange={updateField2}>    
                    <option>0</option>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                    <option>30</option>
                    <option>35</option>
                    <option>40</option>
                    </select>
                <b>Skipping:</b><select name="skip" onChange={updateField2}>
                    <option>0</option>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                    </select>
                <b>Cigs:</b><select name="cigs" onChange={updateField2}>
                    <option>0</option>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>20+</option>
                    </select>
                <b>Location:</b><select name="loc" onChange={updateField2}>
                    <option></option>
                    <option>gym</option>
                    <option>home</option>
                    <option>park</option>
                    </select>
                    Temp<input type="number" min="10" max="40" name="temp" onChange={updateField2}/> 
                    Hum<input type="number" min="20" max="100" name="hum" onChange={updateField2}/>  
                    Weight<input type="number" min="80" max="120" name="weight" onChange={updateField2}/> 
                    Ox<input type="number" min="90" max="100" name="ox" onChange={updateField2}/>
                    bpm<input type="number" min="50" max="100" name="bpm" onChange={updateField2}/>
                    Comments:<textarea name="com" onChange={updateField2}></textarea>
                    <button type="submit">Add record</button>
                </div>
            </form>
        <Table />
        </div>
    );
};

export default Form;