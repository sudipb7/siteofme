import { useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormMessage,
  FormLabel,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { type User } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { handleClientError } from "@/lib/utils";
import { useUpdateUser } from "@/hooks/mutations/user";
import { AnimatedButton } from "@/components/animated-button";
import { type FullNameInput, fullNameSchema } from "@/lib/schemas";

const buttonStates = {
  idle: "Continue",
  loading: <Loader2 className="size-4 animate-spin" />,
  success: <Check className="size-4" />,
};

interface FullNameFormProps {
  user: User;
}

export const FullNameForm = ({ user }: FullNameFormProps) => {
  const form = useForm<FullNameInput>({
    resolver: zodResolver(fullNameSchema),
    defaultValues: {
      name: "",
    },
  });

  const [buttonState, setButtonState] = useState<keyof typeof buttonStates>("idle");

  const name = form.watch("name");
  const isLoading = form.formState.isSubmitting;

  const { mutateAsync: updateUser } = useUpdateUser();

  async function onSubmit(values: FullNameInput) {
    try {
      setButtonState("loading");
      const response = await updateUser({
        id: user.id,
        values: {
          ...values,
          email: user.email!,
        },
      });
      if (response && "error" in response) {
        setButtonState("idle");
        handleClientError(response);
      }
    } catch (error) {
      handleClientError(error);
      setButtonState("idle");
    }
  }

  return (
    <>
      <div className="space-y-2">
        <h1 className="heading_secondary">What should we call you?</h1>
        <p className="description">
          Don&apos;t worry, your name stays private unless you share it.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
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
          <AnimatedButton
            states={buttonStates}
            currentState={buttonState}
            disabled={isLoading || !name}
            aria-label="Continue"
            className="w-full"
          />
        </form>
      </Form>
    </>
  );
};
