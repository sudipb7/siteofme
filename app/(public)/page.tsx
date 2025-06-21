import { WHY_CHOOSE_SITEOF_ME } from "@/lib/constants";
import { GetYourUsername } from "./components/get-your-username";

export default function HomePage() {
  return (
    <main className="w-full">
      <section className="max-w-lg px-4 pb-8 pt-14 mx-auto">
        <h1 className="heading_primary text-3xl max-sm:text-pretty">
          Go beyond the links. <br /> Tell your &ldquo;story&rdquo;, beautifully.
        </h1>
        <p className="description text-lg mt-4 text-foreground/80">
          Create a{" "}
          <span className="line-through text-muted-foreground" aria-hidden>
            link-in-bio, portfolio, business card
          </span>{" "}
          &ldquo;site of you&rdquo;. A mini-site built around &ldquo;you&rdquo;. Not just where to
          find you, but &ldquo;who you are&rdquo;.
        </p>
        <GetYourUsername />
      </section>

      <section className="max-w-lg px-4 py-12 mx-auto">
        <div className="mb-6 space-y-3">
          <h2 className="heading_primary text-2xl">Why choose &ldquo;siteof.me&rdquo;?</h2>
          <p className="description text-base text-foreground/80 max-md:text-pretty">
            Your personal page shouldn&apos;t feel like just another link list. We believe in
            stories, not stacks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {WHY_CHOOSE_SITEOF_ME.map(reason => (
            <div className="space-y-2" key={reason.title}>
              <div className="text-2xl">{reason.icon}</div>
              <h3 className="heading_primary text-lg">{reason.title}</h3>
              <p className="description max-md:text-sm max-md:text-balance">{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-lg px-4 py-8 pb-16 mx-auto">
        <div className="space-y-4">
          <div className="space-y-3">
            <h2 className="heading_primary text-2xl">Your story, your site</h2>
            <p className="description text-base text-foreground/80">
              A simple site to share your story, work, and everything that makes you, you.
            </p>
          </div>
          <GetYourUsername />
        </div>
      </section>
    </main>
  );
}
