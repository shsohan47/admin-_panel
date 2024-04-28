import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';


// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import authStore from 'store/store/authStore';
import error from 'utils/responseMessage';
import { useNavigate } from 'react-router';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = () => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const store = authStore();
  const [errorMessage,setErrorMessage] = useState("")
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  

  const handleSubmit = async(e)=>
  {
    
    e.preventDefault()
    try{
      await store.registration();
      // setSignUpSuccess(true);
      setErrorMessage("")
    }catch(err)
    {
      const errorMessage = error(err);
      setErrorMessage(errorMessage);
      // setSignUpSuccess(false);
    }
  }

  useEffect(() => {
    if(store.isRegister)
    {
      navigate("/pages/login/login3")
    }
  }, [store.isRegister,navigate]);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, isSubmitting, touched }) => (
          <form noValidate onSubmit={handleSubmit}>
           
            <FormControl fullWidth  sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={store.registrationForm.email}
                name="email"
                onBlur={handleBlur}
                onChange={store.updateRegistrationForm}
                inputProps={{}}
              />
              
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={store.registrationForm.Password}
                name="Password"
                label="Password"
                onBlur={handleBlur}
                onChange={store.updateRegistrationForm}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={store.registrationForm.ConfirmPassword}
                name="ConfirmPassword"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={store.updateRegistrationForm}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {errorMessage && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errorMessage}
                </FormHelperText>
              )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
