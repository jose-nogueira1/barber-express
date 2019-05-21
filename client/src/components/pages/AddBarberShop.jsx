import React, { Component } from 'react';
import MainNavBar from "../../MainNavbar";
import MainFooter from "../../Mainfooter";
import Autocomplete from "../../AutocompletePlace"
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
    let data = {
      name: this.state.name,
      address: this.state.address,
      workingHourMonBegin: this.state.workingHourMonBegin,
      workingHourMonEnd: this.state.workingHourMonEnd,
      workingHourTueBegin: this.state.workingHourTueBegin,
      workingHourTueEnd: this.state.workingHourTueEnd,
      workingHourWedBegin: this.state.workingHourWedBegin,
      workingHourWedEnd: this.state.workingHourWedEnd,
      workingHourThuBegin: this.state.workingHourThuBegin,
      workingHourThuEnd: this.state.workingHourThuEnd,
      workingHourFriBegin: this.state.workingHourFriBegin,
      workingHourFriEnd: this.state.workingHourFriEnd,
      workingHourSatBegin: this.state.workingHourSatBegin,
      workingHourSatEnd: this.state.workingHourSatEnd,
      workingHourSunBegin: this.state.workingHourSunBegin,
      workingHourSunEnd: this.state.workingHourSunEnd,
    }
    api.addBarberShop(data)
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
          logo: null,
          message: `Your Barbershop '${this.state.name}' has been created`
        })
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
              <Label for="exampleName">Name: </Label>
              <Input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="exampleAddress">Address: </Label>
          <Autocomplete onSelect={place => this.handlePlace(place)} />
        </FormGroup>
        <Row form>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourMonBegin">Monday Begin: </Label>
              <Input type="number" value={this.state.workingHourMonBegin} name="workingHourMonBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourMonEnd">Monday End: </Label>
              <Input type="number" value={this.state.workingHourMonEnd} name="workingHourMonEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourTueBegin">Tuesday Begin: </Label>
              <Input type="number" value={this.state.workingHourTueBegin} name="workingHourTueBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourTueEnd">Tuesday End: </Label>
              <Input type="number" value={this.state.workingHourTueEnd} name="workingHourTueEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourWedBegin">Wednesday Begin: </Label>
              <Input type="number" value={this.state.workingHourWedBegin} name="workingHourWedBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourWedEnd">Wednesday End: </Label>
              <Input type="number" value={this.state.workingHourWedEnd} name="workingHourWedEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourThuBegin">Thursday Begin: </Label>
              <Input type="number" value={this.state.workingHourThuBegin} name="workingHourThuBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourThuEnd">Thursday End: </Label>
              <Input type="number" value={this.state.workingHourThuEnd} name="workingHourThuEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourFriBegin">Friday Begin: </Label>
              <Input type="number" value={this.state.workingHourFriBegin} name="workingHourFriBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourFriEnd">Friday End: </Label>
              <Input type="number" value={this.state.workingHourFriEnd} name="workingHourFriEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourSatBegin">Saturday Begin: </Label>
              <Input type="number" value={this.state.workingHourSatBegin} name="workingHourSatBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourSatEnd">Saturday End: </Label>
              <Input type="number" value={this.state.workingHourSatEnd} name="workingHourSatEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourSunBegin">Sunday Begin: </Label>
              <Input type="number" value={this.state.workingHourSunBegin} name="workingHourSunBegin" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleWorkingHourSunEnd">Sunday End: </Label>
              <Input type="number" value={this.state.workingHourSunEnd} name="workingHourSunEnd" onChange={this.handleInputChange} />
            </FormGroup>
          </Col>
          <Col sm={10}>
            <FormGroup>
              <Label for="exampleLogo">Logo: </Label>
              <Input type="file" value={this.state.logo} name="logo" onChange={this.handleFileChange} />
            </FormGroup>
          </Col>
        </Row>
        <Button onClick={this.handleClick} >Create Barber Shop</Button>
      </Form> <br/>
      <MainFooter />
      </div>
    );
  }
}