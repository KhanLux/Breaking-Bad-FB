import { useState } from "react";
import Swal from "sweetalert2";
import { helpHttp } from "../helpers/helpHttp";

export const useForm = (initialForm, validateForm, url) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      helpHttp()
        .post(url, {
          body: form,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          setLoading(false);
          setResponse(true);
          setData(res);
          setForm(initialForm);
          Swal.fire({
            icon: 'success',
            title: res.msg,
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => setResponse(false), 5000);
        });
    } else {
      return;
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    data,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};