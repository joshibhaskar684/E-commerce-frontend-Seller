"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Selection-and-copy fallback. `navigator.clipboard` only exists on secure
 * origins — an admin panel opened over the LAN at http://192.168.x.x:3000 has
 * none — and even where it exists it refuses while the document is unfocused.
 */
function copyBySelection(text) {
    try {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.top = "-1000px";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(area);
        return ok;
    } catch {
        return false;
    }
}

/**
 * Copies `value` and shows a tick for a moment. Admins spend a lot of time
 * moving ids and emails into other tools, so this sits next to both.
 */
export default function CopyButton({ value, label = "Copy", className = "" }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!value) return;

        const text = String(value);
        let ok = false;

        try {
            await navigator.clipboard.writeText(text);
            ok = true;
        } catch {
            ok = copyBySelection(text);
        }

        // Nothing landed on the clipboard — leave the button idle rather than
        // claiming a copy that did not happen. The text stays selectable.
        if (!ok) return;

        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            type="button"
            onClick={copy}
            title={copied ? "Copied" : label}
            aria-label={copied ? "Copied" : label}
            className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 ${className}`}
        >
            {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
                <Copy className="h-3.5 w-3.5" />
            )}
        </button>
    );
}
