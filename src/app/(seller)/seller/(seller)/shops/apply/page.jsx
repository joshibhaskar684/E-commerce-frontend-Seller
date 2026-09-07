"use client";

import { CreateShop, Request2Shop } from "@/redux-store/authstore/shops/action";
import Cookies from "js-cookie";
import { ArrowLeft, Clock, Image as ImageIcon, Loader2, MapPin, Store } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EMPTY = {
    shopName: "",
    description: "",
    logoUrl: "",
    bannerUrl: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
};

const isHttpUrl = (value) => /^https?:\/\/\S+$/i.test(value.trim());

/** Everything the backend rejects, caught here instead of after a round trip. */
function validate(form) {
    const errors = {};

    if (!form.shopName.trim()) errors.shopName = "Give your shop a name.";
    else if (form.shopName.trim().length < 3) errors.shopName = "Use at least 3 characters.";

    if (!form.address.trim()) errors.address = "Customers need an address for this shop.";
    if (!form.city.trim()) errors.city = "City is required.";
    if (!form.state.trim()) errors.state = "State is required.";

    if (!form.pincode.trim()) errors.pincode = "Pincode is required.";
    else if (!/^\d{6}$/.test(form.pincode.trim())) errors.pincode = "Use a 6 digit pincode.";

    if (form.logoUrl.trim() && !isHttpUrl(form.logoUrl))
        errors.logoUrl = "Use a full URL starting with http:// or https://";
    if (form.bannerUrl.trim() && !isHttpUrl(form.bannerUrl))
        errors.bannerUrl = "Use a full URL starting with http:// or https://";

    return errors;
}

export default function ApplyForShopPage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear a field's error the moment the seller starts fixing it.
        setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
    };

    const submit = async (mode) => {
        const found = validate(form);
        setErrors(found);

        if (Object.keys(found).length > 0) {
            toast.error("Check the highlighted fields");
            return;
        }

        const token = Cookies.get("sellerToken");
        if (!token) {
            toast.error("Seller login required");
            router.push("/seller-login");
            return;
        }

        setSubmitting(mode);
        try {
            const payload = { ...form, pincode: form.pincode.trim() };
            const thunk = mode === "create" ? CreateShop : Request2Shop;
            const ok = await dispatch(thunk(payload, token));

            // The thunks report their own errors through toasts; only navigate
            // away once one actually succeeded.
            if (ok === false) return;

            router.push("/seller/shops?status=review");
        } finally {
            setSubmitting("");
        }
    };

    const busy = Boolean(submitting);

    return (
        <div className="hide-scrollbar min-h-screen w-full overflow-y-auto">
            <div className="mx-auto w-full max-w-3xl space-y-6 p-6 md:p-10">
                <Link
                    href="/seller/shops"
                    className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-yellow-600 dark:text-zinc-400 dark:hover:text-yellow-500"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to your shops
                </Link>

                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                    {/* Header */}
                    <div className="space-y-1.5 border-b border-zinc-200 p-6 dark:border-zinc-800">
                        <h1 className="flex items-center gap-2 text-2xl font-semibold leading-none tracking-tight">
                            <Store className="h-6 w-6 text-yellow-500" />
                            Apply for a shop
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Tell us about the storefront you want to run. An admin reviews every
                            application.
                        </p>
                    </div>

                    {/* What happens next — sets the expectation before they type */}
                    <div className="flex gap-3 border-b border-zinc-200 bg-yellow-50 p-4 text-[13px] text-yellow-900 dark:border-zinc-800 dark:bg-yellow-950/20 dark:text-yellow-300">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                        <p className="leading-relaxed">
                            Approval usually takes 24 to 48 hours. Until then the shop sits in{" "}
                            <span className="font-medium">Under review</span> and cannot hold
                            products.
                        </p>
                    </div>

                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            submit("create");
                        }}
                        noValidate
                    >
                        <div className="space-y-8 p-6">
                            {/* Shop info */}
                            <Section title="Shop information" icon={Store}>
                                <Field
                                    label="Shop name"
                                    name="shopName"
                                    required
                                    value={form.shopName}
                                    onChange={handleChange}
                                    error={errors.shopName}
                                    placeholder="e.g. Kadam Appliances"
                                    className="sm:col-span-2"
                                />
                                <Field
                                    label="Description"
                                    name="description"
                                    as="textarea"
                                    rows={3}
                                    value={form.description}
                                    onChange={handleChange}
                                    error={errors.description}
                                    placeholder="What do you sell? Customers see this on your shop page."
                                    className="sm:col-span-2"
                                />
                            </Section>

                            {/* Media */}
                            <Section title="Shop media" icon={ImageIcon}>
                                <Field
                                    label="Logo URL"
                                    name="logoUrl"
                                    value={form.logoUrl}
                                    onChange={handleChange}
                                    error={errors.logoUrl}
                                    placeholder="https://…"
                                    hint="Optional. Square images look best."
                                />
                                <Field
                                    label="Banner URL"
                                    name="bannerUrl"
                                    value={form.bannerUrl}
                                    onChange={handleChange}
                                    error={errors.bannerUrl}
                                    placeholder="https://…"
                                    hint="Optional. Shown across the top of your shop."
                                />

                                {/* Live preview beats a broken image after submit */}
                                {(isHttpUrl(form.logoUrl) || isHttpUrl(form.bannerUrl)) && (
                                    <div className="sm:col-span-2">
                                        <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                            Preview
                                        </p>
                                        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                                            <div className="h-20 w-full bg-zinc-100 dark:bg-zinc-800">
                                                {isHttpUrl(form.bannerUrl) && (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={form.bannerUrl}
                                                        alt=""
                                                        className="h-full w-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 p-3">
                                                <span className="-mt-8 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-white bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-800">
                                                    {isHttpUrl(form.logoUrl) ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={form.logoUrl}
                                                            alt=""
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Store className="h-5 w-5 text-zinc-400" />
                                                    )}
                                                </span>
                                                <p className="truncate text-sm font-medium">
                                                    {form.shopName || "Your shop"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Section>

                            {/* Address */}
                            <Section title="Shop address" icon={MapPin}>
                                <Field
                                    label="Full address"
                                    name="address"
                                    as="textarea"
                                    rows={2}
                                    required
                                    value={form.address}
                                    onChange={handleChange}
                                    error={errors.address}
                                    placeholder="Street, area, landmark"
                                    className="sm:col-span-2"
                                />
                                <Field
                                    label="City"
                                    name="city"
                                    required
                                    value={form.city}
                                    onChange={handleChange}
                                    error={errors.city}
                                />
                                <Field
                                    label="State"
                                    name="state"
                                    required
                                    value={form.state}
                                    onChange={handleChange}
                                    error={errors.state}
                                />
                                <Field
                                    label="Pincode"
                                    name="pincode"
                                    required
                                    inputMode="numeric"
                                    maxLength={6}
                                    value={form.pincode}
                                    onChange={handleChange}
                                    error={errors.pincode}
                                    placeholder="6 digits"
                                    className="sm:col-span-2"
                                />
                            </Section>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col-reverse gap-3 border-t border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:justify-end dark:border-zinc-800 dark:bg-zinc-900/50">
                            <button
                                type="button"
                                onClick={() => submit("request")}
                                disabled={busy}
                                title="Ask an admin to grant you an additional shop"
                                className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                            >
                                {submitting === "request" ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Requesting...
                                    </>
                                ) : (
                                    "Request an additional shop"
                                )}
                            </button>

                            {/* Deliberately not type="submit": the seller shell currently
                                fails hydration, and an un-hydrated submit button does a
                                native GET that pushes the address into the URL and wipes
                                the form. onSubmit below still covers Enter. */}
                            <button
                                type="button"
                                onClick={() => submit("create")}
                                disabled={busy}
                                className="inline-flex h-10 items-center justify-center rounded-md bg-yellow-500 px-6 text-sm font-medium text-zinc-950 shadow-sm transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                {submitting === "create" ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit application"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function Section({ title, icon: Icon, children }) {
    return (
        <div className="space-y-4">
            <h2 className="flex items-center gap-2 border-b border-zinc-100 pb-3 text-sm font-semibold dark:border-zinc-800">
                <Icon className="h-4 w-4 text-zinc-400" />
                {title}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
        </div>
    );
}

function Field({
    label,
    name,
    as = "input",
    error,
    hint,
    required,
    className = "",
    ...rest
}) {
    const Tag = as;
    const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;

    return (
        <div className={`space-y-1.5 ${className}`}>
            <label htmlFor={name} className="text-sm font-medium">
                {label}
                {required && <span className="ml-0.5 text-red-500">*</span>}
            </label>

            <Tag
                id={name}
                name={name}
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 ${
                    as === "textarea" ? "resize-none" : "h-10"
                } ${
                    error
                        ? "border-red-400 focus-visible:ring-red-500"
                        : "border-zinc-300 focus-visible:ring-yellow-500 dark:border-zinc-700"
                }`}
                {...rest}
            />

            {error ? (
                <p id={`${name}-error`} className="text-xs text-red-600 dark:text-red-400">
                    {error}
                </p>
            ) : hint ? (
                <p id={`${name}-hint`} className="text-xs text-zinc-500 dark:text-zinc-400">
                    {hint}
                </p>
            ) : null}
        </div>
    );
}
