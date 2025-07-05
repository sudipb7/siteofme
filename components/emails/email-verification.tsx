import { Heading, Section, Text, Button } from "@react-email/components";
import { Layout } from "./layout";

interface VerificationEmailProps {
  url: string;
}

export const VerificationEmail = ({ url }: VerificationEmailProps) => (
  <Layout preview="Email Verification">
    <Section className="text-center">
      <Heading className="text-black text-2xl font-semibold text-center mx-0">
        Just one quick thing, verify your email
      </Heading>
      <Text className="text-black text-base">
        Almost there. Confirm your email to get your site live.
      </Text>
      <Button
        className="bg-black rounded-lg text-white text-sm font-semibold text-center py-3 px-6"
        href={url}
      >
        Verify My Email
      </Button>
      <Text className="text-neutral-400 text-xs mt-4">
        If you didn’t sign up for siteof.me, feel free to ignore this message.
      </Text>
    </Section>
  </Layout>
);
