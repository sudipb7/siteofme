import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Check, Loader2, X } from "lucide-react";
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
import { BaseAPIResponse } from "@/types";
import { Input } from "@/components/ui/input";
import { handleClientError } from "@/lib/utils";
import { useUpdateUser } from "@/hooks/mutations";
import { SignUpInput, signUpSchema } from "@/lib/schemas";
import { useCheckUsername } from "../../sign-up/lib/hooks";
import { AnimatedButton } from "@/components/animated-button";

const buttonStates = {
  idle: "Continue",
  loading: <Loader2 className="size-4 animate-spin" />,
  success: <Check className="size-4" />,
};

interface UsernameFormProps {
  user: User;
}

export const UsernameForm = ({ user }: UsernameFormProps) => {
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [usernameResponse, setUsernameResponse] = useState<BaseAPIResponse | null>(null);
  const [buttonState, setButtonState] = useState<keyof typeof buttonStates>("idle");

  const form = useForm<Pick<SignUpInput, "username">>({
    resolver: zodResolver(signUpSchema.pick({ username: true })),
    defaultValues: {
      username: "",
    },
  });

  const { mutateAsync: updateUser } = useUpdateUser();

  const username = form.watch("username");
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: Pick<SignUpInput, "username">) {
    try {
      if (!isUsernameAvailable) {
        toast.error("The username is already claimed. Try another one.");
        return;
      }

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
      setButtonState("idle");
      handleClientError(error);
    }
  }

  const { mutateAsync: checkUsername, isPending: isCheckingUsername } = useCheckUsername();

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      const result = await form.trigger("username");
      if (!result) {
        return;
      }

      const res = await checkUsername(username);
      if ("error" in res) {
        // ! Hiding this temporarily to avoid showing 2 error messages
        // form.setError("username", { message: res.error, type: "pattern" }, { shouldFocus: true });
        setIsUsernameAvailable(false);
        setUsernameResponse(res);
        return;
      } else {
        setIsUsernameAvailable(true);
        setUsernameResponse(res);
      }
    };

    const timeout = setTimeout(() => {
      if (username && username.length >= 3) {
        checkUsernameAvailability();
      } else {
        setIsUsernameAvailable(false);
        setUsernameResponse(null);
      }
    }, 350);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [username]);

  return (
    <>
      <div className="space-y-1">
        <h1 className="heading_primary">Where should we host your site?</h1>
        <p className="description">We&apos;ll use this username to host your site.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-x-2">
                  Your username
                  {username.length >= 3 ? (
                    isCheckingUsername ? (
                      <span className="text-xs text-muted-foreground font-medium flex items-center gap-x-1 leading-none">
                        Checking...
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                      </span>
                    ) : usernameResponse && "error" in usernameResponse ? (
                      <span className="text-xs text-muted-foreground font-medium flex items-center gap-x-1 leading-none">
                        {usernameResponse.error}
                        <X className="h-3.5 w-3.5 text-red-600" />
                      </span>
                    ) : usernameResponse && "message" in usernameResponse ? (
                      <span className="text-xs text-muted-foreground font-medium flex items-center gap-x-1 leading-none">
                        {usernameResponse?.message}
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </span>
                    ) : null
                  ) : null}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="text-sm min-h-full absolute inset-y-0 left-0 grid place-items-center pl-3 pointer-events-none leading-none">
                      siteof.me/
                    </span>
                    <Input
                      className="pl-[4.8rem]"
                      placeholder="username"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="username"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AnimatedButton
            states={buttonStates}
            currentState={buttonState}
            disabled={isLoading || isCheckingUsername || !username}
            aria-label="Continue"
            className="w-full"
          />
        </form>
      </Form>
    </>
  );
};
