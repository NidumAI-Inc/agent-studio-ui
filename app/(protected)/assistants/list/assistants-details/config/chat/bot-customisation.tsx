import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GoDependabot } from "react-icons/go";
import { useForm } from "react-hook-form";

import { useChatBot, useUpdateChatBot } from '@/hooks/use-chat-bot';
import { uploadImg } from "@/actions";
import { useToast } from '@/hooks/use-toast';

type props = {
  id: string
}

type FormInput = {
  background_color: string
  text_color: string
  height: string
  width: string
}

function BotCustomisation({ id }: props) {
  const [preview, setPreview] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const { mutate, isPending } = useUpdateChatBot()
  const { data: botDetails } = useChatBot(id)
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { formState: { isDirty }, register, handleSubmit, reset } = useForm<FormInput>({
    defaultValues: {
      background_color: botDetails?.background_color || "",
      text_color: botDetails?.text_color || "",
      height: botDetails?.height || "",
      width: botDetails?.width || "",
    }
  })

  useEffect(() => {
    if (botDetails) {
      reset({
        background_color: botDetails?.background_color || "",
        text_color: botDetails?.text_color || "",
        height: botDetails?.height || "",
        width: botDetails?.width || "",
      })
    }
  }, [botDetails])

  const { mutate: mutateUploadImg, isPending: isPending2 } = useMutation({
    mutationFn: uploadImg,
    onSuccess(res) {
      if (res.id) {
        mutate(
          {
            assistant_id: id,
            img_id: res.id
          },
          {
            onSuccess() {
              queryClient.invalidateQueries({ queryKey: ["chat-bot", id] })
              toast({ title: "Image uploaded successfully" })
            }
          }
        )
      }
    }
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onUpload() {
    if (file) {
      mutateUploadImg(file)
    }
  }

  const onSubmit = (data: FormInput) => {
    mutate(
      {
        assistant_id: id,
        ...data
      },
      {
        onSuccess() {
          reset(data)
          queryClient.invalidateQueries({ queryKey: ["chat-bot", id] })
          toast({ title: "Details upadted" })
        },
        onError() {
          toast({
            title: "Something went wrong!",
            description: "Please try again later"
          })
        }
      }
    )
  }

  return (
    <div className="grid @lg:grid-cols-3 gap-6 items-start">
      <div className="">
        <p className="mb-0.5 text-foreground/70">Upload your agent image</p>
        <label className='dc size-40 gap-0 rounded-md border'>
          <input
            type="file"
            className='size-0 p-0'
            accept="image/*"
            multiple={false}
            onChange={handleFileChange}
          />
          {
            (preview || botDetails?.img_id)
              ? (
                <img
                  className="size-40 rounded-md border object-cover"
                  src={preview || `/api/images/${botDetails?.img_id}`}
                  alt=""
                />
              ) :
              <GoDependabot className="text-5xl text-foreground/60" />
          }
        </label>

        {
          preview &&
          <button
            onClick={onUpload}
            disabled={isPending2}
            className="mt-2 ml-14 text-xs bg-primary text-primary-foreground"
          >
            Change Image
          </button>
        }
      </div>

      <form
        className="col-span-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="df mb-4 text-xs">
          <label htmlFor="" className="w-32 shrink-0 text-foreground/70">Background Colour</label>
          <input
            type="color"
            className="w-16 p-0 border-none"
            {...register("background_color")}
          />
        </div>

        <div className="df mb-4 text-xs">
          <label htmlFor="" className="w-32 shrink-0 text-foreground/70">Text Colour</label>
          <input
            type="color"
            className="w-16 p-0 border-none"
            {...register("text_color")}
          />
        </div>

        <div className="df mb-4 text-xs">
          <label htmlFor="" className="w-32 shrink-0 text-foreground/70">Bot Width</label>
          <input
            className="w-32 h-8 bg-background/80 border-none"
            {...register("width")}
          />
        </div>

        <div className="df mb-4 text-xs">
          <label htmlFor="" className="w-32 shrink-0 text-foreground/70">Bot Height</label>
          <input
            className="w-32 h-8 bg-background/80 border-none"
            {...register("height")}
          />
        </div>

        {isDirty && (
          <button
            type="submit"
            disabled={isPending}
            className="df text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  )
}

export default BotCustomisation
