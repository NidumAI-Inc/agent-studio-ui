"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { useUpadtePassword } from "@/hooks/use-user";

function UpdateUser() {
  const { data } = useSession()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      password: ""
    }
  })

  const { mutate } = useUpadtePassword()

  function onSubmit(payload: any) {
    mutate({
      email: data?.user?.email || "",
      password: payload?.password
    })
  }

  return (
    <div className="mb-8 max-w-md mx-auto rounded-2xl border bg-background/10">
      <div className="px-4 py-2 border-b">
        <h2 className="text-lg">Settings</h2>
        <p className="text-xs text-foreground/50">Customize your account details.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="mb-4">
          <label className="text-white/60" htmlFor="email">Email</label>
          <input
            value={data?.user?.email || ""}
            onChange={() => { }}
            disabled
          />
        </div>

        <div className="mb-6">
          <label className="text-white/60" htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              {...register("password", {
                required: "Password is required",
                // pattern: {
                //   value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                //   message: "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
                // },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
          </div>

          {
            errors.password &&
            <div className="text-xs text-red-400">{errors.password.message}</div>
          }
        </div>

        <button
          type="submit"
          className="w-full py-1.5 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Update New Password
        </button>
      </form>
    </div>
  )
}

export default UpdateUser
