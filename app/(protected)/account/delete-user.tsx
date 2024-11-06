"use client";

import { useState } from "react";

import { useDeleteUser, useUser } from "@/hooks/use-user";

function DeleteUser() {
  const { userId, email: emailId } = useUser()
  const [email, setEmail] = useState("")

  const { mutate } = useDeleteUser()

  function onDelete() {
    mutate(userId)
  }

  return (
    <div className="mb-8 max-w-md mx-auto rounded-2xl border bg-background/10">
      <div className="px-4 py-2 border-b">
        <h2 className="text-lg">Delete Account</h2>
        <p className="text-xs text-foreground/50">Permanently remove your account and all its contents. Upon deletion of your account, any orgs without any members will be deleted immediately. Neither the account, nor the orgs will be recoverable. Proceed with caution.</p>
      </div>

      <div className="p-4">
        <div className="mb-1 text-xs text-foreground/50">
          To confirm, please type your email address: <span className="text-white">{emailId}</span>
        </div>

        <div className="mb-4">
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <button
          className="px-3 py-1.5 text-sm bg-red-400 text-foreground hover:bg-red-500"
          disabled={emailId !== email}
          onClick={onDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  )
}

export default DeleteUser
