import { Html, Head, Preview, Body, Container, Section, Img, Link } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

interface LayoutProps {
  preview: string;
  children: React.ReactNode;
}

export const Layout = ({ preview, children }: LayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Section className="mt-8">
              <Img
                src={`https://siteof.me/logo.png`}
                width="44"
                height="44"
                alt="Site of Me"
                className="my-0 mx-auto"
              />
            </Section>
            {children}
            <Section className="text-center mt-4">
              <span className="text-xs text-neutral-400">
                Sent with good vibes from{" "}
                <Link href={baseUrl} className="text-neutral-400 underline">
                  siteof.me
                </Link>
              </span>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
