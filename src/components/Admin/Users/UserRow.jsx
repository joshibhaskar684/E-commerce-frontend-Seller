"use client";

import { Mail, Phone } from "lucide-react";
import CopyButton from "../shared/CopyButton";
import { formatDate, initials, roleAccent, roleBadge, roleLabel, userMobile } from "./utils";

export default function UserRow({ user }) {
    const role = user?.role;
    const mobile = userMobile(user);

    return (
        <div className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
            <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-900 ${roleAccent(role)}`}
            >
                {initials(user?.name)}
            </span>

            {/* Identity */}
            <div className="min-w-0 flex-1">
                <p title={user?.name} className="truncate text-sm font-medium">
                    {user?.name || "Unnamed user"}
                </p>
                <p className="truncate font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                    {user?.id || "—"}
                </p>
            </div>

            {/* Email */}
            <div className="hidden min-w-0 flex-1 items-center gap-1.5 md:flex">
                <Mail className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                {user?.email ? (
                    <>
                        <a
                            href={`mailto:${user.email}`}
                            title={user.email}
                            className="truncate text-xs text-zinc-600 transition-colors hover:text-yellow-600 dark:text-zinc-300 dark:hover:text-yellow-500"
                        >
                            {user.email}
                        </a>
                        <CopyButton value={user.email} label="Copy email" />
                    </>
                ) : (
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">—</span>
                )}
            </div>

            {/* Mobile */}
            <div className="hidden w-36 shrink-0 items-center gap-1.5 lg:flex">
                <Phone className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                {mobile ? (
                    <a
                        href={`tel:${mobile}`}
                        className="truncate text-xs text-zinc-600 transition-colors hover:text-yellow-600 dark:text-zinc-300 dark:hover:text-yellow-500"
                    >
                        {mobile}
                    </a>
                ) : (
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">—</span>
                )}
            </div>

            {/* Role */}
            <div className="w-24 shrink-0 text-right sm:text-left">
                <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${roleBadge(role)}`}
                >
                    {roleLabel(role)}
                </span>
            </div>

            {/* Joined */}
            <div className="hidden w-28 shrink-0 text-right text-xs text-zinc-500 xl:block dark:text-zinc-400">
                {user?.createdAt ? formatDate(user.createdAt) : "—"}
            </div>
        </div>
    );
}
