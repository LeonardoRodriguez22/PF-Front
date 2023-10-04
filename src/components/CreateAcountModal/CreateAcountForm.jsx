import React, { useState } from "react";
import { Input, Button, message, Select } from "antd";
import { Field, useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import "./createAcountModal.css";
import postUser from "../../redux/Actions/User/postUser";
import { provincias } from "./Provincias";
import "./createAcountForm.css"

const CreateAcountForm = ({ onClose }) => {
  const { values, errors, resetForm } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const address= `${values.calle} ${values.numero} ${values.dpto}, entre: ${values.entreCalles}, ${values.localidad} - ${values.codigoPostal}, ${values.provincia}`;

    const valuesToSend = {
      name: values.name,
      surname: values.surname,
      phone: values.phone,
      address: address,
      email: values.email,
      password: values.password}

    try {
      const response = await dispatch(postUser(valuesToSend));

      if (response.message === "Usuario creado correctamente") {
        message.success(response.message, [2], onClose());
      } else {
        message.error("Error al crear la cuenta", [2], onClose());
      }
      onClose();
      resetForm();
    } catch {
      message.error("Error al crear la cuenta", [2], onClose());
    }
  };

  return (
    <>
      <div className="containerFormCreateAcount">
        <Field id="name" name="name">
          {/* Todos los field tienen que tener un name y un id por defecto, lo que cambia es el valor que yo le envìo */}
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Input {...field} placeholder="Nombre*" autoComplete="off" />
                {errors.name && (
                  <p className="createProductError">{errors.name}</p>
                )}
              </div>
            );
          }}
        </Field>
        <Field id="surname" name="surname">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Input {...field} placeholder="Apellido*" autoComplete="off" />
                {errors.surname && (
                  <p className="createProductError">{errors.surname}</p>
                )}
              </div>
            );
          }}
        </Field>
        <Field id="phone" name="phone">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Input
                  {...field}
                  placeholder="Teléfono/celular*"
                  autoComplete="off"
                />
                {errors.phone && (
                  <p className="createProductError">{errors.phone}</p>
                )}
              </div>
            );
          }}
        </Field>
        <div className="createAcountCalleNumDpto">
          <Field id="calle" name="calle">
            {({ field, form, meta, error }) => {
              return (
                <div className="fieldAndError">
                  <Input {...field} placeholder="Calle*" autoComplete="off" />
                  {errors.calle && (
                    <p className="createProductError">{errors.calle}</p>
                  )}
                </div>
              );
            }}
          </Field>
          <Field id="numero" name="numero">
            {({ field, form, meta, error }) => {
              return (
                <div className="fieldAndError">
                  <Input {...field} placeholder="Número*" autoComplete="off" />
                  {errors.numero && (
                    <p className="createProductError">{errors.numero}</p>
                  )}
                </div>
              );
            }}
          </Field>
          <Field id="dpto" name="dpto">
            {({ field, form, meta, error }) => {
              return (
                <div className="fieldAndError">
                  <Input {...field} placeholder="Dpto" autoComplete="off" />
                  {errors.dpto && (
                    <p className="createProductError">{errors.dpto}</p>
                  )}
                </div>
              );
            }}
          </Field>
        </div>
        <Field id="entreCalles" name="entreCalles">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Input
                  {...field}
                  placeholder="Entre calles*"
                  autoComplete="off"
                />
                {errors.entreCalles && (
                  <p className="createProductError">{errors.entreCalles}</p>
                )}
              </div>
            );
          }}
        </Field>
        <div className="createAcountCalleNumDpto">
        <Field id="localidad" name="localidad">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Input {...field} placeholder="Localidad*" autoComplete="off" />
                {errors.localidad && (
                  <p className="createProductError">{errors.localidad}</p>
                )}
              </div>
            );
          }}
        </Field>
        <Field id="codigoPostal" name="codigoPostal">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Input
                  {...field}
                  placeholder="Código postal*"
                  autoComplete="off"
                />
                {errors.codigoPostal && (
                  <p className="createProductError">{errors.codigoPostal}</p>
                )}
              </div>
            );
          }}
        </Field>
        </div>
        <Field id="provincia" name="provincia">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Select
                  {...field}
                  options={provincias}
                  onChange={(value) => form.setFieldValue("provincia", value)}
                  style={{ width: "100%" }}
                />
                {errors.provincia && (
                  <p className="createProductError">{errors.provincia}</p>
                )}
              </div>
            );
          }}
        </Field>
        <Field id="email" name="email">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <Input {...field} placeholder="Email*" autoComplete="off" />
                {errors.email && (
                  <p className="createProductError">{errors.email}</p>
                )}
              </div>
            );
          }}
        </Field>
        <Field id="password" name="password">
          {({ field, form, meta, error }) => {
            return (
              <div className="fieldAndError">
                <div className="inputCreateAcountContainer">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password*"
                    autoComplete="off"
                  />
                  <Button
                    style={{
                      width: 80,
                    }}
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Button>
                </div>
                {errors.password && (
                  <p className="createProductError">{errors.password}</p>
                )}
              </div>
            );
          }}
        </Field>
        {/* <Field id="confirmPassword" name="confirmPassword">
        {({ field, form, meta, error }) => {
          return (
            <div className="fieldAndError">
               <div className="inputCreateAcountContainer">
                <Input.Password
                  {...field}
                  placeholder="Confirmar Password"
                  autoComplete="off"
                  visibilityToggle={{
                    visible: showPassword,
                    onVisibleChange: !showPassword,
                  }}
                />
                <Button
                  style={{
                    width: 80,
                  }}
                  onClick={() => setShowPassword((prevState) => !prevState)}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Button>
              </div>
              {errors.confirmPassword && (<p className="createProductError">{errors.confirmPassword}</p>)}
            </div>
          );
        }}
      </Field> */}
        <div className="createCategoryButtons">
          <ButtonSecondary
            title="Cancelar"
            type="button"
            onClick={() => onClose()}
          />
          <ButtonPrimary
            title="Crear"
            type="button"
            onClick={() => handleSubmit()}
            disbled={
              errors.name ||
              errors.surname ||
              errors.phone ||
              errors.calle ||
              errors.numero ||
              errors.entreCalles ||
              errors.localidad ||
              errors.codigoPostal ||
              errors.provincia ||
              errors.email ||
              errors.password
            }
          />
        </div>
      </div>
    </>
  );
};

export default CreateAcountForm;
