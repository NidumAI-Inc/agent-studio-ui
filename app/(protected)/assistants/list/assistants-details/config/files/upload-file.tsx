"use client";

import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDropzone, FileRejection } from 'react-dropzone';
import { AiOutlineFileAdd } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";

import { uploadFilesAgent } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";

type props = {
  id: string
  files: string[]
}

function UploadFile({ id, files: uploadedFiles }: props) {
  const queryClient = useQueryClient()
  const { userId } = useUser()
  const { toast } = useToast()

  const [files, setFiles] = useState<File | null>(null)
  const acceptedFileTypes = {
    'application/pdf': ['.pdf'],
  }

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) return;

    if (acceptedFiles?.[0].size > (20.12 * 1024 * 1024)) {
      return toast({ title: "Files exceeding 20MB cannot be uploaded" })
    }

    if (uploadedFiles.length >= 4) {
      return toast({ title: "Cannot upload more than 4 files" })
    }

    if (uploadedFiles.includes(acceptedFiles?.[0]?.name)) {
      return toast({
        title: "Same file name exists already",
        description: "Delete old file or rename new file"
      })
    }
    setFiles(acceptedFiles[0]);
  }, [uploadedFiles])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: false,
    maxFiles: 1,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => uploadFilesAgent({ userId, agentId: id, }, payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["agent-files-list"] })
      setFiles(null)
      toast({ title: "File uploaded successfully" })
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })

  function onSubmit() {
    try {
      if (files) {
        const payload = new FormData()
        payload.append("files", files)
        mutate(payload as any)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mb-4 p-4 rounded-xl border bg-background/30 @container">
      <div
        className="dfc items-center mb-4 px-6 py-8 text-foreground/40 border-2 border-dashed rounded-2xl text-center bg-input/40"
        {...getRootProps()}
      >
        <input id="file-input" {...getInputProps()} className="size-0" />
        <AiOutlineFileAdd className="text-4xl text-foreground/30" />
        <p className="-mb-1.5 text-sm">Drag and drop a file here or click to select file locally.</p>
        <p className="text-xs">Note: Upload up to 4 files, each no larger than 20MB; only PDF format is supported.</p>

        {files && (
          <p className="text-xs text-foreground">{files.name}</p>
        )}
      </div>

      {
        files &&
        <button
          onClick={onSubmit}
          disabled={isPending}
          className="ml-auto px-4 py-2 text-sm font-semibold bg-primary/95 text-primary-foreground border-t-[3px] border-white/30 rounded-md rounded-t-lg hover:bg-primary"
        >
          Upload File <IoIosAddCircle className="opacity-50" />
        </button>
      }
    </div>
  )
}

export default UploadFile
