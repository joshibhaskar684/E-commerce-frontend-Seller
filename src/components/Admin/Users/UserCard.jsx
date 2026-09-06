"use client";

import { Calendar, Hash, Mail, Phone } from "lucide-react";
import CopyButton from "../shared/CopyButton";
import { formatDate, initials, roleAccent, roleBadge, roleLabel, userMobile } from "./utils";

export default function UserCard({ user }) {
    const role = user?.role;
    const mobile = userMobile(user);

    return (
        <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-background shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800">
            {/* Identity */}
            <div className="flex items-start gap-3 p-4">
                <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-sm font-semibold dark:border-zinc-800 dark:bg-zinc-900 ${roleAccent(role)}`}
                >
                    {initials(user?.name)}
                </span>

                <div className="min-w-0 flex-1">
                    <h3
                        title={user?.name}
                        className="line-clamp-2 text-[15px] font-semibold leading-tight"
                    >
                        {user?.name || "Unnamed user"}
                    </h3>
                    <span
                        className={`mt-1.5 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${roleBadge(role)}`}
                    >
                        {roleLabel(role)}
                    </span>
                </div>
            </div>

            {/* Contact */}
            <div className="space-y-2 border-t border-zinc-100 px-4 py-3 text-xs dark:border-zinc-800">
                <div className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                    {user?.email ? (
                        <>
                            <a
                                href={`mailto:${user.email}`}
                                title={user.email}
                                className="truncate text-zinc-600 transition-colors hover:text-yellow-600 dark:text-zinc-300 dark:hover:text-yellow-500"
                            >
                                {user.email}
                            </a>
                            <CopyButton value={user.email} label="Copy email" className="ml-auto" />
                        </>
                    ) : (
                        <span className="text-zinc-400 dark:text-zinc-500">No email on file</span>
                    )}
                </div>

                <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                    {mobile ? (
                        <>
                            <a
                                href={`tel:${mobile}`}
                                className="truncate text-zinc-600 transition-colors hover:text-yellow-600 dark:text-zinc-300 dark:hover:text-yellow-500"
                            >
                                {mobile}
                            </a>
                            <CopyButton value={mobile} label="Copy number" className="ml-auto" />
                        </>
                    ) : (
                        <span className="text-zinc-400 dark:text-zinc-500">No number on file</span>
                    )}
                </div>

                {user?.createdAt && (
                    <p className="flex items-center gap-1.5 truncate text-zinc-500 dark:text-zinc-400">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                        Joined {formatDate(user.createdAt)}
                    </p>
                )}

                {user?.id && (
                    <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                        <Hash className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                        <span className="truncate font-mono text-[11px]">{user.id}</span>
                        <CopyButton value={user.id} label="Copy user id" className="ml-auto" />
                    </div>
                )}
            </div>
        </div>
    );
}
