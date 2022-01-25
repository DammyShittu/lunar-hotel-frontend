import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Formik } from 'formik';
import { Form, Button, Offcanvas } from 'react-bootstrap';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createReservation } from '../redux/reservations/reservations';
import './addReservation.css';

const validationSchema = Yup.object().shape({

  check_in: Yup.date()
    .default(() => new Date())
    .required('*Check In date is required'),
  check_out: Yup.date()
    .when('check_in', (checkIn, yup) => checkIn && yup.min(checkIn, 'Check in date cannot be greater than check out date'))
    .required('*Check Out date is required'),
});

const AddReservation = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleBack = () => navigate(-1);
  return (
    <div className="form-container1">
      <div className="p-2">
        <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} className="text-white point" />
      </div>
      <div className="fullScreen">
        <div className="p-2 vis">
          <FontAwesomeIcon icon={faBars} onClick={handleShow} className="text-white" />
        </div>
        <div className="txtWrapper">
          <h1 className="upperCase txtWhite fs-1">Book a reservation</h1>
          <p className="txtWhite">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            erat massa, accumsan a porta quis, faucibus et mi. Curabitur
            cursus nulla eu magna posuere, sit amet fringilla orci elementum.
          </p>

          <Formik
            initialValues={{
              check_in: '',
              check_out: '',
              room_id: 4,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              dispatch(createReservation(values));
              resetForm();
              setSubmitting(false);
              setTimeout(() => {
                navigate('/reservations');
                window.location.reload(true);
              }, 1000);
            }}
          >

            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} className="mx-auto row row-cols-2 mt-3 d-flex justify-content-center align-items-center">
                <Form.Group controlId="FormCheckIn">
                  <Form.Label>Check In</Form.Label>
                  <Form.Control
                    type="date"
                    name="check_in"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.check_in}
                    className="{touched.check_in && errors.check_in ? 'error' : null} form-radius"
                  />
                  {touched.check_in && errors.check_in ? (
                    <div className="error-message-white">{errors.check_in}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="FormCheckIn">
                  <Form.Label>Check Out</Form.Label>
                  <Form.Control
                    type="date"
                    name="check_out"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.check_out}
                    className="{touched.check_out && errors.check_out ? 'error' : null} form-radius"
                  />
                  {touched.check_out && errors.check_out ? (
                    <div className="error-message-white">{errors.check_out}</div>
                  ) : null}
                </Form.Group>

                <Button type="submit" disabled={isSubmitting} className="upperCase resBtn">
                  Reserve
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Lunar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AddReservation;
