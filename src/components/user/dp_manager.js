import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {url} from '../../url'
import { faTrashCan, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, FormGroup, Label, Input, Col } from "reactstrap";


export default function DpManager() {
    
    const token = JSON.parse(localStorage.getItem("profile"))?.token
    const [newDP, setNewDP] = useState({
        id: "",
        dp: ""
    })
    const [currentDP, setCurrentDP] = useState()
    const [dps, setDPs] = useState()

    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('6').classList.add('active')
        axios
        .get(url+'/user/getAllDp')
        .then((res)=>{
            setDPs(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [])

    function handleChange(e){
        setNewDP({...newDP, [e.target.name]: e.target.value})
    }
    function resetForm(){
        setCurrentDP("")
        setNewDP({id: "", dp: ""})
    }

    function setInput(id,image,i){
        setCurrentDP("DP "+(i+1))
        setNewDP({id: id, dp: image })
    }

    function submitForm(){
        if(newDP.dp.length===0) return alert("Display Picture URL Can Not Be Empty")
        if(newDP.id!=''){
            try{
                axios
                .put(url+'/admin/updateDP/'+newDP.id, {
                    dp: newDP.dp
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
                .post(url+'/admin/addDp',{
                    dp: newDP.dp
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
            .delete(url+'/admin/deleteDp/'+id,{
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
            <div className="heading">Manage Display Picture</div>
            {newDP.id ? (<div className="delete" onClick={()=>deletePreference(newDP.id)}><FontAwesomeIcon icon={faTrashCan} /></div>):(<></>)}
            {currentDP ? (<h5 className='mb-4'>Editing: {currentDP}</h5>):(<></>)}
            <Form>
                <FormGroup row>
                    <Label htmlFor="name" lg={2}>Display Picture</Label>
                    <Col lg={10} >
                        <Input type="text" id="dp" name="dp" autoComplete="off" placeholder="Image URL" value={newDP.dp} onChange={handleChange} />
                    </Col>
                    <Col lg={2}></Col>
                        <Col lg={10}>
                            <a href="https://wallflour-bakeho.imgbb.com/" style={{paddingTop: "10px"}} target="_blank">Click To Upload Pictures</a>
                        </Col>
                    <Col lg={12} >
                        <div className="btn_cont m-3" >
                        <div className="btn_ btn_small" onClick={submitForm}>{newDP.id ? "Update":"Add"}</div>
                        </div>
                    </Col>
                </FormGroup>
            </Form>
            <div className="row mt-5">
                {newDP.id!=="" ?
                    (<div className="col-12 mb-5" onClick={resetForm}>
                        <div className="box add_new_cat">
                            <div className="cat_name">Click Here To Add a New Display Picture</div>
                        </div>
                    </div>):(<></>)
                }
                {dps?.map((dp,i)=>
                    <div className="col-6 col-md-3 col-lg-2 mt-3" key={dp._id}>
                        <div className="pref_card" style={{backgroundImage: `url(${dp.dp})`}} onClick={()=>setInput(dp._id, dp.dp, i)}></div>
                    </div>
                )}
            </div>
        </div>
    )
}
