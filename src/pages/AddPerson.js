import React, { useState } from "react";

import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";

const AddPerson = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupsState } = useSelector((state) => state);
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
    surname: "",
    number: "",
    groupId: groupsState.groups[0].id,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    /* validation */
    if (form.name === "" || form.surname === "" || form.groupId === "") {
      alert("Kişi adı-soyadı ve numara alanı zorunludur");
      return;
    }
    if (form.name.length < 2) {
      alert("Kişi ismi 2 karakterden az olamaz");
      return;
    }

    /* request to api && dispatch store */
    api
      .post(urls.persons, form)
      .then((res) => {
        dispatch({
          type: actionTypes.personActions.ADD_PERSON,
          payload: form,
        });
        navigate("/");
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="ADI"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="surname"
              placeholder="SOYADI"
              value={form.surname}
              onChange={(event) =>
                setForm({ ...form, surname: event.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              id="number"
              placeholder="TELEFON NUMARASI"
              value={form.number}
              onChange={(event) =>
                setForm({ ...form, number: event.target.value })
              }
            />
          </div>
          <select
            className="form-select"
            defaultValue={groupsState.groups[0].id}
            value={form.groupId}
            onChange={(event) =>
              setForm({ ...form, groupId: event.target.value })
            }
          >
            {groupsState.groups.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-50" type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPerson;
