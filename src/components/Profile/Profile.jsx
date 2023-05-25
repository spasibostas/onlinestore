import React from 'react'
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { removeToken } from "../../helpers";
import './Profile.scss'


export const Profile = ({ toggle }) => {
    
      const { user } = useAuthContext();
      const navigate = useNavigate();

    
      const handleLogout = () => {
        removeToken();
        toggle();
        navigate("/login", { replace: true });
      };

      return (
        <Space className="profile">
          <Space className="auth_buttons">
            {user ? (
              <>
                <Button className="auth_button_login" href="/userprofile" type="link">
                  {user.username}
                </Button>
                <Button
                  className="auth_button_signUp"
                  type="primary"
                  onClick={handleLogout}
                  href='/login'
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button className="auth_button_login" href="/login" type="link">
                  Login
                </Button>
                <Button
                  className="auth_button_signUp"
                  href="/signup"
                  type="primary"
                >
                  SignUp
                </Button>
              </>
            )}
          </Space>
        </Space>
      );
}

export default Profile