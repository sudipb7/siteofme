import { WHY_CHOOSE_SITEOF_ME } from "@/lib/constants";
import { GetYourUsername } from "../../components/get-your-username";

export default function HomePage() {
  return (
    <main className="w-full">
      <section className="max-w-lg px-4 pb-8 pt-14 mx-auto">
        <div className="space-y-4">
          <h1 className="heading_primary max-sm:text-pretty">
            You&apos;re more than a link. <br /> Share your story.
          </h1>
          <p className="description text-lg text-foreground/75">
            Forget plain link lists. Create your &ldquo;site of you&rdquo; a simple, beautiful
            mini-site built around who you are, not just where to find you.
          </p>
        </div>
        <GetYourUsername />
      </section>

      <section className="max-w-lg px-4 py-12 mx-auto">
        <div className="mb-6 space-y-3">
          <h2 className="heading_secondary">Why siteof.me?</h2>
          <p className="description text-foreground/75 max-md:text-pretty">
            Links don&apos;t tell your story people do. Your personal page should feel like you, not
            another boring link pile.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {WHY_CHOOSE_SITEOF_ME.map(reason => (
            <div className="space-y-2" key={reason.title}>
              <div className="text-2xl">{reason.icon}</div>
              <h3 className="heading_primary text-lg">{reason.title}</h3>
              <p className="description text-sm max-md:text-balance">{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-lg px-4 py-8 pb-16 mx-auto">
        <div className="space-y-4">
          <div className="space-y-3">
            <h2 className="heading_secondary">Your story. Your site.</h2>
            <p className="description text-foreground/75">
              It&apos;s your space to share who you are, what you create, and why it matters simple,
              fast, yours.
            </p>
          </div>
          <GetYourUsername />
        </div>
      </section>
    </main>
  );
}
