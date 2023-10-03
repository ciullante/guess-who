import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});


function LoginForm(props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data) {
    try {
      const { email: username, password } = data;
      await props.validateLogin(username, password);
      navigate("/");
    } catch (error) {
      setError("root.serverError", {
        type: "401",
        message: "username or password incorrect",
      });
    }
  }

  return (
    <>
      <Form
        style={{ marginBottom: 30 }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register("email")}
            type="email"
            placeholder="E-mail"
            isInvalid={errors.email || errors.root?.serverError}
            isValid={!errors.email &&  !errors.root?.serverError && dirtyFields.email} 
          />
          <Form.Control.Feedback type="invalid">
            {errors.root?.serverError.message
              ? errors.root.serverError.message
              : errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password")}
            type="password"
            placeholder="password"
            isInvalid={errors.password || errors.root?.serverError}
            isValid={!errors.password && !errors.root?.serverError && dirtyFields.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </Button>
        <br />
      </Form>
    </>
  );
}

export { LoginForm };