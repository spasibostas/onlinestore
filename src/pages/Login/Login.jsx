// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import './Login.scss'


// const Login = () => {

//   const [error, setError] = useState('')

//   const loginUser = () => {
//     axios
//       .post("http://localhost:1337/api/auth/local", {
//         identifier: username,
//         password: password,
//       })
//       .then((response) => {
//         // Handle success.
//         console.log("Well done!");
//         console.log("User profile", response.data);
//         console.log("User token", response.data.jwt);
//       })
//       .catch(error => {
//         // Handle error.
//         setError(error.response.data.error.message)
//         console.log("An error occurred:", error.response.data.error.message);
//       });
//   };

//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')

//   const [usernameDirty, setUsernameDirty] = useState(false)
//   const [passwordDirty, setPasswordDirty] = useState(false)

//   const [usernameError, setUsernameError] = useState('username не может быть пустым')
//   const [passwordError, setPasswordError] = useState('password не может быть пустым')

//   const [formValid, setFormValid] = useState(false)

//   useEffect(() => {
//     if (usernameError, passwordError) {
//       setFormValid(false)
//     } else {
//       setFormValid(true)
//     }
//   }, [usernameError, passwordError])

//   const handleChangeUsername = (e) => {
//     setUsername(e.target.value)
//     setUsername(e.target.value)
//     if (!e.target.value) {
//       setUsernameError('username не может быть пустым')
//     } else {
//       setUsernameError('')
//     }
//   }
//   const handleChangePassword = (e) => {
//     setPassword(e.target.value)
//     if (e.target.value.length < 6) {
//       setPasswordError('Пароль должен иметь как минимум 6 символов')
//       if (!e.target.value) {
//         setPasswordError('Пароль не может быть пустым')
//       } 
//     } else {
//       setPasswordError('')
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     loginUser();
//   }

//   const handleBlur = (e) => {
//     switch (e.target.name) {
//       case 'username':
//         setUsernameDirty(true)
//         break;
//       case 'password':
//         setPasswordDirty(true)
//         break;
//     }
//   }

//   return (
//     <div className='login'>
//         <form onSubmit={handleSubmit}>
//         <h1>Log in to your account</h1>
//       <label>
//         <p>Username or email</p>
//         {(usernameDirty && usernameError) && <div style={{color: 'red'}}>{usernameError}</div>}
//         <input name='username' onBlur={handleBlur} type="text" className='username' value={username} onChange={handleChangeUsername}/>
//       </label>
//       <label>
//         <p>Password</p>
//         {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
//         <input name='password' onBlur={handleBlur} type="password" className='password' value={password} onChange={handleChangePassword}/>
//       </label>
//       <div>
//         <button disabled={!formValid} type="submit" className='submit'>Sign in</button>
//       </div>
//     </form>
//     {error ? <div style={{color: 'red'}}>{error}</div> : null}
//     </div>
//   )
// }

// export default Login;


import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useScreenSize from "../../hooks/useScreenSize";
import { API } from "../../constant";
import { setToken } from "../../helpers";

const SignIn = () => {
  const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        setToken(data.jwt);

        setUser(data.user);
        console.log(data.user);

        message.success(`Welcome back ${data.user.username}!`);

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Row align="middle">
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <Card title="SignIn">
            {error ? (
              <Alert
                className="alert_error"
                message={error}
                type="error"
                closable
                afterClose={() => setError("")}
              />
            ) : null}
            <Form
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="Email address" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login_submit_btn"
                >
                  Login {isLoading && <Spin size="small" />}
                </Button>
              </Form.Item>
            </Form>
            <Typography.Paragraph className="form_help_text">
              New to ONLINESTORE? <Link to="/signup">Sign Up</Link>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignIn;