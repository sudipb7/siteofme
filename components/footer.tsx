import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="max-w-lg mx-auto px-4 py-4 border-t flex items-center justify-between text-muted-foreground text-xs font-medium">
      <p>©2025 siteof.me</p>
      <ul className="flex items-center gap-x-1.5">
        {/* <li>
          <Link href="/faq">FAQ</Link>
        </li> */}
        <li className="px-1">
          <Link href={SITE_CONFIG.author.twitter} target="_blank">
            Twitter/X
          </Link>
        </li>
        {/* <li className="px-1">
          <Link href={SITE_CONFIG.links.contact} target="_blank">
            Contact
          </Link>
        </li> */}
        {/* <li>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/terms-of-service">Terms of Service</Link>
        </li> */}
      </ul>
    </footer>
  );
};
