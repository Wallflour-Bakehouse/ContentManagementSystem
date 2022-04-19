import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {url} from '../../../url'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, FormGroup, Label, Input, Col, FormFeedback } from "reactstrap";
import './category_manager.css'

export default function ManageCategory() {

    const token = JSON.parse(localStorage.getItem("profile"))?.token
    const [categories, setCategories] = useState()
    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('3').classList.add('active')
            axios
            .get(url+'/admin/getAllCategories',{
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res)=>{
                if(res.status===200)
                    setCategories(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    }, [])
    return (
        <div className="cat_manager container">
            <div className="heading">Manage Categories</div>
            <Form>
                <FormGroup row>
                    <Label htmlFor="name" lg={2}>Category Name</Label>
                    <Col lg={5} >
                        <Input type="text" id="name" name="name" autoComplete="off" placeholder="Category Name" />
                        {/* <FormFeedback>{errors.name}</FormFeedback> */}
                    </Col>
                    <Col lg={1} style={{display: "grid", placeContent: "center"}}>
                        <div>Length:</div>
                    </Col>
                    <Col lg={3} >
                        <div className="btn_cont">
                            <div className="btn_ btn_small">Add</div>
                        </div>
                    </Col>
                </FormGroup>
            </Form>
            <div className="row">
                {categories?.map(category=>
                    <div className="col-3" key={category._id}>
                        <div className="box">
                            <div className="cat_name">{category.categoryName}</div>
                            <div className="no_dish">Total Dishes: {category.categoryProducts.length}</div>
                            <div className="delete"><FontAwesomeIcon icon={faTrashCan} /></div>
                        </div>
                    </div>    
                )}
            </div>
        </div>
    )
}
