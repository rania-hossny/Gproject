
import React, { useState,useEffect } from 'react'

import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';

import { BrowserRouter, Link, Route ,Switch} from 'react-router-dom';
import Files from './Files';
// import Navteam from './Navteam';
import Posts from './Posts';
import { RiSendPlaneFill } from "react-icons/ri";
import { BsFilePost } from "react-icons/bs";
import { VscFiles } from "react-icons/vsc";
import styles from "./teamcontent.module.css"
import photo from "./depositphotos_124789918-stock-photo-teamwork-and-teambuilding-concept-in.jpg"
import photo2 from "./pietra-schwarzler-FqdfVIdgR98-unsplash.jpg"
import Header from '../../Components/Navbar/Navbar';

const Teamcontent = (props) => {
  const [postBody, setPostBody] = useState("");
  const [data,setData]=useState([])
  console.log(props)
  const id=props.match.params.id; //team id
  const token = localStorage.getItem("token");
    // console.log(id)
    // let user=JSON.parse(localStorage.getItem("user-info"))
    async function getPosts(){
       await fetch(`https://boiling-shelf-43809.herokuapp.com/post/60d5978951b4450022d9b65e/allPosts`,{
            headers:{
              "authorization":`${token}`
            }
          }).then(resp=>resp.json())
          .then(result=>{
            setData(result.post)
            // console.log(data)
            console.log(result)
            console.log(result.post)
          })
      }
    useEffect(() => {
        getPosts();
      },[])
   const createpost=(postBody)=>{
    let item={postBody}
    console.warn("item",item)
    fetch(`https://boiling-shelf-43809.herokuapp.com/post/60d5978951b4450022d9b65e/addPost`,
    {
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
        getPosts();
    })
   }
    return (
       <>
       <Header/>
         <div className="container">
                <BrowserRouter>
                
            <Row>
                {/* posts Row */}
                <Col md={9}>
                {/* add post */}
                <Row className={styles.addpost}>
                    <Col md={1}><a className={styles.photop} >
                        <img src={photo2} style={{margin:"0px"}}></img>
                    </a>
                    </Col>

                    <Col md={11} style={{marginTop: "10px"}}>
                    <form onSubmit={(e)=>{
                            e.preventDefault()
                            console.log(postBody)
                            createpost(postBody)
                        }
                    } >
                        <textarea 
                        rows="1"  placeholder="Say something..." className="form-control" 
                        onChange={(e)=>{setPostBody(e.target.value)}}/>
                        <button type="submit" className="btn btn-primary" style={{float:"right"}}><RiSendPlaneFill/> Share </button>
                        </form>
                    </Col>
                </Row>

                    {/* posts content */}
                    <Posts id={id}/>
                
                   </Col>
                    {/* sidebar */}
                   <Col className={styles.sidebar} md={3}>

                       {/* teams Card */}
                   <Card className={styles.cardposts}  style={{ width: '18rem' }}>
                        <Card.Header className={styles.sidetitle} >Team 1</Card.Header>
                         <Card.Img className={styles.imgteam} style={{marginTop:"10px", borderRadius:"5%"}} variant="top" src={photo} />
                        <Card.Body className="text-center">
                            
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <Button variant="primary">View members</Button>
                        </Card.Body>
                    </Card>

                    {/* teams Category */}
                    <Card className={styles.cardposts} style={{ width: '18rem' }}>
                        <Card.Header className={styles.sidetitle}>Category</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item style={{padding:"0px"}}> 
                                <Link  className={styles.categorylist}> <BsFilePost/> Posts</Link>
                                </ListGroup.Item>
                            <ListGroup.Item style={{padding:"0px"}}>
                                <Link  className={styles.categorylist}><VscFiles/> Files</Link>
                                </ListGroup.Item>
                            
                        </ListGroup>
                        </Card>
                        
                   </Col>
               </Row>
                {/* <Navteam/> */}

                
                <Switch>
                    {/* <Route path="/posts" component={Posts}></Route> */}
                    <Route path="/files" component={Files}></Route>
                    </Switch>
                </BrowserRouter>
        </div>

        </> 
    )
      
}

export default Teamcontent
