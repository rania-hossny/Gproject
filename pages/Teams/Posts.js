import React, { useState,useEffect } from 'react'
import { Col, Card, Nav, Row } from 'react-bootstrap';
import { BiImageAdd } from "react-icons/bi";
import photo from "./pietra-schwarzler-FqdfVIdgR98-unsplash.jpg";
import { ImReply } from "react-icons/im";
import { BiDotsVerticalRounded } from "react-icons/bi";
import styles from "./teamcontent.module.css"


const Posts = (props) => {
  const [commentBody, setCommentBody] = useState("");
  const [data,setData]=useState([])
  console.warn(props.id) //team id
  // let user=JSON.parse(localStorage.getItem("user-info"))
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id"); //user id

  useEffect(() => {
    getPosts();
  },[])
  async function getPosts(){
    await fetch(`https://boiling-shelf-43809.herokuapp.com/post/60d5978951b4450022d9b65e/allPosts`,{
      headers:{
        "authorization":`${token}`
      }
    }).then(resp=>resp.json())
    .then(result=>{
      setData(result.post)
      // console.log(data)
      // console.log(result)
      console.log(result.post)
    })
  }
  

  const makeComment=(commentBody,postId)=>{
    let item={commentBody}
  console.warn("item",item)
    fetch(`https://boiling-shelf-43809.herokuapp.com/post/${postId}/addReply`,{
      method:"POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        "authorization":`${token}`
      },
      body:JSON.stringify(item)
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      const newData = data.map(item=>{
        // compare id for same post
        if(item._id==result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
    }).catch(err=>console.log(err))
  }
  const deletePost=(postId)=>{
    fetch(`https://boiling-shelf-43809.herokuapp.com/post/${postId}/deletePost`,{
    method:"delete",
    headers:{
        "authorization":`${token}`
      },
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      const newData = data.filter(item=>{
        return item._id !==postId
      })
      setData(newData)
    }).catch(err=>console.log(err))
  }

  const deleteComment=(comId,posId)=>{
    console.log(comId)
    console.log(posId)
    fetch(`https://boiling-shelf-43809.herokuapp.com/post/${posId}/${comId}/deleteReply`,
      {
        method:"delete",
        headers:{
        "authorization":`${token}`
      },
      }
    ).then(res=>res.json())
    .then(result=>{
      console.log(result)
      const newData = data.filter(item=>{
        return item.comments._id !==comId
      })
      setData(newData)
    }).catch(err=>console.log(err))
  }
    return (
        <Row className={styles.userActivities}>  
        {
          data.map(item=>{
            return(
              <div className={styles.i} key={item._id}>
              <a className={styles.photopost} >
                 <img src={item.ownerImage} style={{margin:"0px"}}></img>
               </a>
               <div className={styles.activityContent}>
                 {/* posts list */}
                     <ul className={styles.postlist}>
                       <li>
                       <div className={styles.postcontent}>
                         {
                         item.postOwner == id && 
                             <div className={styles.optionicon}>
                                <BiDotsVerticalRounded/>
                                <div className={styles.optioncontainer}>
                                  <ul>
                                    <li>Edit</li>
                                    <li onClick={()=>deletePost(item._id)}>Delete</li>
                                  </ul>
                              </div>
                             </div> } 
                           

            
                             <div className={styles.ctitle}>
                               <a href="#"><strong>{item.ownerName}</strong></a>
                             </div>
                             <div className={styles.ctime}>{item.date}</div>
                             <p>{item.body}</p>
 
                           </div>
                       </li>
                      </ul>
 
                       {/* comments */}
                        
                       <ul className={styles.commentlist}>

                         {/* first comment */}
                         {
                          item.comments.map(record=>{
                            return ( 
                            <li key={record._id} style={{position:"relative"}}>
                              {record.commentUser == id && 
                              <div className={styles.optioniconc}>
                                <BiDotsVerticalRounded/>
                                <div className={styles.optioncontainerc}>
                                  <ul>
                                    <li>Edit</li>
                                    <li onClick={()=>deleteComment(record._id,item._id)}>Delete</li>
                                  </ul>
                              </div>
                             </div>
                             }
                              
                              <a className={styles.photop} >
                                <img src={record.ownerImage} style={{margin:"0px"}}></img>
                              </a>
                              <div className={styles.comcontent}>
                                <div className={styles.ctitle}>
                                  <a href="#"><strong>{record.ownerName}</strong></a>
                                </div>
                                <div className={styles.ctime}>{record.commentDate}</div>
                                <p>{record.commentBody}</p>
  
                              </div>
                          </li>
                          )
                          })
                        }
                         
                         
                         {/*  comment input */}
                         <li>
                           <Row>
                             <Col style={{marginTop: "10px" ,marginLeft:"50px"}}>
                             <form onSubmit={(e)=>{
                               e.preventDefault()
                              //  console.log(e.target[0].value)
                               console.log(item._id)
                               makeComment(commentBody,item._id)
                             }} >
                                 <input placeholder="Add a comment" className="form-control" onChange={(e)=>{setCommentBody(e.target.value)}}/>
                                 <button type="submit" className="btn btn-sm btn-primary">Post Comment</button>
                               </form>
                             </Col>
                           </Row>
                           </li>
                       </ul>
                   </div>  
           </div>
            )
          })
        }

        </Row> 
    )
}

export default Posts
