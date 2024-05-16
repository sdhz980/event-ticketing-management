import FormInput from '@/components/Forminput';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import validationSchema from '../(auth)/login/validationSchema';
import { toast } from 'react-toastify';
import useLogin from '../hooks/api/auth/useLogin';

const RegisterForm = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const { login } = useLogin();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        referralCode: '',
      },
      validationSchema,
      onSubmit: (values) => {
        const idLoading = toast.loading('Submitting register form');
        login(values).finally(() => toast.done(idLoading));
      },
    });
  const handleExpandedRegisterForm = () => {
    if (!errors.email && values.email.length > 2) {
      setExpanded(!expanded);
    } else {
      toast.error('Please input your email');
    }
  };
  return (
    <>
      <div className="rounded-lg border bg-indigo-950 w-full bg-card text-card-foreground shadow-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl text-[#ffff00]">
            Login Account
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 transition-all duration-300">
          <form onSubmit={handleSubmit} className="transition-all duration-300">
            <div className="grid w-full items-center gap-10 transition-all duration-300">
              <FormInput
                name="email"
                type="text"
                label="Email"
                placeholder="Email"
                value={values.email}
                error={errors.email}
                isError={!!touched.email && !!errors.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <>
                <FormInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  value={values.password}
                  error={errors.password}
                  isError={!!touched.password && !!errors.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </>

              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => {
                    if (errors.email) toast.error(errors.email);
                    if (errors.password) toast.error(errors.password);
                  }}
                  type="submit"
                  className="w-full bg-transparent duration-300 transition-all hover:bg-[#ffff00] hover:text-indigo-950 text-xl h-14 text-[#ffff00] border-2 rounded-2xl border-[#ffff00]"
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
          {/*  */}
          <div className="flex md:flex-row md:pt-0 pt-4 flex-col text-center justify-center items-center text-[#ffff00] gap-2">
            <p className="w-full text-sm">Do you want to register?</p>
            <Button
              onClick={() => router.push('/register')}
              className="w-full bg-transparent duration-300 font-normal text-base transition-all hover:bg-[#ffff00] hover:text-indigo-950 h-10 text-[#ffff00] border-b-2 border-[#ffff00]"
            >
              Register
            </Button>
          </div>
          <div className="text-[#ffff00] flex md:flex-row flex-col text-center gap-2 justify-center items-center">
            <p className="w-full text-sm">Are you forgot your password?</p>
            <Button
              onClick={() => router.push('/login/forgot-password')}
              className="w-full bg-transparent duration-300 font-normal text-base transition-all hover:bg-[#ffff00] hover:text-indigo-950 h-10 text-[#ffff00] border-b-2 border-[#ffff00]"
            >
              Forgot Password
            </Button>
          </div>
          {/*  */}
        </CardContent>
      </div>
    </>
  );
};

export default RegisterForm;
