"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

import { useForgetpass } from "@/hooks/use-user";

type FormValues = {
  email: string
}

function Page() {
  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  })
  const { isPending, mutate } = useForgetpass()

  const onSubmit = (data: FormValues) => {
    mutate(data.email)
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="mb-1 text-xl font-semibold">Reset your password</h1>
        <p className="text-xs text-[#fff9]">
          Enter your email and we'll send a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label className="text-white/60" htmlFor="email">Email</label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is invalid",
              },
            })}
          />
          {
            errors.email &&
            <p className="text-xs text-red-400">{errors.email.message}</p>
          }
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-1.5 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </button>
      </form>

      <div className="mt-8 text-sm text-center text-[#fff9]">
        <p className="mb-1">Remember your password? <Link href="/signin" className="text-white hover:underline">Sign In</Link></p>
      </div>
    </>
  )
}

export default Page
