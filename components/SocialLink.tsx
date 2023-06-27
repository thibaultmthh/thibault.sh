import { TablerIcon } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";

export default function SocialLink({ href, Icon, color }: { href: string; Icon: TablerIcon; color?: string }) {
  return (
    <Link href={href}>
      <Icon className="text-[#848484] hover:text-[#8678F9]" />
    </Link>
  );
}
