import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {url} from '../../../url'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faStar, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { Form, FormGroup, Label, Input, Col, FormFeedback } from "reactstrap";
import './product_manager.css'

function Card({prod}) {
    return (
        <div className="food_card">
            <div className="img_cont">
                <div className="img" style={{backgroundImage: `url(${prod.image})`}}></div>
            </div>
            <div className="food_name">{prod.productName}</div>
            <div className="food_categories">
                <div className="food_reviews"><div><FontAwesomeIcon icon={faStar} />5/5</div><span>(No Reviews)</span></div>
                { prod.typeOfDish ==="veg" ? (
                    <div className='type veg'><div className="circ"></div></div>
                ):(
                    <div className='type nonveg'><div className="circ"></div></div>
                )}
            </div>
            <div className="price_cont">
                <div className="price">₹{prod.price-(prod.price*prod.discount*0.01)}</div>
                {prod.discount!==0 ? (
                    <div className='discount_cont'>  
                        <div className="discount_price">₹{prod.price}</div>
                        <div className="discount">Save {prod.discount}%</div>
                    </div>
                ):(<></>)}
            </div>
        </div> 
    )
}

function ProductPreference({ allPreferences, prodPreferences }){

    const [calc, setCalc] = useState(false)

    useEffect(()=>{
        if(prodPreferences.length>0){
            for(let i=0;i<prodPreferences.length;i++){
                for(let j=0;j<allPreferences.length;j++){
                    if(allPreferences[j].preferenceName===prodPreferences[i]){
                        allPreferences[j].active=true
                    }
                }
            }
            setCalc(true)
        }
        else{
            setCalc(true)
        }
    })

    function active(preferences){
        const pref = document.getElementById(preferences._id).classList
        
        if(pref.contains('active')){
            for(let i=0;i<=prodPreferences.length;i++){
                if(preferences.preferenceName===prodPreferences[i]){
                    prodPreferences.splice(i,1)
                    pref.remove('active')
                    return
                }
            }
        }
        else{
            prodPreferences.push(preferences.preferenceName)
            pref.add('active')
        }
    }

    if(calc===true){
        return allPreferences.map(preference=>
            <div className="col-2" key={preference._id}>
                <div className={"box"+(preference.active ? " active":"")} id={preference._id} onClick={()=>active(preference)}>{preference.preferenceName}</div>
            </div>
        )
    }
    else{
        return(<></>)
    }
}   

export default function NewProduct(props) {

    const prod = useParams()
    const token = JSON.parse(localStorage.getItem("profile"))?.token

    const [formData, setFormData] = useState({
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
        updatedAt: "",
        deleted: ""
    })
    const [allPreferences, setAllPreferences] = useState()
    const [categories, setCategories] = useState()    

    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('3').classList.add('active')
        if(!props.newProd){
            axios
            .get(url+`/product/${prod.prodName}`)
            .then((res)=>{
                if(res.status===200)
                    setFormData(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        axios
        .get(url+'/preference/')
        .then((res)=>{
            if(res.status===200)
                setAllPreferences(res.data)
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

    function handleChange(e){
        if(e.target.name==="discount" && (e.target.value<0 || e.target.value>100)) return
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function changeCategory(name){
        setFormData({...formData, productCategory: name})
    }

    function changeTypeOfDish(name){
        setFormData({...formData, typeOfDish: name})
    }

    function changeCustomisation(name){
        setFormData({...formData, customisation: name})
    }

    function submitForm(){
        if(formData._id!==""){
            try{
                axios
                .put(url+'/admin/updateProduct/'+formData._id, formData,{
                    headers: { "authorization": `Bearer ${token}` }
                })
                .then(()=>{
                    alert("Product Updated")
                    window.location.reload()
                })
                .catch((error)=>{
                    alert("Error: "+error.response.data.message)
                })
            } catch(error){
                console.log(error)
            }
        }else{
            try{
                axios
                .post(url+'/admin/new_product', formData,{
                    headers: { "authorization": `Bearer ${token}` }
                })
                .then((res)=>{
                    alert(res.data.message)
                })
                .catch((error)=>{
                    alert("Error: "+error.response.data.message)
                })
            } catch(error){
                console.log(error)
            }
        }
    }

    function deleteProduct(){
        try{
            axios
            .delete(url+'/admin/deleteProduct/'+formData._id,{
                headers: { "authorization": `Bearer ${token}` }
            })
            .then((res)=>{
                alert(res.data.message)
                window.location.replace("/menu_manager")
            })
            .catch((error)=>{
                alert("Error: "+error.response.data.message)
            })
        } catch(error){
            console.log(error)
        }
    }

    function restoreProduct(){
        try{
            if(formData.productCategory==="Trash") return alert("Select A Category To Restore")
            axios
            .put(url+'/admin/restoreProduct/'+formData._id,{
                productCategory: formData.productCategory
            },{
                headers: { "authorization": `Bearer ${token}` }
            })
            .then((res)=>{
                alert(res.data.message)
                window.location.replace("/menu_manager")
            })
            .catch((error)=>{
                alert("Error: "+error.response.data.message)
            })
        } catch(error){
            console.log(error)
        }
    }

    if(formData && categories && allPreferences){
        return (
            <div className="container product_form">
                <div className="heading">Edit Product {formData.deleted ? (<span style={{fontSize: "18px", marginLeft: "5px"}}>(Product is hidden)</span>):(<></>)}</div>
                {props.newProd?(<></>):( !formData.deleted ? 
                    (<div className="delete" onClick={deleteProduct}><FontAwesomeIcon icon={faTrash}/></div>):
                    (<div className="delete" onClick={restoreProduct}><FontAwesomeIcon icon={faRetweet}/></div>)
                )}
                {!formData.deleted ? (
                    <div className="prod_submit_btn">
                        <div className="btn_cont" onClick={submitForm}>
                            <div className="btn_">Submit</div>
                        </div>
                    </div>
                ):(<></>)}
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
                                        !category.deleted ? (<div className="col-2" key={category._id} onClick={()=>changeCategory(category.categoryName)}>
                                            <div className={"box"+(formData.productCategory===category.categoryName?" active":"")}>{category.categoryName}</div>
                                        </div>):(<></>)
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
                            <Input type="number"  id="discount" name="discount" autoComplete="off" placeholder="Discount" value={formData.discount} onChange={handleChange} />
                        </Col>
                        <Col lg={5}>
                            <div>Enter the Discount (In Percentage)</div>
                            <div>Current Price: ₹{formData.price-(formData.price*formData.discount*0.01)}</div>
                            {formData.discount>0 ? (<div>Price Reduced by: ₹{(formData.price-(formData.price-(formData.price*formData.discount*0.01))).toFixed(1)}</div>):(<></>)}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="prodCat" lg={3}>Preference</Label>
                        <Col lg={9}>
                            <div className="cat_selection container-fluid">
                                <div className="row">
                                    <ProductPreference allPreferences={allPreferences} prodPreferences={formData.preference} />
                                </div>
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="description" lg={3}>Type of Dish</Label>
                        <Col lg={4}>
                            <div className="dish_type btn_cont" style={{justifyContent: "space-around"}}>
                                <div className={"btn_ btn_small veg"+(formData.typeOfDish==="veg"?" active":"")} onClick={()=>changeTypeOfDish("veg")}>Veg</div>
                                <div className={"btn_ btn_small nonveg"+(formData.typeOfDish==="nonveg"?" active":"")} onClick={()=>changeTypeOfDish("nonveg")}>Non Veg</div>
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="batchSize" lg={3}>Batch Size</Label>
                        <Col  lg={4} >
                            <Input type="text"  id="batchSize" name="batchSize" autoComplete="off" placeholder="Batch Size" value={formData.batchSize} onChange={handleChange}/>
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
                        <Col  lg={4} >
                            <div className="dish_type btn_cont" style={{justifyContent: "space-around"}}>
                                <div className={"btn_ btn_small veg"+(formData.customisation?" active":"")} onClick={()=>changeCustomisation(true)}>True</div>
                                <div className={"btn_ btn_small nonveg"+(formData.customisation?"":" active")} onClick={()=>changeCustomisation(false)}>False</div>
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
                            <Input type="text"  id="image" name="image" autoComplete="off" placeholder="Product Picture" value={formData.image} onChange={handleChange} />
                        </Col>
                        <Col lg={3}></Col>
                        <Col lg={9}>
                            <a href="https://wallflour-bakeho.imgbb.com/" style={{paddingTop: "10px"}} target="_blank">Click To Upload Pictures</a>
                        </Col>
                    </FormGroup>
                </Form>
                <div className="row preview_cont">
                    <div className="col-12 mt-5 mb-3">
                        <h3>Preview</h3>
                    </div>
                    <div className="col-12">
                        <Card prod={formData}/> 
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-lg-5 mb-4">
                        <div className="img_cont_detail">
                            <div className="img" style={{backgroundImage: `url(${formData.image})`}}></div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-7">
                        <div className="content">
                            <div className="heading">
                                {formData.productName}
                                {formData.typeOfDish ==="veg" ? (
                                    <span className='type veg'><span className="circ"></span></span>
                                ):(
                                    <span className='type nonveg'><span className="circ"></span></span>
                                )}
                            </div>
                            <div className="rating"><FontAwesomeIcon icon={faStar}/> 5/5</div>
                            <div className="desc">{formData.description}</div>
                            {formData.allergy!=="" ? (<div className="batch_size"><b>Allergy:</b> {formData.allergy}</div>):(<></>)}
                            <div className="batch_size"><b>Batch Size:</b> {formData.batchSize}</div>
                            <div className="price_cont">
                                <div>
                                    <b>Price:</b>
                                    <span className="price ps-2">₹{formData.price-(formData.price*formData.discount*0.01)}</span>
                                    {formData.discount>0 ? (
                                        <>  
                                            <span className="discount_price">₹{formData.price}</span>
                                            <span className="discount">Save {formData.discount}%</span>
                                        </>
                                    ):(<></>)}
                                </div>
                            </div>
                            {formData.customisation ? (
                                <div className="message mb-4">
                                    <Input type="textarea" rows="3" name="customisation" autoComplete="off" placeholder="Add Customisation" />
                                </div>
                            ):(<></>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(<></>)
    }
}
