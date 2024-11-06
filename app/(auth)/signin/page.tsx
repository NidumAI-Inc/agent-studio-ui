"use client";

import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react';
import Link from "next/link";

import { useToast } from "@/hooks/use-toast";

type FormValues = {
  email: string
  password: string
}

function Page() {
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const status = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        ...data
      })
      if (status?.ok) {
        toast({ title: "Logged in successfully" })
        return router.push("/overview")
      } else {
        let payload: any = {
          title: "Something went wrong!!!",
          description: "Try again, later.",
        }
        if (status?.error) {
          payload = {
            title: status?.error
          }
        }
        toast(payload)
      }

    } catch (error) {
      toast({
        title: "Something went wrong!!!",
        description: "Try again, later.",
      })
    }
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="mb-1 text-xl font-semibold">Sign into your account</h1>
        <p className="text-xs text-[#fff9]">
          Easily manage your autonomous voice agents all in one dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
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
              type={showPassword ? "text" : "password"}
              className="pr-7"
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
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              onClick={() => setShowPassword(p => !p)}
            >
              {!showPassword ? <LuEye /> : <LuEyeOff />}
            </button>
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
          Sign In
        </button>
      </form>

      <div className="mt-8 text-sm text-center text-[#fff9]">
        <p className="mb-1">Don't have an account?  <Link href="/signup" className="text-white hover:underline">Sign Up</Link></p>
        <Link href="/forgot-password" className="text-white hover:underline">Forgot your password?</Link>
      </div>
    </>
  )
}

export default Page
