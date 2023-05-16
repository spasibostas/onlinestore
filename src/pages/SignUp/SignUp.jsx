// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import './SignUp.scss'



// const SignUp = () => {

//   const [error, setError] = useState('')

//   const registerUser = () => {
//     axios
//     .post('http://localhost:1337/api/auth/local/register', {
//       username: username,
//       email: email,
//       password: password
//     })
//     .then(response => {
//       // Handle success.
//       console.log('Well done!');
//       console.log('User profile', response.data.user);
//       console.log('User token', response.data.jwt);
//     })
//     .catch(error => {
//       // Handle error.
//       setError(error.response.data.error.message)
//       console.log('An error occurred:', error.response.data.error.message);
//     });
//   }

//   const [username, setUsername] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [passwordConfirm, setPasswordConfirm] = useState('')

//   const [usernameDirty, setUsernameDirty] = useState(false)
//   const [emailDirty, setEmailDirty] = useState(false)
//   const [passwordDirty, setPasswordDirty] = useState(false)
//   const [passwordConfirmDirty, setPasswordConfirmDirty] = useState('')

//   const [usernameError, setUsernameError] = useState('username не может быть пустым')
//   const [emailError, setEmailError] = useState('email не может быть пустым')
//   const [passwordError, setPasswordError] = useState('password не может быть пустым')
//   const [passwordConfirmError, setPasswordConfirmError] = useState('Подтвердите пароль')
  
//   const [formValid, setFormValid] = useState(false)

//   useEffect(() => {
//     if (emailError || passwordError || passwordConfirmError) {
//       setFormValid(false)
//     } else {
//       setFormValid(true)
//     }
//   }, [emailError, passwordError, passwordConfirmError])

//   const handleChangeUsername = (e) => {
//     setUsername(e.target.value)
//     if (!e.target.value) {
//       setUsernameError('username не может быть пустым')
//     } else {
//       setUsernameError('')
//     }
//   }

//   const handleChangeEmail = (e) => {
//     setEmail(e.target.value)
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     if (!re.test(String(e.target.value).toLowerCase())) {
//       setEmailError("Некорректный email")
//     } else {
//       setEmailError("")
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

//   const handleChangePasswordConfirm = (e) => {
//     setPasswordConfirm(e.target.value)
//     if (e.target.value !== password || !e.target.value) {
//       setPasswordConfirmError('Подтвердите пароль')
//     } else {
//       setPasswordConfirmError('')
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     registerUser();
//   }

//   const handleBlur = (e) => {
//     switch (e.target.name) {
//       case 'username':
//         setUsernameDirty(true)
//         break;
//       case 'email':
//         setEmailDirty(true)
//         break;
//       case 'password':
//         setPasswordDirty(true)
//         break;
//       case 'passwordConfirm':
//         setPasswordConfirmDirty(true)
//       break;
//     }
//   }

//   return (
//     <div className='sign-up'>
//         <form onSubmit={handleSubmit}>
//         <h1>Create an account</h1>
//       <label>
//         <p>Username</p>
//         {(usernameDirty && usernameError) && <div style={{color: 'red'}}>{usernameError}</div>}
//         <input name='username' value={username} onBlur={handleBlur} type="text" className='username' onChange={handleChangeUsername}/>
//       </label>
//       <label>
//         <p>email</p>
//         {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
//         <input name='email' value={email} onBlur={handleBlur} type="email" className='email' onChange={handleChangeEmail}/>
//       </label>
//       <label>
//         <p>Password</p>
//         {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
//         <input name='password' value={password} onBlur={handleBlur} type="password" className='password' onChange={handleChangePassword}/>
//       </label>
//       <label>
//         <p>Confirm the password</p>
//         {(passwordConfirmDirty && passwordConfirmError) && <div style={{color: 'red'}}>{passwordConfirmError}</div>}
//         <input name='passwordConfirm' value={passwordConfirm} onBlur={handleBlur} type="password" className='confirm' onChange={handleChangePasswordConfirm}/>
//       </label>
//       <div>
//           <button disabled={!formValid} type="submit" className='submit'>Sign up</button>
//       </div>
//     </form>
//     {error ? <div style={{color: 'red'}}>{error}</div> : null}
//     </div>
//   )
// }

// export default SignUp

    
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
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useScreenSize from "../../hooks/useScreenSize";
import { API } from "../../constant";
import { setToken } from "../../helpers";

const SignUp = () => {

  const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [formValid, setFormValid] = useState(false)

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome to ONLINESTORE ${data.user.username}!`);

        navigate("/userprofile", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value)
  }

  useEffect(() => {
    if (password !== passwordConfirm) {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }, [password, passwordConfirm])
    
  return (
    <Fragment>
      <Row align="middle">
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <Card title="SignUp">
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
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    type: "string",
                  },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
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
                <Input.Password placeholder="Password" onChange={handleChangePassword}/>
              </Form.Item>

              <Form.Item
                label="Confirm the password"
                name="passwordConfirm"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Confirm the password" onChange={handleChangePasswordConfirm}/>
              </Form.Item>
          
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login_submit_btn"
                  disabled={formValid}
                >
                  Submit {isLoading && <Spin size="small" />}
                </Button>
              </Form.Item>
            </Form>
            <Typography.Paragraph className="form_help_text">
              Already have an account? <Link to="/login">Sign In</Link>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignUp;