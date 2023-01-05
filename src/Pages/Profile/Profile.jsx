import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {  Radio  } from "antd";
import {
  getProfileApi,
  updateProfileApi,
} from "../../redux/reducers/userReducer";
import { useFormik } from "formik";
import * as yup from "yup";
// import type { RadioChangeEvent } from 'antd';

const Profile = () => {
  const { userProfile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const actionAsync = getProfileApi();
    dispatch(actionAsync);
  }, []);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userProfile?.email,
      password: userProfile?.password,
      name: userProfile?.name,
      phone: userProfile?.phone,
      gender: userProfile?.gender,
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email cannot be blank!")
        .email("Email is invalid!"),
      password: yup.string().required("Password cannot be blank!"),
      name: yup.string().required("Name cannot be blank!"),
      phone: yup
        .string()
        .matches(/^[0-9]+$/)
        .required("Phone cannot be blank!"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const actionAsync = updateProfileApi(values);
      dispatch(actionAsync);
    },
  });
  const handleRadioButtons = (e) => (form.values.gender = e.target.value);

  const renderCartDetail = (e, id) => {
    return e.map((prod, index) => {
      return (
        <>
          <tr key={index}>
            <td>{id}</td>
            <td>
              <img className="imgOder" src={prod.image} alt={prod.name} />
            </td>
            <td>{prod.name}</td>
            <td>{prod.price}$</td>
            <td>
              <span>{prod.quantity}</span>
            </td>
            <td>{(prod.price * prod.quantity).toLocaleString()}$</td>
          </tr>
        </>
      );
    });
  };
  const renderCartTbl = (e) => {
    const rows = [];
    for (const i in e) {
      rows.push(e[i]);
    }
    // console.log(rows)

    return rows.map((prod, index) => {
      if (prod.orderDetail.length !== 0)
        // console.log(prod)
        return (
          <>
            <div className="text-danger">
              +Oder have been placed on{prod.date}
            </div>
            <table
              key={index}
              className="table table-borderless carts__content mt-2"
            >
              <thead>
                <tr>
                  <td>id</td>
                  <td>img</td>
                  <td>name</td>
                  <td>price</td>
                  <td>quantity</td>
                  <td>total</td>
                </tr>
              </thead>
              <tbody>{renderCartDetail(prod.orderDetail, prod.id)}</tbody>
            </table>
          </>
        );
    });
  };
  return (
    <>
      <div className="title-profile d-flex align-items-center mt-5">
        {" "}
        <span>Profile</span>{" "}
      </div>
      <div className="update-profile">
        <div className="img">
          {" "}
          <img src={userProfile?.avatar} alt="..." />
        </div>
        <form action className="row ms-5 " onSubmit={form.handleSubmit}>
          <div className="left col-md-6">
            <div className="textInput">
              <input
                type="text"
                disabled
                readonly="true"
                name="email"
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className="input"
                placeholder="Your Email"
              />
              <div className="validation" id="validationEmail">
                {" "}
              </div>
            </div>
            {form.errors.email && (
              <p className="text-danger">{form.errors.email}</p>
            )}
            <div className="textInput">
              <input
                placeholder="Password"
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                type="password"
                name="password"
                className="input"
              />
              <div className="validation" id="validationPassword"></div>
            </div>
            {form.errors.password && (
              <p className="text-danger">{form.errors.password}</p>
            )}
          </div>
          <div className="right col-md-6">
            <div className="textInput">
              <input
                type="text"
                id="txtName"
                value={form.values.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="name"
                className="input "
                placeholder="Your Name"
              />
              <div className="validation" id="validationName"></div>
            </div>
            {form.errors.name && (
              <p className="text-danger">{form.errors.name}</p>
            )}

            <div className="textInput">
              <input
                type="text"
                value={form.values.phone}
                placeholder="Your Phone"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="phone"
                id="numberPhone"
                className="input"
              />
              <div className="validation" id="validationPhone"></div>
            </div>
            {form.errors.phone && (
              <p className="text-danger">{form.errors.phone}</p>
            )}

            <Radio.Group onChange={form.handleChange}
            onBlur={form.handleBlur} value={form.values.gender} className="inputGender d-md-flex justify-content-start align-items-center mb-4 py-2">
              <h6 className="mb-0 me-4">Gender: </h6>
           
                <Radio
                  className=""
                  onChange={(e) => handleRadioButtons(e)}
                  value={true}
                  name="inlineRadioOptions"
                  id="maleGender1"
                  defaultValue="true"
                />
                <label className="form-check-label" htmlFor="maleGender">
                  Male
                </label>
            
          
                <Radio
                  className=""
                 
                  onChange={(e) => handleRadioButtons(e)} value={false}
                  name="inlineRadioOptions"
                  id="femaleGender1"
                  defaultValue="false"
                />
                <label className="form-check-label" htmlFor="femaleGender">
                  Female
                </label>
            
            </Radio.Group>
            
            <div className="btn-submit">
              <button type="submit" className="submit" id="btnSubmit">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="carts">
        <h2 className="text-danger">Order history </h2>
        <hr />

        {renderCartTbl(userProfile?.ordersHistory)}
      </div>
    </>
  );
};

export default Profile;
