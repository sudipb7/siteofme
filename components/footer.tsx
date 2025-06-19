import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="max-w-xl mx-auto px-4 py-6 border-t flex items-center justify-between text-muted-foreground text-xs font-medium">
      <p>©2025 site of</p>
      <ul className="flex items-center gap-x-3">
        <li>
          <Link href="/faq">FAQ</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/terms-of-service">Terms of Service</Link>
        </li>
      </ul>
    </footer>
  );
};
