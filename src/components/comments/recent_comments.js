import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import {url} from '../../url'

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './recent_commets.css'

function CommentCard({comments, token}) {

    function deleteComment(id){
        try{
            axios
            .delete(url+'/admin/deleteComment/'+id,{
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
    }

    return comments.map(comment=>
        <div className="col-12" key={comment._id}>
            <div className="comment_cont">
                <img src={comment.dp} alt="pic" />
                <div className="comment">
                    <div className="top_line">
                        <div className="name">{comment.user}</div>
                        <div className="date_">{moment(comment.createdAt).fromNow()}</div>
                        <div className="rating">Rating: {comment.rating}/5</div>
                        <div className="dish">Dish: {comment.productName}</div>
                        <div className="delete" onClick={()=>deleteComment(comment._id)}><FontAwesomeIcon icon={faTrashCan} /></div>
                    </div>
                    <div className="bottom_line">
                        <div className="cmt">
                            {comment.comment}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function RecentComments() {

    const [comments, setComments] = useState()
    const token = JSON.parse(localStorage.getItem("profile"))?.token

    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('5').classList.add('active')
        try{
            axios
            .get(url+'/admin/recentComments',{
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res)=>{
                setComments(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        } 
        catch(error){
            console.log(error)
        }
    }, [])

    if(comments){
        return (
            <div className='recent_comments container'>
                <div className="heading">Recent Comments</div>
                <div className="row comment">
                    <CommentCard token={token} comments={comments} />
                </div>
            </div>
        )
    }
    else{
        return(<></>)
    }
}
