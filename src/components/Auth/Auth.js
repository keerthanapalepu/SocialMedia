import React, {useState,useEffect} from 'react'
import useStyles from './styles';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './input';
import Icon from './Icon';
import { gapi } from "gapi-script";
import { GoogleLogin } from 'react-google-login';
import {useDispatch} from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  useEffect(() => {
   function start() {
     gapi.client.init({
       clientId: "522723898768-cgmqa9a28a4qgl6r7uedd5oej8ui9ka2.apps.googleusercontent.com",
       scope: 'email',
     });
   }

   gapi.load('client:auth2', start);
 }, []);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
      dispatch(signup(formData, navigate));
    }
    else{
      dispatch(signin(formData, navigate));
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData , [e.target.name]: e.target.value});
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = async (error) => {
     await console.log(error);
    await console.log("try again later");
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  return (
    <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
           { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
      </Grid>

      <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
       </Button>




       <GoogleLogin
           clientId="522723898768-cgmqa9a28a4qgl6r7uedd5oej8ui9ka2.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
           buttonText="Login"
           onSuccess={googleSuccess}
           onFailure={googleError}
           cookiePolicy={'single_host_origin'}
         />

       <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
  )
}

export default Auth
