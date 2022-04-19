import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {url} from '../../../url'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Form, FormGroup, Label, Input, Col, FormFeedback } from "reactstrap";
import './product_manager.css'

export default function NewProduct() {

    const initialState = {
        _id: "",
        productName: "",
        productCategory: "",
        price: 0,
        discount: 0,
        preference: [],
        typeOfDish: "",
        batchSize: "",
        customisation: false,
        allergy: "",
        quantity: "",
        unitsSold: "",
        description: "",
        image: "",
        createdAt: "",
        updatedAt: ""
    }
    const prod = useParams()
    const token = JSON.parse(localStorage.getItem("profile"))?.token

    const [formData, setFormData] = useState(initialState)
    const [prefernces, setPreferences] = useState()
    const [categories, setCategories] = useState()
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('3').classList.add('active')
        axios
        .get(url+`/product/${prod.prodName}`)
        .then((res)=>{
            if(res.status===200)
                setFormData(res.data)
                console.log(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })
        axios
        .get(url+'/preference/')
        .then((res)=>{
            if(res.status===200)
                setPreferences(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })
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
    if(formData&&categories&&prefernces){
        return (
            <div className="container product_form">
                <div className="heading">Edit Product</div>
                <div className="delete"><FontAwesomeIcon icon={faTrash}/></div>
                <Form>
                    {formData?._id ? 
                    (
                        <FormGroup row>
                            <Label htmlFor="name" lg={3}>Product ID</Label>
                            <Col lg={3} >
                                <div style={{padding: "5px 15px", border: "1px solid var(--lineColour)", borderRadius: "5px", overflow: "hidden", backgroundColor:"var(--secondary)"}}>{formData._id}</div>
                            </Col>
                            <Col lg={5} >
                                <div>Product ID for reference. (Can not be changed)</div>
                            </Col>
                        </FormGroup>
                    ):(
                        <></>
                    )}
                    <FormGroup row>
                        <Label htmlFor="name" lg={3}>Product Name</Label>
                        <Col lg={4} >
                            <Input type="text" id="productName" name="productName" autoComplete="off" placeholder="Product Name" value={formData.productName} onChange={handleChange} />
                            {/* <FormFeedback>{errors.name}</FormFeedback> */}
                        </Col>
                        <Col lg={5} >
                            {formData.productName.length>25 || formData.productName.length<1 ? (
                                <div style={{color: "red"}}>Length: {formData.productName.length}</div>
                            ):(
                                <div>Length: {formData.productName.length}</div>
                            )}
                            <div>Don't exceed more than 25 charecters (Including Space)</div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="prodCat" lg={3}>Product Category</Label>
                        <Col lg={9}>
                            <div className="cat_selection container-fluid">
                                <div className="row">
                                    {categories.map(category=>
                                        <div className="col-2" key={category._id}>
                                            <div className={"box"+(formData.productCategory===category.categoryName?" active":"")}>{category.categoryName}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="price" lg={3}>Price</Label>
                        <Col  lg={4} >
                            <Input type="number"  id="price" name="price" autoComplete="off" placeholder="Price" value={formData.price} onChange={handleChange} />
                        </Col>
                        <Col lg={5}>
                            <div>Enter the Price of The Product</div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="discount" lg={3}>Discount</Label>
                        <Col  lg={4} >
                            <Input type="number"  id="discount" name="price" autoComplete="off" placeholder="Discount" value={formData.discount} onChange={handleChange} />
                        </Col>
                        <Col lg={5}>
                            <div>Enter the Discount (In Percentage)</div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="prodCat" lg={3}>Preference</Label>
                        <Col lg={9}>
                            <div className="cat_selection container-fluid">
                                <div className="row">
                                    {prefernces.map(preference=>
                                        <div className="col-2" key={preference._id}>
                                            <div className={"box"+(formData.preference===preference?" active":"")}>{preference.preferenceName}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="description" lg={3}>Type of Dish</Label>
                        <Col lg={4}>
                            <div className="dish_type btn_cont" style={{justifyContent: "space-around"}}>
                                <div className={"btn_ btn_small veg"+(formData.typeOfDish==="veg"?" active":"")}>Veg</div>
                                <div className={"btn_ btn_small nonveg"+(formData.typeOfDish==="nonveg"?" active":"")}>Non Veg</div>
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="batchSize" lg={3}>Batch Size</Label>
                        <Col  lg={4} >
                            <Input type="text"  id="batchSize" name="batchSize" autoComplete="off" placeholder="Discount" value={formData.batchSize} onChange={handleChange}/>
                        </Col>
                        <Col lg={5}>
                            <div>Single Order Amount</div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="quantity" lg={3}>Quantity</Label>
                        <Col  lg={4} >
                            <Input type="number"  id="quantity" name="quantity" autoComplete="off" placeholder="Quantity" value={formData.quantity} onChange={handleChange}/>
                        </Col>
                        <Col lg={5}>
                            <div>Order Amount = Batch Size * Quantity</div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="customisation" lg={3}>Customisation</Label>
                        <Col  lg={4} >{console.log(formData.customisation)}
                            <div className="dish_type btn_cont" style={{justifyContent: "space-around"}}>
                                <div className={"btn_ btn_small veg"+(formData.customisation?" active":"")}>True</div>
                                <div className={"btn_ btn_small nonveg"+(formData.customisation?"":" active")}>False</div>
                            </div>
                        </Col>
                        <Col lg={5}>
                            <div>Custumisation is {formData.customisation?"Enabled":"Disabled"}</div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="allergy" lg={3}>Allergy</Label>
                        <Col  lg={4} >
                            <Input type="text"  id="allergy" name="allergy" autoComplete="off" placeholder="Allergy" value={formData.allergy} onChange={handleChange} />
                        </Col>
                        <Col lg={5}>
                            <div>Mention Potential Allergies</div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="description" lg={3}>Description</Label>
                        <Col lg={9} >
                            <Input type="textarea" rows="10" id="description" name="description" autoComplete="off" placeholder="Full Description" value={formData.description} onChange={handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="pincode" lg={3}>Image</Label>
                        <Col  lg={9}>
                            <Input type="text"  id="pic" name="pic" autoComplete="off" placeholder="Product Picture" value={formData.image} onChange={handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col lg={12}>
                            <div className="btn_cont">
                                <div className="btn_">Submit</div>
                            </div>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
    else{
        return(<></>)
    }
}
