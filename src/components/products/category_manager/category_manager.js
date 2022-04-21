import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {url} from '../../../url'
import { faTrashCan, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, FormGroup, Label, Input, Col, FormFeedback } from "reactstrap";
import './category_manager.css'

export default function ManageCategory() {

    const token = JSON.parse(localStorage.getItem("profile"))?.token
    const [newCategory, setNewCategory] = useState({
        id: "",
        categoryName: ""
    })
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

    function handleChange(e){
        setNewCategory({...newCategory, categoryName: e.target.value})
    }
    function resetForm(){
        setNewCategory({id: "", categoryName: ""})
    }

    function setInput(name,id){
        setNewCategory({id: id, categoryName: name})
    }

    function submitForm(){
        if(newCategory.id!=''){
            try{
                axios
                .put(url+'/admin/updateCategory/'+newCategory.id, {
                    categoryName: newCategory.categoryName
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
                .post(url+'/admin/new_category',{
                    categoryName: newCategory.categoryName
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
    
    function deleteCategory(id){
        try{
            axios
            .delete(url+'/admin/deleteCategory/'+id,{
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
        <div className="cat_manager container">
            <div className="heading">Manage Categories</div>
            <Form>
                <FormGroup row>
                    <Label htmlFor="name" lg={2}>Category Name</Label>
                    <Col lg={5} >
                        <Input type="text" id="category" name="category" autoComplete="off" placeholder="Category Name" value={newCategory.categoryName} onChange={handleChange} />
                        {/* <FormFeedback>{errors.name}</FormFeedback> */}
                    </Col>
                    <Col lg={1} style={{display: "grid", placeContent: "center"}}>
                        <div className={newCategory.categoryName.length>25 ? 'error':" "}>Length: {newCategory.categoryName.length}</div>
                    </Col>
                    <Col lg={3} >
                        <div className="btn_cont">
                            <div className="btn_ btn_small"  onClick={submitForm}>Add</div>
                        </div>
                    </Col>
                </FormGroup>
            </Form>
            <div className="row">
                {newCategory.id!=="" ?
                    (<div className="col-12" onClick={resetForm}>
                        <div className="box add_new_cat">
                            <div className="cat_name">Click Here To Add a New Category</div>
                        </div>
                    </div>):(<></>)
                }
                {categories?.map(category=>
                    <div className="col-3" key={category._id}>
                        <div className="box">
                            <div className="cat_name">{category.categoryName}</div>
                            <div className="no_dish">Total Dishes: {category.categoryProducts.length}</div>
                            <div className="edit" onClick={()=>setInput(category.categoryName, category._id)}><FontAwesomeIcon icon={faPenSquare} /></div>
                            <div className="delete" onClick={()=>deleteCategory(category._id)}><FontAwesomeIcon icon={faTrashCan} /></div>
                        </div>
                    </div>    
                )}
            </div>
        </div>
    )
}
