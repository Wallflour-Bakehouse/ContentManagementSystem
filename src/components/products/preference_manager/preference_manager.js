import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {url} from '../../../url'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, FormGroup, Label, Input, Col, FormFeedback } from "reactstrap";
import './preference_manager.css'


export default function ManagePrefernce() {

    const token = JSON.parse(localStorage.getItem("profile"))?.token
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

    return (
        <div className="pref_manager container">
            <div className="heading">Manage Prefernces</div>
            <Form>
                <FormGroup row>
                    <Label htmlFor="name" lg={2}>Preference Name</Label>
                    <Col lg={5} >
                        <Input type="text" id="name" name="name" autoComplete="off" placeholder="Preference Name" />
                        {/* <FormFeedback>{errors.name}</FormFeedback> */}
                    </Col>
                    <Col lg={1} style={{display: "grid", placeContent: "center"}}>
                        <div>Length:</div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="name" lg={2}>Image</Label>
                    <Col lg={10} >
                        <Input type="text" id="name" name="name" autoComplete="off" placeholder="Image URL" />
                        {/* <FormFeedback>{errors.name}</FormFeedback> */}
                    </Col>
                    <Col lg={12} >
                        <div className="btn_cont m-3">
                            <div className="btn_ btn_small">Add</div>
                        </div>
                    </Col>
                </FormGroup>
            </Form>
            <div className="row mt-5">
                {prefernces?.map(preference=>
                    <div className="col-6 col-md-3 col-lg-2" key={preference._id}>
                    <div className="pref_card">
                        <img src={preference.image} alt="" />
                        <div className="text">
                            {preference.preferenceName}
                        </div>
                        <div className="delete"><FontAwesomeIcon icon={faTrashCan} /></div>
                    </div>
                </div>)}
            </div>
        </div>
    )
}
