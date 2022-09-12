import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Button, Card, CardHeader, IconButton, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";

const GetPassModel = () => {
  const [open, setOpen] = useState(false);
  const validationSchema = yup.object({
    password: yup.string().required("please provide password"),
  });
  const handelSubmit = (values) => {};
  return (
    <div>
      <Modal open={open}>
        <Formik
          initialValues={{ password: "" }}
          validationSchema={validationSchema}
          onSubmit={handelSubmit}
        >
          {({ setFieldValue }) => {
            <Form>
              <TextField
                label="password"
                onChange={(e) => {
                  setFieldValue("password", e.target.value);
                }}
                variant="outlined"
              />
            </Form>;
            <Button>Get password</Button>;
          }}
        </Formik>
      </Modal>
    </div>
  );
};

export default GetPassModel;
