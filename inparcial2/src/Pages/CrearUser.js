import React from "react";
import "../App.css";
import {Link} from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc, updateDoc,deleteDoc,doc} from "firebase/firestore";
import { async } from "@firebase/util";
import { useState, useEffect } from "react";
import swal from "sweetalert";

function CrearUser(){
    const [newName, setNewName]= useState("");
    const [newLastName, setNewLastName]= useState("");
    const [newMail, setNewMail]= useState("");
    const [newAge, setNewAge]= useState(0);
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection (db,"users");

    const createUser = async() => {
      await addDoc(usersCollectionRef,{name: newName, lastname: newLastName, age: Number(newAge),mail: newMail});
      swal({
        title:" USUARIO GUARDADO",
        text:" Se ha guardado Correctamente el usuario",
        icon: "success",
        buttons: ["Registrar otro Usuario","Aceptar"]
      }).then(respuesta=>{
        if(respuesta){
            window.location.href='./Home';
        }else{
            document.getElementById("form").value="";
        }
      });
    // document.getElementById("form").value="";
      
    };

    const regresar=()=>{
        window.location.href='./Home';
    };

    return(
        <div class="container">
            <div class="row">
                <h4 class="font-weight-light">Ingrese los siguientes datos:</h4>
                <div class="form-group col-md-6">
                    <p class="font-weight-light">Ingrese los Nombres:</p>
                    <input type="text" class="form-control" placeholder="Nombre..." id="form"
                    onChange={(event)=>{
                        setNewName(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group col-md-6">
                    <p class="font-weight-light">Ingrese los Apellidos:</p>
                    <input type="text" class="form-control" placeholder="Apellido ..." id="form"
                    onChange={(event)=>{
                        setNewLastName(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group col-md-4">
                    <br/>
                    <p class="font-weight-light">Ingrese la Edad:</p>
                    <input type="number" class="form-control" placeholder="Edad ..." id="form"
                    onChange={(event)=>{
                        setNewAge(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group col-md-8">
                    <br></br>
                    <p class="font-weight-light">Ingrese el Correo:</p>
                    <input type="mail" class="form-control" placeholder="xxxx@gmail.com" id="form"
                    onChange={(event)=>{
                        setNewMail(event.target.value);
                    }}
                    />
                </div>
            </div>
            <hr/>
            <div class="container-fluid h-100"> 
                <div class="row w-100 align-items-center">
                    <button type="button" class="btn btn-success" onClick={createUser}> Guardar</button> &nbsp; &nbsp;
                    <button type="button" class="btn btn-info Link" onClick={regresar}> Regresar</button>
                </div>
            </div>
        </div>
    );
}

export default CrearUser;