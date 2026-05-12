import { Link } from 'react-router-dom';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import Button from '@/shared/ui/Button/Button';
import classes from './RegisterForm.module.scss';
import { useState } from 'react';

type RegisterFormFields = {
  name: string;
  email: string;
  password: string;
};

type RegisterFormProps = {
  register: UseFormRegister<RegisterFormFields>;
  errors: FieldErrors<RegisterFormFields>;
  isPending: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const RegisterForm = ({ register, errors, isPending, onSubmit }: RegisterFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
      <form className={classes.formRegister} onSubmit={onSubmit}>
        <div className={classes.formInner}>
          <label className={classes.formLabel}>
            <input
              className={classes.formInput}
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Minimum 2 characters' },
              })}
              type="text"
              placeholder="Enter your name"
              autoComplete="name"
            />
            <svg
              className={classes.formIcon}
              width="24"
              height="24"
              viewBox="143 143 514 514"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path d="m288.04 288.04h-0.003907c0 40 21.34 76.961 55.98 96.961s77.316 20 111.96 0c34.641-20 55.98-56.961 55.98-96.961 0-39.996-21.34-76.957-55.98-96.957-34.641-20-77.316-20-111.96 0s-55.98 56.961-55.98 96.957z" />
              <path d="m427.99 400-27.988 55.98 27.988 83.969-27.988 27.988-27.988-27.988 27.988-83.969-27.988-55.98h-0.003907c-54.41 6.8516-104.41 33.438-140.53 74.711-36.113 41.27-55.824 94.363-55.395 149.2h447.83c0.42969-54.84-19.281-107.93-55.395-149.2-36.113-41.273-86.121-67.859-140.53-74.711z" />
            </svg>
          </label>
          {errors?.name && <p style={{ color: 'crimson' }}>{errors.name.message}</p>}

          <label className={classes.formLabel}>
            <input
              className={classes.formInput}
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            <svg
              className={classes.formIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_591_106)">
                <path
                  d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_591_106">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </label>
          {errors?.email && <p style={{ color: 'crimson' }}>{errors.email.message}</p>}

          <label className={classes.formLabel}>
            <input
              className={`${classes.formInput} ${classes.formInputPassword}`}
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
              autoComplete="new-password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Minimum 8 characters' },
              })}
            />
            <svg
              className={classes.formIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_591_24)">
                <path
                  d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_591_24">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <button
              type="button"
              className={classes.formIconVisibilityBtn}
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}>
              {isPasswordVisible ? (
                <svg
                  className={classes.formIconVisibility}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true">
                  <path
                    d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                    fill="#78788C"
                  />
                </svg>
              ) : (
                <svg
                  className={classes.formIconVisibility}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_591_28)">
                    <path
                      d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.26 7.61 16.99 4.5 11.99 4.5C10.59 4.5 9.25 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.74 7.01C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z"
                      fill="#78788C"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_591_28">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </button>
          </label>
          {errors?.password && <p style={{ color: 'crimson' }}>{errors.password.message}</p>}
        </div>

        <Button
          text={isPending ? 'Creating...' : 'Create account'}
          variant="dark"
          type="submit"
          disabled={isPending}
          style={{ width: '100%', marginBottom: '16px' }}
        />

        <div className={classes.formRegisterBox}>
          <span className={classes.formRegisterSpan}>Already Have Account?</span>
          <Link to="/login" className={classes.formRegisterLink}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
