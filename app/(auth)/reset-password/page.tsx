"use client";

import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useForm } from "react-hook-form";

import { useResetpass } from "@/hooks/use-user";

type FormValues = {
  email: string
  passKey: string
  password: string
}

function Page() {
  const [showPass, setShowPass] = useState(false)

  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passKey: "",
    },
  })

  const { isPending, mutate } = useResetpass()
  const onSubmit = (data: FormValues) => {
    mutate(data)
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="mb-1 text-xl font-semibold">Reset Password</h1>
        <p className="text-xs text-[#fff9]">
          Easily manage your autonomous voice agents all in one dashboard.
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

        <div className="mb-6">
          <label className="text-white/60" htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPass ? "text" : "password"}
              className="pr-7"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              onClick={() => setShowPass(p => !p)}
            >
              {!showPass ? <LuEye /> : <LuEyeOff />}
            </button>
          </div>

          {
            errors.password &&
            <div className="text-xs text-red-400">{errors.password.message}</div>
          }
        </div>

        <div className="mb-6">
          <label className="text-white/60" htmlFor="apsskey">Pass Key</label>
          <div className="relative">
            <input
              id="apsskey"
              type="text"
              className="pr-7"
              {...register("passKey", {
                required: "Pass key is required",
                minLength: {
                  value: 6,
                  message: "Pass key must be at least 6 characters",
                },
              })}
            />
          </div>

          {
            errors.passKey &&
            <div className="text-xs text-red-400">{errors.passKey.message}</div>
          }
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mb-2 py-1.5 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Confirm
        </button>
      </form>
    </>
  )
}

export default Page
