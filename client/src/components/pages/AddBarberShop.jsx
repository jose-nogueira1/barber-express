import React, { Component } from 'react';
import MainNavBar from "../../MainNavbar";
import MainFooter from "../../Mainfooter";
import { Link } from "react-router-dom";
import Autocomplete from "../../AutocompletePlace";
import api from '../../api';
import { Col, 
         Row, 
         Button, 
         Form, 
         FormGroup, 
         Label, 
         Input, } from 'reactstrap';


export default class AddBarberShop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      address: {
        placename: "",
        location: {
          coordinates: [],
        }
      },
      workingHours: {
        workingHourMonBegin: null,
        workingHourMonEnd: null,
        workingHourTueBegin: null,
        workingHourTueEnd: null,
        workingHourWedBegin: null,
        workingHourWedEnd: null,
        workingHourThuBegin: null,
        workingHourThuEnd: null,
        workingHourFriBegin: null,
        workingHourFriEnd: null,
        workingHourSatBegin: null,
        workingHourSatEnd: null,
        workingHourSunBegin: null,
        workingHourSunEnd: null,
      },
      logo: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFileChange(e) {
    console.log("The file added by the use is: ", e.target.files[0])
    this.setState({
      logo: e.target.files[0]
    })   
  }

  handleClick(e) {
    e.preventDefault()
    let uploadData = new FormData()
      uploadData.append("name", this.state.name)
      uploadData.append("address_placename", this.state.address.placename)
      uploadData.append("address_lng", this.state.address.location.coordinates[0])
      uploadData.append("address_lat", this.state.address.location.coordinates[1])
      uploadData.append("workingHourMonBegin" ,this.state.workingHourMonBegin )
      uploadData.append("workingHourMonEnd" ,this.state.workingHourMonEnd )
      uploadData.append("workingHourTueBegin" ,this.state.workingHourTueBegin )
      uploadData.append("workingHourTueEnd" ,this.state.workingHourTueEnd )
      uploadData.append("workingHourWedBegin" ,this.state.workingHourWedBegin )
      uploadData.append("workingHourWedEnd" ,this.state.workingHourWedEnd )
      uploadData.append("workingHourThuBegin" ,this.state.workingHourThuBegin )
      uploadData.append("workingHourThuEnd" ,this.state.workingHourThuEnd )
      uploadData.append("workingHourFriBegin" ,this.state.workingHourFriBegin )
      uploadData.append("workingHourFriEnd" ,this.state.workingHourFriEnd )
      uploadData.append("workingHourSatBegin" ,this.state.workingHourSatBegin )
      uploadData.append("workingHourSatEnd" ,this.state.workingHourSatEnd )
      uploadData.append("workingHourSunBegin" ,this.state.workingHourSunBegin )
      uploadData.append("workingHourSunEnd" ,this.state.workingHourSunEnd )
      uploadData.append("logo", this.state.logo)
  
    api.addBarberShop(uploadData)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          name: "",
          address: {
            placename: "",
            location: {
              coordinates: []
            }
          },
          workingHourMonBegin: "",
          workingHourMonEnd: "",
          workingHourTueBegin: "",
          workingHourTueEnd: "",
          workingHourWedBegin: "",
          workingHourWedEnd: "",
          workingHourThuBegin: "",
          workingHourThuEnd: "",
          workingHourFriBegin: "",
          workingHourFriEnd: "",
          workingHourSatBegin: "",
          workingHourSatEnd: "",
          workingHourSunBegin: "",
          workingHourSunEnd: "",
          logo: "",
          message: `Your Barbershop '${this.state.name}' has been created`
        })
        this.props.history.push("/")
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  handlePlace(place) {
    this.setState({
      address: {
        placename: place.place_name,
        location: {
          coordinates: place.center
        }
      }
    })
  }
  render() {
    return (
      <div className="AddBarberShop">
        <MainNavBar canGoBack >Add BarberShop</MainNavBar>
        <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input placeholder="Barber shop Name..." type="text" value={this.state.name} name="name" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Autocomplete onSelect={place => this.handlePlace(place)} />
        </FormGroup>
        <Row form>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Monday Begin..." type="number" value={this.state.workingHourMonBegin} name="workingHourMonBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Monday End..." type="number" value={this.state.workingHourMonEnd} name="workingHourMonEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Tuesday Begin..." type="number" value={this.state.workingHourTueBegin} name="workingHourTueBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Tuesday End..." type="number" value={this.state.workingHourTueEnd} name="workingHourTueEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Wednesday Begin..." type="number" value={this.state.workingHourWedBegin} name="workingHourWedBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Wednesday End..." type="number" value={this.state.workingHourWedEnd} name="workingHourWedEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Thursday Begin..." type="number" value={this.state.workingHourThuBegin} name="workingHourThuBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Thursday End..." type="number" value={this.state.workingHourThuEnd} name="workingHourThuEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Friday Begin..." type="number" value={this.state.workingHourFriBegin} name="workingHourFriBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Friday End..." type="number" value={this.state.workingHourFriEnd} name="workingHourFriEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Saturday Begin..." type="number" value={this.state.workingHourSatBegin} name="workingHourSatBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Saturday End..." type="number" value={this.state.workingHourSatEnd} name="workingHourSatEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Sunday Begin..." type="number" value={this.state.workingHourSunBegin} name="workingHourSunBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input placeholder="Sunday End..." type="number" value={this.state.workingHourSunEnd} name="workingHourSunEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col sm={10}>
            <FormGroup>
              <Label for="exampleLogo">Logo: </Label> <br/>
              <Input type="file" name="logo" onChange={this.handleFileChange} />
            </FormGroup>
          </Col>
        </Row>
        <Button onClick={this.handleClick}>Create Barber Shop</Button>
      </Form> <br/>
      <MainFooter />
      </div>
    );
  }
}