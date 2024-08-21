"use client"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { ChevronsUpDown, Check } from "lucide-react"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import { set, useForm } from "react-hook-form"
import {useRouter} from "next/navigation"
import { Textarea } from "./ui/textarea"
import { useState } from "react"

const AddDocForm = ({setOpen}) => {

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    category: z.string().min(2, {
      message: "A category must be selected.",
    }),
    text: z.string().min(2, {
      message: "Text must be at least 2 characters.",
    }),
  })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        category: "",
        text: "",
        },
    })

    const spacetoDash = (str: string) => {
        return str.replace(/\s+/g, '-');
    }

    function onSubmit(values: any) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setLoading(true)
        const data = {
            name: values.name,
            category: categories.find( category => category.value === values.category)?.label,
            path: 'Docs\\' + values.category + '\\' + spacetoDash(values.name) + '.pdf',
            text: values.text
          }
          
          fetch(`http://localhost:3000/api/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).then((response) => {

            console.log(response)
            router.refresh()
            setOpen(false)
            setLoading(false)
          })
          }
      

      const categories = [
        { value: "SD", label: "Supporting Documents" },
        { value: "SIG", label: "Signatures" },
        
      ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
              Name the file
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category) => category.value === field.value
                          )?.label
                        : "Select category"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={category.label}
                            key={category.value}
                            onSelect={() => {
                              form.setValue("category", category.value)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select a category
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter text for the pdf" {...field} />
              </FormControl>
              <FormDescription>
              Enter PDF Text
              </FormDescription>
              <FormMessage />
            </FormItem>
          )} />
          
        <Button type="submit" disabled={loading}>{loading ? "Submiting...": "Submit"}</Button>
      </form>
    </Form>
  )
}

export default AddDocForm