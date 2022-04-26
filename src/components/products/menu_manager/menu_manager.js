import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {url} from '../../../url'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowsSplitUpAndLeft, faStar, faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './menu_manager.css'

function Card({categoryProducts}) {
    return categoryProducts.map(prod=>
        <div className="col-12 col-md-4 col-lg-3 mt-4" key={prod._id}>
            <Link to={`/menu_manager/edit_product/${prod.productName}`}>
                <div className={"food_card"+(prod.deleted ? " delete":"")}>
                    <div className="img_cont">
                        <div className="img" style={{backgroundImage: `url(${prod.image})`}}></div>
                    </div>
                    <div className="food_name">{prod.productName}</div>
                    <div className="food_categories">
                        { prod.comments.length===0 ? (
                            <div className="food_reviews"><div><FontAwesomeIcon icon={faStar} />{prod.rating}/5</div><span>(No Reviews)</span></div>
                        ):(
                            <div className="food_reviews"><div><FontAwesomeIcon icon={faStar} />{prod.rating}/5</div><span>({prod.comments.length} Reviews)</span></div>
                        )}
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
            </Link>
        </div>
    )
}

export default function MenuManager() {

    const [products, setProducts] = useState()

    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('3').classList.add('active')
        axios
        .get(url+'/product/')
        .then((res)=>{
            if(res.status===200)
                setProducts(res.data.reverse())
        })
        .catch((error)=>{
            alert("Error: "+error.response.data.message)
        })
    }, [])
    return (
        <div className='menu_manager container'>
            <div className="heading">Manage Products</div>
            <div className="row top_row mt-5 mb-5">
                <div className="col-3">
                    <Link to='/menu_manager/new_product' className="box">
                        <FontAwesomeIcon icon={faPlus} />
                        <div className="text">Add Product</div>
                    </Link>
                </div>
                <div className="col-3">
                    <Link to="/menu_manager/manage_categories" className="box">
                        <FontAwesomeIcon icon={faArrowsSplitUpAndLeft} />
                        <div className="text">Manage Categories</div>
                    </Link>
                </div>
                <div className="col-3">
                    <Link to="/menu_manager/manage_preferences" className="box">
                        <FontAwesomeIcon icon={faHeart} />
                        <div className="text">Manage Preference</div>
                    </Link>
                </div>
            </div>
            <div className="search_cont mb-4">
                <input type="text" placeholder="Search for a dish" name="search" />
                <div className="search_btn">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />    
                </div>
            </div>
            <div className="row prod_cont">
                {products?.map((prod)=>(
                    prod.categoryName==="Trash" ? (
                    <div className="row section mb-5" key={prod._id}>
                        <div className="col-12">
                            <div className="heading">{prod.categoryName}</div>
                        </div>
                        {prod.categoryProducts.length > 0 ? (
                            <Card categoryProducts={prod.categoryProducts} />    
                        ):(<div className='empty_cat'>No Products In This Category</div>)}
                    </div>):(<></>)
                ))}
            </div>
            <div className="row prod_cont">
                {products?.map((prod)=>(
                    prod.categoryName!=="Trash" ? (
                    <div className="row section mb-5" key={prod._id}>
                        <div className="col-12">
                            <div className="heading">{prod.categoryName}</div>
                        </div>
                        {prod.categoryProducts.length > 0 ? (
                            <Card categoryProducts={prod.categoryProducts} />    
                        ):(<div className='empty_cat'>No Products In This Category</div>)}
                    </div>):(<></>)
                ))}
            </div>
        </div>
    )
}
;