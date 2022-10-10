import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditMenu() {
    const history = useHistory();

    const { id } = useParams()

    const [name, setName] = useState("")
    const [idCategory, setIdCategory] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [ratingcount, setRatingcount] = useState("")
    const [ratingsum, setRatingsum] = useState("")
    const [validationError, setValidationError] = useState({})
    useEffect(() => {
        fetchMenu()
    }, [])

    const fetchMenu = async () => {
        await axios.get(`http://127.0.0.1:8000/api/menus/${id}`).then(({ data }) => {
            const {name, idCategory, price, description } = data.menu
            setName(name)
            setIdCategory(idCategory)
            setPrice(price)
            setDescription(description)
            setRatingcount(ratingcount)
            setRatingsum(ratingsum)
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }

    // const changeHandler = (event) => {
    //     setImage(event.target.files[0]);
    // };

    const updateMenu = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('name', name)
        formData.append('idCategory', idCategory)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('ratingcount', ratingcount)
        formData.append('ratingsum', ratingsum)


        await axios.post(`http://127.0.0.1:8000/api/menus/update/${id}`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            history.push("/menu/view")
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors)
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Update Menu</h4>
                            <hr />
                            <div className="form-wrapper">
                                {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                            Object.entries(validationError).map(([key, value]) => (
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <Form onSubmit={updateMenu}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="name">
                                                <Form.Label>Nama</Form.Label>
                                                <Form.Control type="text" value={name} onChange={(event) => {
                                                    setName(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="idCategory">
                                                <Form.Label>Kategori</Form.Label>
                                                <Form.Control type="number" value={idCategory} onChange={(event) => {
                                                    setIdCategory(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="description">
                                                <Form.Label>Deskripsi</Form.Label>
                                                <Form.Control as="textarea" rows={3} value={description} onChange={(event) => {
                                                    setDescription(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Price">
                                                <Form.Label>Harga</Form.Label>
                                                <Form.Control type="number" value={price} onChange={(event) => {
                                                    setPrice(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="ratingcount">
                                                {/* <Form.Label>Harga</Form.Label> */}
                                                <Form.Control type="hidden" value={ratingcount} onChange={(event) => {
                                                    setPrice(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="ratingsum">
                                                {/* <Form.Label>Harga</Form.Label> */}
                                                <Form.Control type="hidden" value={ratingsum} onChange={(event) => {
                                                    setPrice(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {/* <Row> 
                                        <Col>
                                            <Form.Group controlId="Name">
                                                <Form.Label>Rating Count</Form.Label>
                                                <Form.Control type="text" value={title} onChange={(event)=>{
                                                setTitle(event.target.value)
                                                }}/>
                                            </Form.Group>
                                        </Col>  
                                    </Row>
                                    <Row> 
                                        <Col>
                                            <Form.Group controlId="Name">
                                                <Form.Label>Rating Sum</Form.Label>
                                                <Form.Control type="text" value={title} onChange={(event)=>{
                                                setTitle(event.target.value)
                                                }}/>
                                            </Form.Group>
                                        </Col>  
                                    </Row> */}

                                    {/* <Row>
                                        <Col>
                                        <Form.Group controlId="Image" className="mb-3">
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control type="file" onChange={changeHandler} />
                                        </Form.Group>
                                        </Col>
                                    </Row> */}
                                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Update
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}