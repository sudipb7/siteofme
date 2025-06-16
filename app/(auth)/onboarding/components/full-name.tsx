import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormMessage,
  FormLabel,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { User } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleClientError } from "@/lib/utils";
import { useUpdateUser } from "@/hooks/mutations";

interface FullNameFormProps {
  user: User;
}

const fullNameSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

type FullNameFormValues = z.infer<typeof fullNameSchema>;

export const FullNameForm = ({ user }: FullNameFormProps) => {
  const form = useForm<FullNameFormValues>({
    resolver: zodResolver(fullNameSchema),
    defaultValues: {
      name: "",
    },
  });

  const name = form.watch("name");
  const isLoading = form.formState.isSubmitting;

  const { mutateAsync: updateUser } = useUpdateUser();

  async function onSubmit(values: FullNameFormValues) {
    try {
      const response = await updateUser({
        id: user.id,
        values: {
          ...values,
          email: user.email!,
        },
      });
      if (response && "error" in response) {
        handleClientError(response);
      }
    } catch (error) {
      handleClientError(error);
    }
  }

  return (
    <>
      <div className="space-y-1">
        <h1 className="heading_primary">
          You&apos;ve made it through!
          <br />
          But what should we call you?
        </h1>
        <p className="description">No worries, we&apos;ll keep your name to ourselves</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your full name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoCapitalize="none"
                    autoComplete="name"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading || !name} className="w-full">
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
};
