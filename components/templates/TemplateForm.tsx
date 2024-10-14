"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const templateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ai_welcome_message: z.string().min(1, "Welcome message is required"),
  ai_ending_message: z.string().min(1, "Ending message is required"),
  ai_interview_duration: z
    .number()
    .min(1, "Duration must be at least 1 minute"),
  candidate_estimated_time: z.string().min(1, "Estimated time is required"),
  ai_instructions: z
    .array(z.string())
    .min(1, "At least one instruction is required"),
  ai_questions: z.string().min(1, "Questions are required"),
});

type TemplateFormProps = {
  initialData?: z.infer<typeof templateSchema>;
  action: (formData: FormData) => Promise<void | { error: string }>;
};

export function TemplateForm({ initialData, action }: TemplateFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof templateSchema>>({
    resolver: zodResolver(templateSchema),
    defaultValues: initialData || {
      name: "",
      ai_welcome_message: "",
      ai_ending_message: "",
      ai_interview_duration: 30,
      candidate_estimated_time: "",
      ai_instructions: [""],
      ai_questions: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof templateSchema>) => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const result = await action(formData);
      if (result && "error" in result) {
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
              <FormLabel>Template Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ai_welcome_message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Welcome Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ai_ending_message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Ending Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ai_interview_duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Interview Duration (minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="candidate_estimated_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Candidate Estimated Time</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ai_instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value.join("\n")}
                  onChange={(e) => field.onChange(e.target.value.split("\n"))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ai_questions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Questions</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
