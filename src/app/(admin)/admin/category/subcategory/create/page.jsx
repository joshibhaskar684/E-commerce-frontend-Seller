"use client";

import SubCategoryCreateCard from "@/components/Admin/Cards/SubCategoryCreateCard/SubCategoryCreateCard";
import { Skeleton } from "@/components/Admin/shared/Skeleton";
import { getCategoriesWhereIdNotNull, createCategory } from "@/redux-store/authstore/category/action";
import { Pagination } from "@mui/material";
import { FolderTree } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
    const searchParams = useSearchParams();
    const [pageno, setPageno] = useState(Number(searchParams.get("pageno")) || 1);
    const [loading, setLoading] = useState(false);
    const [pagesize, setPagesize] = useState(Number(searchParams.get("pagesize")) || 1);
    const router = useRouter();
    const dispatch = useDispatch();
    const [parentId, setParentId] = useState('');
    const [subCategory, setSubCategoryName] = useState('');
    const MainCategories = useSelector((state) => state.categoryReducer.maincategories);

    // Tracked here rather than off the shared reducer flag, which also flips
    // while a sub-category is being created and would blank the grid mid-form.
    const [listLoading, setListLoading] = useState(true);

    const totalPage = MainCategories?.totalPages || 1;
    const categories = MainCategories?.content;

    const createSubCategory = async (e, id) => {
        e.preventDefault();
        setParentId(id)
        try {
            await dispatch(createCategory({ name: subCategory, parentId: id, setLoading }))
        } catch (error) {

        } finally {
            setParentId('')
        }
    }

    const getCategory = useCallback(async () => {
        setListLoading(true);
        try {
            await dispatch(getCategoriesWhereIdNotNull({ pageno: pageno - 1, pagesize }))
        } catch (error) {

        } finally {
            setListLoading(false);
        }
    }, [dispatch, pageno, pagesize]);

    useEffect(() => {
        getCategory();
    }, [getCategory]);

    const handlePaginationChange = (_, page) => {
        setPageno(page);

        const params = new URLSearchParams(searchParams.toString());
        params.set("pageno", page);

        router.push(`?${params.toString()}`);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-5 p-5 md:p-10">
                <div className="grid grid-cols-1 gap-5 md:p-5">
                    <h1 className="font-bold text-3xl">All Sub-Categories</h1>
                </div>

                {listLoading ? (
                    <SubCategoryGridSkeleton count={Math.min(Math.max(pagesize, 3), 9)} />
                ) : categories?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  place-items-center">
                        {categories.map((item, index) => (
                            <SubCategoryCreateCard
                                key={index}
                                loading={loading}
                                parentId={parentId}
                                categories={item}
                                createSubCategory={createSubCategory}
                                setSubCategoryName={setSubCategoryName}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState onRetry={getCategory} />
                )}

                <div className="grid grid-cols-1 gap-5 h-full mb-10 p-5 place-items-center">
                    <Pagination
                        count={totalPage}
                        page={pageno}
                        onChange={handlePaginationChange}
                        color="primary"
                        sx={{
                            "& .MuiPaginationItem-root": {
                                backgroundColor: "transparent",
                                color: "var(--foreground)", // ensures text is visible
                            },
                            "& .Mui-selected": {
                                backgroundColor: "primary.main", // selected page still colored
                                color: "#fff",
                            },
                        }}
                    />
                </div>
            </div>
        </>
    )
}

/** Same three-column grid and card proportions as SubCategoryCreateCard. */
function SubCategoryGridSkeleton({ count = 6 }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
            {Array.from({ length: count }).map((_, card) => (
                <div
                    key={card}
                    className="grid w-full grid-cols-1 gap-5 rounded border border-zinc-200 p-5 shadow-lg dark:border-zinc-800"
                >
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-5 w-3/4" />
                    <div className="flex w-full flex-row items-center gap-5">
                        <Skeleton className="h-10 flex-1 rounded" />
                        <Skeleton className="h-10 w-24 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function EmptyState({ onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-200 px-4 py-16 text-center dark:border-zinc-800">
            <div className="rounded-full border border-zinc-200 p-3 dark:border-zinc-800">
                <FolderTree className="h-6 w-6 text-zinc-400" />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium">No categories on this page</p>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
                    Sub-categories are created against an existing category. Try another page, or
                    create a top-level category first.
                </p>
            </div>
            <button
                type="button"
                onClick={onRetry}
                className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
                Try again
            </button>
        </div>
    );
}
