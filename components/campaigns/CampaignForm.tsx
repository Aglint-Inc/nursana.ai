"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const campaignSchema = z.object({
  name: z.string().min(1, "Name is required"),
  campaign_code: z.string().min(1, "Campaign code is required"),
  description: z.string().optional(),
  template_id: z.string().min(1, "Template is required"),
});

type CampaignFormProps = {
  initialData?: z.infer<typeof campaignSchema>;
  action: (formData: FormData) => Promise<void | { error: string }>;
  templates: Array<{ id: string; name: string }>;
};

export function CampaignForm({
  initialData,
  action,
  templates,
}: CampaignFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: initialData || {
      name: "",
      campaign_code: "",
      description: "",
      template_id: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof campaignSchema>) => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const result = await action(formData);
      if (result && "error" in result) {
        // Handle the error, e.g., display it to the user
        console.error(result.error);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="campaign_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="template_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interview Template</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
