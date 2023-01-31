import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { Formik } from 'formik';
import { chekoutSchema, initialValues } from './validation';
import Shipping from '../../components/Shipping';
import { shades } from '../../styles/theme';
import Payment from '../payment';
import { makePayment } from './makePayment';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue('shippingAddress', {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
    if (isSecondStep) {
      makePayment(values, cart);
    }
    actions.setTouched({});
  };

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: '20px 0' }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={chekoutSchema[activeStep]}
          isSubmitting
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: 'none',
                      color: ' white',
                      borderRadius: 0,
                      padding: '15px 40px',
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: 'none',
                    color: ' white',
                    borderRadius: 0,
                    padding: '15px 40px',
                  }}
                  disabled={!(dirty && isValid) && isFirstStep}
                >
                  {isFirstStep ? 'Next' : 'Place Order'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default React.memo(Checkout);
