import { montserratAlternates } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
    return (
        <div className="flex w-full justify-center text-xs mb-10">
            <Link href="/">
                <span className={`${montserratAlternates.className} antialised font-bold`}> Teslo </span>
                <span> | shop </span>
                <span> © {new Date().getFullYear()} </span>
            </Link>

            <Link
                href='/'
                className="mx-3">
                Privacy Policy
            </Link>

            <Link
                href='/'
                className="mx-3">
                Locations
            </Link>
        </div>
    )
}
