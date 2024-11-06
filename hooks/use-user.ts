import { useMutation, useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";

import { deleteUser, forgetPass, getUserMLId, resetPass, updateUser } from "@/actions";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";

export function useUser() {
  const { data } = useSession()
  const email = data?.user?.email || ""

  const { isLoading, data: userMl } = useQuery({
    queryKey: ["user-ml-id", email],
    queryFn: () => getUserMLId(email),
    enabled: !!email,
  })

  return {
    isLoading,
    userId: userMl?.userId || "",
    email,
  }
}

export function useUpadtePassword() {
  const { toast } = useToast()

  return useMutation({
    mutationFn: updateUser,
    onSuccess() {
      toast({ title: "Password updated successfully" })
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })
}

export function useForgetpass() {
  const { toast } = useToast()
  const router = useRouter()

  return useMutation({
    mutationFn: forgetPass,
    onSuccess() {
      toast({ title: "Check your email" })
      router.push("/reset-password")
    },
    onError(err) {
      toast({
        // @ts-ignore
        title: err?.response?.data || "Something went wrong!",
        description: "Please try again later"
      })
    }
  })
}

export function useResetpass() {
  const { toast } = useToast()
  const router = useRouter()

  return useMutation({
    mutationFn: resetPass,
    onSuccess() {
      toast({ title: "Password reseted successfully" })
      router.push("/signin")
    },
    onError(err) {
      console.log(err.message)
      toast({
        // @ts-ignore
        title: err?.response?.data || "Something went wrong!",
        description: "Please try again later"
      })
    }
  })
}

export function useDeleteUser() {
  const { toast } = useToast()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess() {
      signOut({ callbackUrl: "/" }).then(() => {
        toast({ title: "Account deleted successfully" })
      })
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })
}