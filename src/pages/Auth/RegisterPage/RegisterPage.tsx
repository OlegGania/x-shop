import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signUp } from '@/features/auth/api/authApi';
import { notify } from '@/services/notify';
import RegisterForm from '@/features/auth/ui/RegisterForm/RegisterForm';

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({ mode: 'onBlur' });

  const registerMutation = useMutation({
    mutationFn: ({ name, email, password }: RegisterFormValues) => signUp(name, email, password),

    onSuccess: () => {
      notify.success('Account successfully created 🎉');
      navigate('/');
    },

    onError: (error: Error) => {
      const message = error.message.toLowerCase();

      if (message.includes('already') || message.includes('exists')) {
        setError('email', {
          type: 'server',
          message: 'This email is already registered',
        });
        return;
      }

      if (message.includes('password')) {
        setError('password', {
          type: 'server',
          message: 'Minimum 8 characters',
        });
        return;
      }

      notify.error('Registration failed. Please try again later.');
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
    });
  };

  return (
    <RegisterForm
      register={register}
      errors={errors}
      isPending={registerMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterPage;
