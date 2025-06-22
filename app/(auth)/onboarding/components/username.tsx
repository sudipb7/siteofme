import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { User } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { cn, handleClientError } from "@/lib/utils";
import { useUpdateUser } from "@/hooks/mutations";
import { AnimatedText } from "@/components/animated-text";
import { SignUpInput, signUpSchema } from "@/lib/schemas";
import { useCheckUsername } from "../../sign-up/lib/hooks";
import { AnimatedButton } from "@/components/animated-button";

const buttonStates = {
  idle: "Continue",
  loading: <Loader2 className="size-4 animate-spin" />,
  success: <Check className="size-4" />,
};

const textStates = {
  idle: "Claim your username before it's too late!",
  available: "It's available... this username is available! 😃",
  unavailable: "This username is already taken, you're a little late.😐",
  invalid: "5 characters look better as username 🖐",
  special: "You are already so special, why a special character? 😉",
};

interface UsernameFormProps {
  user: User;
}

export const UsernameForm = ({ user }: UsernameFormProps) => {
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [textState, setTextState] = useState<keyof typeof textStates>("idle");
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

  const { mutateAsync: checkUsername } = useCheckUsername();

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      const validated = signUpSchema.pick({ username: true }).safeParse({ username });
      if (!validated.success) {
        if (validated.error.errors.some(error => error.message.includes("special"))) {
          setTextState("special");
        } else {
          setTextState("invalid");
        }
        setIsUsernameAvailable(false);
        return;
      }

      setButtonState("loading");

      const res = await checkUsername(username);
      if ("error" in res) {
        form.setError("username", { message: res.error, type: "pattern" }, { shouldFocus: true });
        setIsUsernameAvailable(false);
        setTextState("unavailable");
      } else {
        setIsUsernameAvailable(true);
        setTextState("available");
      }

      setButtonState("idle");
    };

    const timeout = setTimeout(() => {
      if (username) {
        checkUsernameAvailability();
      } else {
        setTextState("idle");
        setIsUsernameAvailable(false);
        setButtonState("idle");
      }
    }, 350);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [username]);

  return (
    <>
      <div className="space-y-2">
        <h1 className="heading_secondary">Where should we host your site?</h1>
        <p className="description">We&apos;ll use this username to host your site.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your username</FormLabel>
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
          {textState !== "idle" && (
            <AnimatedText
              currentState={textState}
              states={textStates}
              className={cn(
                "description text-sm",
                textState === "available" && "text-success-foreground",
                textState === "unavailable" && "text-destructive",
                ["invalid", "special"].includes(textState) && "text-warning-foreground"
              )}
            />
          )}
          <AnimatedButton
            states={buttonStates}
            currentState={buttonState}
            disabled={!isUsernameAvailable || isLoading || buttonState === "loading"}
            aria-label="Continue"
            className="w-full"
          />
        </form>
      </Form>
    </>
  );
};
