"use client";

import { Controller, FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdOutlineCampaign } from "react-icons/md";
import { LuPlusCircle, LuTrash } from "react-icons/lu";
import PhoneInput from 'react-phone-input-2';

import { addNumsToCampaign } from "@/actions";
import useModelStore from "@/store/model";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FormField = {
  phone_number: string
}

interface FormInput {
  fields: FormField[]
}

function AddMembers() {
  const closeModel = useModelStore(s => s.closeModel)
  const modelData = useModelStore(s => s.data)

  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { email } = useUser()

  const { control, handleSubmit, formState: { errors } } = useForm<FormInput>({
    defaultValues: {
      fields: [{ phone_number: "" }]
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields'
  })

  const { mutate, isPending } = useMutation({
    mutationFn: addNumsToCampaign,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["campaign", email, modelData?.campaign_id] })
      toast({ title: "Numbers added to the campaign" })
      closeModel()
    },
    onError() {
      toast({
        title: "Something went wrong!",
        description: "Please try again later"
      })
    }
  })

  const getFieldErrors = (index: number): FieldErrors<FormField> | undefined => {
    return errors.fields?.[index] as FieldErrors<FormField> | undefined
  }

  function onSubmit(data: FormInput) {
    mutate({
      email,
      campaign_id: modelData?.campaign_id,
      nums: data?.fields?.map(d => d.phone_number)
    })
  }

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="df pb-4 px-4 -mx-4 text-lg font-bold border-b">
            <MdOutlineCampaign className="text-foreground/50" />
            Add New Members
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mini-scroll-bar -mr-4 pr-4 max-h-[80vh] overflow-y-auto">
          {fields.map((field, index) => {
            const errs = getFieldErrors(index)

            return (
              <div key={field.id} className="mb-4 relative">
                <div className="df p-px">
                  <Controller
                    name={`fields.${index}.phone_number`}
                    control={control}
                    rules={{ required: "Phone number is required" }}
                    render={({ field: { value, onChange } }) => (
                      <PhoneInput
                        containerClass="w-full"
                        placeholder="Enter phone number"
                        value={value}
                        onChange={onChange}
                        specialLabel=''
                        country="in"
                      />
                    )}
                  />

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-0"
                  >
                    <LuTrash className="text-xs text-foreground/50 hover:text-red-400" />
                  </button>
                </div>

                {
                  errs?.phone_number &&
                  <p className='text-[10px] absolute left-0 top-full text-red-400'>{errs?.phone_number?.message}</p>
                }
              </div>
            )
          })}

          <button
            type="button"
            onClick={() => append({ phone_number: "" })}
            className="df mb-6 text-xs font-medium bg-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <LuPlusCircle /> Add Field
          </button>

          <div className="df">
            <button
              type="button"
              className="px-8 py-2 rounded-md bg-input border text-foreground/60"
              onClick={closeModel}
              disabled={isPending}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-primary/95 text-primary-foreground border-t-2 border-white/30 rounded-md rounded-t-lg hover:bg-primary"
            >
              Add to campaign
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddMembers
