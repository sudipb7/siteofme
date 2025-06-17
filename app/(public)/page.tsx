import { GetYourUsername } from "./components/get-your-username";

export default function HomePage() {
  return (
    <main className="w-full">
      <section className="max-w-xl px-4 pb-8 pt-14 mx-auto text-center">
        <h1 className="heading_primary text-4xl max-w-md mx-auto max-sm:text-pretty">
          Go beyond links — Tell your <span className="italic">&ldquo;story&rdquo;</span>,
          beautifully.
        </h1>
        <p className="description text-xl mt-6 max-w-md mx-auto text-foreground">
          Create a{" "}
          <span className="line-through text-muted-foreground">
            link-in-bio, portfolio, business card
          </span>{" "}
          — a <span className="italic font-semibold">&ldquo;site of you&rdquo;</span> built around{" "}
          <span className="italic font-semibold">you</span>. Not just where to find you, but{" "}
          <span className="font-semibold">who you are</span>.
        </p>
        <GetYourUsername />
      </section>
    </main>
  );
}
