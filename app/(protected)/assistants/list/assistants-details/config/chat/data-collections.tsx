import { useEffect } from 'react';
import { useFieldArray, useForm, Controller, FieldErrors } from 'react-hook-form';
import { LuCheck, LuPlusCircle, LuTrash } from 'react-icons/lu';

import { useChatBot, useUpdateChatBot } from '@/hooks/use-chat-bot';
import { useToast } from '@/hooks/use-toast';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface FieldOption {
  value: string
}

type fieldTypes = 'text' | 'textarea' | 'number' | 'select' | 'email' | 'tel' | 'date' | 'multiselect'

interface BaseFormField {
  name: string
  type: fieldTypes
  enabled: boolean
  required: boolean
}

interface TextFormField extends BaseFormField {
  type: 'text'
  maxChar?: number
}

interface NumberFormField extends BaseFormField {
  type: 'number'
  min?: number
  max?: number
}

interface SelectFormField extends BaseFormField {
  type: 'select' | 'multiselect'
  options: FieldOption[]
}

type FormField = TextFormField | NumberFormField | SelectFormField

interface FormInput {
  fields: FormField[]
}

type props = {
  id: string
}

function DataCollections({ id }: props) {
  const { mutate, isPending } = useUpdateChatBot()
  const { data: botDetails } = useChatBot(id)
  const { toast } = useToast()

  const { control, formState: { isDirty, errors }, handleSubmit, watch, reset } = useForm<FormInput>({
    defaultValues: {
      fields: [{ name: '', type: "text", enabled: true, required: true }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields'
  })

  useEffect(() => {
    if (botDetails) {
      reset({ fields: botDetails?.data_collections })
    }
  }, [botDetails])

  const watchFieldArray = watch('fields')

  const onSubmit = (data: FormInput) => {
    mutate(
      {
        assistant_id: id,
        data_collections: data.fields,
      },
      {
        onSuccess() {
          reset(data)
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

  const getFieldErrors = (index: number): FieldErrors<FormField> | undefined => {
    return errors.fields?.[index] as FieldErrors<FormField> | undefined
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
      {fields.map((field, index) => {
        const fieldType = watchFieldArray[index].type as fieldTypes
        const errs = getFieldErrors(index)

        return (
          <div key={field.id} className="p-4 border rounded relative bg-background/25">
            <div className='px-2 py-0.5 text-xs absolute -top-2.5 left-4 text-foreground bg-background rounded border border-border/80'>
              Field {index + 1}
            </div>

            <div className='df gap-4'>
              <div className='flex-1 relative'>
                <Controller
                  name={`fields.${index}.name`}
                  control={control}
                  rules={{ required: "Field name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Name"
                      className={`w-full text-xs bg-background/70 ${errs?.name ? 'border-red-500 focus-visible:ring-0' : ''}`}
                    />
                  )}
                />

                {
                  errs?.name &&
                  <p className='text-[10px] absolute left-0 top-full text-red-400'>{errs?.name?.message}</p>
                }
              </div>

              <Controller
                name={`fields.${index}.type`}
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[140px] h-9 text-xs bg-background/70">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="textarea">Text {`(`}Resizable{`)`}</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="tel">Telephone</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="multiselect">Multi Select</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <label htmlFor="" className='-mr-2 text-xs text-foreground/80'>Required</label>
              <Controller
                name={`fields.${index}.required`}
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className='w-8 h-4'
                  />
                )}
              />

              <label htmlFor="" className='-mr-2 text-xs text-foreground/80'>Enabled</label>
              <Controller
                name={`fields.${index}.enabled`}
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className='w-8 h-4'
                  />
                )}
              />

              <button
                type="button"
                onClick={() => remove(index)}
              >
                <LuTrash className="text-xs text-foreground/50 hover:text-red-400" />
              </button>
            </div>

            {(fieldType === "text" || fieldType === "textarea") &&
              <div className='df flex-wrap mt-4'>
                <p className='text-xs w-full text-foreground/60 -mb-1'>Additional configurations</p>
                <Controller
                  name={`fields.${index}.maxChar` as const}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="Maximum characters"
                      className="no-number-arrows w-40 text-xs bg-background/70"
                    />
                  )}
                />
              </div>
            }

            {fieldType === 'number' && (
              <div className='df flex-wrap mt-4'>
                <p className='text-xs w-full text-foreground/60 -mb-1'>Additional configurations</p>
                <Controller
                  name={`fields.${index}.min` as const}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="Min"
                      className="no-number-arrows w-40 text-xs bg-background/70"
                    />
                  )}
                />
                <Controller
                  name={`fields.${index}.max` as const}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="Max"
                      className="no-number-arrows w-40 text-xs bg-background/70"
                    />
                  )}
                />
              </div>
            )}

            {(fieldType === 'select' || fieldType === 'multiselect') && (
              <div className='df flex-wrap mt-4 relative'>
                <p className='text-xs w-full text-foreground/60 -mb-1'>Additional configurations</p>
                <Controller
                  name={`fields.${index}.options` as const}
                  control={control}
                  defaultValue={[{ value: '' }, { value: '' }]}
                  rules={{
                    validate: (options) => {
                      if (options.filter(opt => !opt.value.trim()).length >= 2) {
                        return "At least two non-empty options are required"
                      }
                      if (options.some(opt => !opt.value.trim())) {
                        return "Options field cannot be empty"
                      }
                      return true
                    }
                  }}
                  render={({ field }) => (
                    <>
                      {field.value?.map((option, optionIndex) => (
                        <div key={optionIndex} className='df gap-1 border rounded-md relative'>
                          <input
                            value={option.value}
                            onChange={(e) => {
                              const newOptions = [...field.value]
                              newOptions[optionIndex] = { value: e.target.value }
                              field.onChange(newOptions)
                            }}
                            placeholder={`Option ${optionIndex + 1}`}
                            className={`pr-8 text-xs bg-background/70 ${errs && 'options' in errs && !option.value ? 'border-red-500' : 'border-none'}`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newOptions = field.value.filter((_, i) => i !== optionIndex)
                              field.onChange(newOptions)
                            }}
                            disabled={field.value.length <= 2}
                            className='absolute top-1 right-0'
                          >
                            <LuTrash className="text-sm text-foreground/50 hover:text-red-400" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => field.onChange([...field.value, { value: '' }])}
                        className='text-foreground/70 hover:text-primary'
                      >
                        <LuPlusCircle />
                      </button>
                    </>
                  )}
                />

                {
                  // @ts-ignore
                  errs?.options &&
                  // @ts-ignore
                  <p className='text-[10px] absolute left-0 top-full text-red-400'>{errs?.options?.message}</p>
                }
              </div>
            )}
          </div>
        )
      })}

      <div className='df gap-4'>
        <button
          type="button"
          disabled={isPending}
          onClick={() => append({ name: '', type: "text", enabled: true, required: true })}
          className="df text-xs font-medium bg-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground"
        >
          <LuPlusCircle /> Add Field
        </button>

        {isDirty && (
          <button
            type="submit"
            disabled={isPending}
            className="df text-xs font-medium bg-primary/40 text-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <LuCheck /> Save Changes
          </button>
        )}

        <button
          className='text-xs ml-auto hover:text-primary'
          onClick={() => window?.open(`/data-collections?id=${id}`, "_target")}
          type="button"
        >
          View or download data
        </button>
      </div>
    </form>
  );
}

export default DataCollections;