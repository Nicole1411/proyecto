import React from "react";
import "../App.css";
import {Link} from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc, updateDoc,deleteDoc,doc,query,where,onSnapshot} from "firebase/firestore";
import { async } from "@firebase/util";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import Swal from "sweetalert2";

function Home(){

    const [newName, setNewName]= useState("");
    const [newLastName, setNewLastName]= useState("");
    const [newMail, setNewMail]= useState("");
    const [newAge, setNewAge]= useState(0);
    const [users, setUsers] = useState([]);
    
    const[busqueda,setBusqueda]=useState("");

    const usersCollectionRef = collection (db,"users");


    const updateUser = async(id, age,name,lastname,mail) => {
        Swal.fire({title: "Usuario ",
        text:" Editar el siguiente usuario",
        /*html: '<p>Nombres: <input id="swal-input1" class="swal2-input" value="'+name+'"></p>'
        + '<p>Apellidos :<input id="swal-input1" class="swal2-input" value="'+lastname+'"></p>',    */
        html:'<div className="CreateUser" class="container">'
        +'<div class="row">'
        +'<div class="form-group col-md-6">'
        +'Nombres:'
        +'<input type="text" class="form-control" id="domTextElement1"  value="'+name+'"/>'
        +'</div>'
        +'<div class="form-group col-md-6">'
        +'Apellidos:'
        +'<input type="text" class="form-control" id="domTextElement2"  value="'+lastname+'" }}/>'
        +'</div>'
        +'<div class="form-group col-md-6">'
        +'Ingrese la Edad:'
        +'<input type="number" class="form-control" id="domTextElement3"  value="'+age+'"/></div>'
        +'<div class="form-group col-md-6">'
        +'Ingrese el Correo:'
        +'<input type="text" class="form-control"id="domTextElement4"  value="'+mail+'"/>'
        +' </div>'
        +' </div>' 
        +'</div>'  ,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar'
        }).then((result) => {
            if (result.isConfirmed) {
                let namenew = document.querySelector("#domTextElement1").value; 
                let lastnamenew = document.querySelector("#domTextElement2").value; 
                let agenew = document.querySelector("#domTextElement3").value; 
                let mailnew = document.querySelector("#domTextElement4").value; 
                const userDoc = doc(db,"users",id);
                const newFields ={age:agenew,name: namenew,lastname:lastnamenew,mail:mailnew};
                 updateDoc(userDoc,newFields);
                Swal.fire(
                'Usuario Actualizado',
                'El usuario a sido Actualizado Correctamente.',
                'success',
                '7000'
                )
                setTimeout(function(){
                    window.location.href='./Home';
                },1000);
            }
            });
    };
 
    const deleteUserButton =async(id) =>{
        swal({
            title:" ELIMINAR USUARIO",
            text:" ¿Esta seguro que desea eliminar este usuario?",
            icon: "warning",
            buttons: ["No","Si"]
            }).then(respuesta=>{
            if(respuesta){
                deleteUser(id);
                //window.location.href='./Home';
            }else{
                //window.location.href='./Home';
            }
            });
    }
    
    const handleChange=e=>{
        setBusqueda (e.target.value);
        filtrar(e.target.value);
    }

    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=users.filter((elemento)=>{
          if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          || elemento.lastname.toString().toLowerCase().includes(terminoBusqueda.toLowerCase() )
          ){
            return elemento;
          }
        });
        setUsers(resultadosBusqueda);
      }

    const deleteUser = async(id) =>{
      const userDoc = doc(db,"users",id);
     
      swal({text:"El usuario se elimino con exito",icon:"success",timer:"6000"});
      await deleteDoc(userDoc);
      window.location.href='./Home';
    }
      
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({...doc.data(),id: doc.id })))
    };
    
    useEffect(() => {   
        getUsers();
      }, []);
      

    return(
        <div className="App" class="container">
            <div class="row">    
                <div class="col-md-8">
                    <button type="button" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        <Link to="/createuser" class="Link" >&nbsp;&nbsp;Crear Candidato&nbsp;</Link></button>
                </div>
                <div class="col-md-4 col-md-offset-4">
                <div class="input-group">
                    <div class="form-outline">
                    <input type="search" class="form-control inputBuscar"  placeholder="Apellido"  name="busquemotiv" value={busqueda} list="list-timezone" id="BusquedaId"  onChange={handleChange}></input>
                    <datalist id="list-timezone" >
                    {users.map((user)=> { 
                        return (
                            <option value={user.lastname}>{user.lastname}</option>
                        );
                    })}
                    </datalist>
                    </div>
                    <button type="button" class="btn btn-info"/* onClick={()=>{
                        searchUser("Steven","Mosquera");
                        }}*/ 
                        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> 
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                    </div>
                </div>
            </div>
            <br></br> 
            <table class="table  table-responsive ">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Edad</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>

            <tbody>
            {users &&
            users.map((user)=> {
                return (
                
                    <tr>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.mail}</td>
                    <td>{user.age}</td>
                    <td><button type="button" class="btn btn-success" onClick={()=>{
                        updateUser(user.id,user.age,user.name,user.lastname,user.mail);
                    }}
                    > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                        &nbsp; Editar  &nbsp;
                    </button> &nbsp; &nbsp;
                    <button type="button" class="btn btn-danger" onClick = {() => {
                        deleteUserButton(user.id);
                    }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                        &nbsp;Eliminar&nbsp;
                    </button>
                    </td>
                    </tr>
                
                ); 
            })}
            </tbody>
            </table>
        </div>
    );
}

export default Home;