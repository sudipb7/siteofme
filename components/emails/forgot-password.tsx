import { Heading, Section, Text, Button } from "@react-email/components";
import { Layout } from "./layout";

interface ForgotPasswordEmailProps {
  url: string;
}

export const ForgotPasswordEmail = ({ url }: ForgotPasswordEmailProps) => (
  <Layout preview="Reset your password">
    <Section className="text-center">
      <Heading className="text-black text-2xl font-semibold text-center mx-0">
        Reset your password
      </Heading>
      <Text className="text-black text-base">
        You requested to reset your password. Click the button below to set a new one.
      </Text>
      <Button
        className="bg-black rounded-lg text-white text-sm font-semibold text-center py-3 px-6"
        href={url}
      >
        Reset Password
      </Button>
      <Text className="text-neutral-400 text-xs mt-4">
        If you didn’t make this request, feel free to ignore this email.
      </Text>
    </Section>
  </Layout>
);
