import React,  { useEffect, useState ,Fragment } from 'react'
import { Badge, Button, Card, Col, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap';

import styles from "./profilelayout.module.css"

import photo from "./pietra-schwarzler-FqdfVIdgR98-unsplash.jpg";
import { Link } from 'react-router-dom';
import { FiEdit ,FiLogOut } from "react-icons/fi";
import { HiOutlineCamera } from "react-icons/hi";
// import {UpdateProfile} from "../pages/UpdateProfile";




const ProfileLayout = (props) => {
  console.warn(props.id)
  const token=localStorage.getItem("token")
  const [users, setUser] = useState([])
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [url, setUrl] = useState("");
  const [userId,setUserId]=useState(null)

  useEffect(() => {
    getUsers();
  }, [])
  function getUsers() {
    fetch("https://boiling-shelf-43809.herokuapp.com/user/"+props.id+"/profile"
    , {
      headers:{
        "authorization":`${token}`
      }
    }
    ).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        console.warn(resp.profile)
        setUser(resp.profile)
        setBio(resp.profile.bio)
        setPhone(resp.profile.phone)
        setEmail(resp.profile.email)
        // setAddress(resp.address)
        setUsername(resp.profile.name)
        setUrl(resp.profile.url)
        // setSpecialist(resp.specialist)
        // setUserId(resp.id)
      })
    })
  }
  // console.log(users.discreption);
    return (
        <div className="container">
            <Row>
                <Col md={3}>
                
                <Card style={{ width: '19rem',height:"29rem" }} className={styles.cardprofile} >
               
                  <div className={styles.imgprofile}>
                    <Card.Img variant="top" style={{margin:"0px", borderRadius:"0%", width:"100%"}} src={url} />
                    
                          <div className={styles.editimg} > 
                              <HiOutlineCamera className={styles.iconimg} />
                      {/* <input type="file" id="file" accept="image/*"></input>
                      <label for="file"> choose a photo</label> */}
                      </div>
                    </div> 
                    <Card.Body className="text-center">
                        <Card.Title><strong>{username}</strong></Card.Title>
                        <Card.Title style={{color:"#65676b"}}> <strong>{specialist ? specialist : "add specialist"}</strong></Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Row style={{justifyContent:"space-around"}}>Teams
                             <Badge style={{height:"max-content"}} pill  variant="primary">100</Badge>
                             </Row>
                            </ListGroupItem> 
                            <ListGroupItem>
                            <Row style={{justifyContent:"space-around"}}>Owned
                             <Badge style={{height:"max-content"}} pill  variant="primary">50</Badge>
                             </Row>
                            </ListGroupItem> 
                            <ListGroupItem>
                            <Row style={{justifyContent:"space-around"}}>Friends
                             <Badge style={{height:"max-content"}} pill  variant="primary">500</Badge>
                             </Row>
                            </ListGroupItem>
                             
                    </ListGroup>
                    {/* <Card.Body>
                        <Row style={{justifyContent:"space-around"}}>
                        <Link type="button" to={"/Updateprofile/"+item.id} className="btn  btn-primary"><FiEdit/> Edit Profile</Link>
                        <Link type="button" className="btn  btn-danger"><FiLogOut/> Logout</Link>
                        </Row> 
                    </Card.Body> */}
                  
                </Card>
                
              
                </Col>

                
                <Col md={8} style={{marginLeft:"80px"}} >
                <Card className={styles.cardprofile} style={{height:"29rem"}} >
               
            
            <Card.Body style={{padding:"26px", marginTop:"20px"}} >
            <div className={styles.profilecontent}>
                <h4><strong>About Me</strong></h4>
                <strong><p>{bio ? bio : "add bio"}</p></strong>
                <h4 style={{marginTop:"30px"}}><strong>Contact Me</strong></h4>
                <div className="contactdetail">
                <Row>
                   <strong>Phone :</strong>
                   <strong><p>{phone ? phone : "add phone"}</p></strong>

                </Row>
                <Row>
                <strong>Email :</strong>
                <strong><p>{email}</p></strong>

                </Row>
                <Row>
                <strong>Address :</strong>
                <strong><p>{address ? address : "add address"}</p> </strong>

                </Row>
                <Row style={{position:"absolute",bottom:"20px"}}>
                <Link type="button" to={"/Updateprofile/"+props.id} className="btn  btn-primary"><FiEdit/> Edit Profile</Link>
                </Row>
                </div>
            </div>
            </Card.Body>     
                </Card>
                </Col>
            </Row>
            
        </div>
    )
}

export default ProfileLayout


