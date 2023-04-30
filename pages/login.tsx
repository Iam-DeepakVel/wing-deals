import BaseLayout from "@/common/BaseLayout";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function LoginScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = ({ email, password }) => {
    console.log(email, password);
  };
  return (
    <BaseLayout title="Login">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-screen-md"
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email")}
            className=" w-full"
            id="email"
            autoFocus
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password")}
            className=" w-full"
            id="password"
            autoFocus
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          {`Don't have an account?`} &nbsp;
          <Link href="/register">Register</Link>
        </div>
      </form>
    </BaseLayout>
  );
}
