import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {url} from '../../../url'
import { faTrashCan, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, FormGroup, Label, Input, Col } from "reactstrap";
import './preference_manager.css'


export default function ManagePrefernce() {

    const token = JSON.parse(localStorage.getItem("profile"))?.token
    const [newPreference, setNewPreference] = useState({
        id: "",
        preferenceName: "",
        image: ""
    })
    const [currentPreference, setCurrentPreference] = useState()
    const [prefernces, setPreferences] = useState()

    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('3').classList.add('active')
        axios
        .get(url+'/preference/')
        .then((res)=>{
            if(res.status===200)
                setPreferences(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [])

    function handleChange(e){
        setNewPreference({...newPreference, [e.target.name]: e.target.value})
    }
    function resetForm(){
        setNewPreference({id: "", preferenceName: "", image: ""})
    }

    function setInput(name,id,image){
        setCurrentPreference(name)
        setNewPreference({id: id, preferenceName: name,image: image })
    }

    function submitForm(){
        if(newPreference.id!=''){
            try{
                axios
                .put(url+'/admin/updatePreference/'+newPreference.id, {
                    categoryName: newPreference.preferenceName,
                    image: newPreference.image
                },{
                    headers: { "authorization": `Bearer ${token}` }
                })
                .then(()=>{
                    window.location.reload()
                })
                .catch((error)=>{
                    alert("Error: "+error.response.data.message)
                })
            } catch(error){
                console.log(error)
            }
        } else{
            try{
                axios
                .post(url+'/admin/new_preference',{
                    preferenceName: newPreference.preferenceName,
                    image: newPreference.image
                },{
                    headers: { "authorization": `Bearer ${token}` }
                })
                .then((res)=>{
                    window.location.reload()
                })
                .catch((error)=>{
                    alert("Error: "+error.response.data.message)
                })
            } catch(error){
                console.log(error)
            }
        }
    }
    
    function deletePreference(id){
        try{
            axios
            .delete(url+'/admin/deletePreference/'+id,{
                headers: { "authorization": `Bearer ${token}` }
            })
            .then((res)=>{
                window.location.reload()
            })
            .catch((error)=>{
                alert("Error: "+error.response.data.message)
            })
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div className="pref_manager container">
            <div className="heading">Manage Prefernces</div>
            {currentPreference ? (<h5 className='mb-4'>Editing: {currentPreference}</h5>):(<></>)}
            <Form>
                <FormGroup row>
                    <Label htmlFor="name" lg={2}>Preference Name</Label>
                    <Col lg={5} >
                        <Input type="text" id="preferenceName" name="preferenceName" autoComplete="off" placeholder="Preference Name" value={newPreference.preferenceName} onChange={handleChange} />
                    </Col>
                    <Col lg={1} style={{display: "grid", placeContent: "center"}}>
                    <div className={newPreference.preferenceName.length>25 ? 'error':" "}>Length: {newPreference.preferenceName.length}</div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="name" lg={2}>Image</Label>
                    <Col lg={10} >
                        <Input type="text" id="image" name="image" autoComplete="off" placeholder="Image URL" value={newPreference.image} onChange={handleChange} />
                    </Col>
                    <Col lg={2}></Col>
                        <Col lg={9}>
                            <a href="https://wallflour-bakeho.imgbb.com/" style={{paddingTop: "10px"}} target="_blank">Click To Upload Pictures</a>
                        </Col>
                    <Col lg={12} >
                        <div className="btn_cont m-3" onClick={submitForm}>
                            <div className="btn_ btn_small">Add</div>
                        </div>
                    </Col>
                </FormGroup>
            </Form>
            <div className="row mt-5">
                {newPreference.id!=="" ?
                    (<div className="col-12 mb-5" onClick={resetForm}>
                        <div className="box add_new_cat">
                            <div className="cat_name">Click Here To Add a New Category</div>
                        </div>
                    </div>):(<></>)
                }
                {prefernces?.map(preference=>
                    <div className="col-6 col-md-3 col-lg-2" key={preference._id}>
                        <div className="pref_card" style={{backgroundImage: `url(${preference.image})`}}>
                            <div className="overlay">{preference.preferenceName}</div>
                            <div className="edit" onClick={()=>setInput(preference.preferenceName, preference._id, preference.image)}><FontAwesomeIcon icon={faPenSquare} /></div>
                            <div className="delete" onClick={()=>deletePreference(preference._id)}><FontAwesomeIcon icon={faTrashCan} /></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
