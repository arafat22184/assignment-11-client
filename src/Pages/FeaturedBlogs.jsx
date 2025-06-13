/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import LoadingSpinner from "../Components/LoadingSpinner";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useNavigate } from "react-router";

const FeaturedBlogs = () => {
  const navigate = useNavigate();

  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featuredBlogs"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_LINK}/featuredBlogs`);
      if (!res.ok) throw new Error("Failed to fetch featured blogs");
      return res.json();
    },
  });

  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: "Blog",
        accessorKey: "title",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <img
              src={row.original.image}
              alt={row.original.title}
              className="w-12 h-12 rounded-md object-cover border border-slate-700"
            />
            <div>
              <div className="font-semibold text-blue-400">
                {row.original.title}
              </div>
              <div className="text-xs text-slate-400">
                {row.original.category}
              </div>
            </div>
          </div>
        ),
      },
      {
        header: "Author",
        accessorFn: (row) => row.author?.name || "Unknown",
        id: "author",
        cell: ({ row }) => (
          <div className="flex items-center flex-col xl:flex-row gap-2">
            <img
              src={row.original.author?.photo}
              alt={row.original.author?.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-slate-300">
              {row.original.author?.name}
            </span>
          </div>
        ),
      },
      {
        header: "Published",
        accessorFn: (row) =>
          new Date(row.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        id: "date",
      },
      {
        header: "Tags",
        accessorFn: (row) => row.tags?.join(", "),
        id: "tags",
        cell: ({ getValue }) => (
          <span className="text-xs text-slate-400">{getValue()}</span>
        ),
      },
      {
        header: "Likes",
        accessorFn: (row) => row.likes?.length || 0,
        id: "likes",
      },
    ],
    []
  );

  const table = useReactTable({
    data: blogs,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <div className="p-6 text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 dmSerif">
          Featured <span className="text-blue-400">Blogs</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
          Explore our top 10 handpicked blogs—expert insights, trending topics,
          and must-read articles. Dive into quality content that informs and
          inspires!
        </p>
      </div>
      <div className="xl:overflow-hidden overflow-x-auto bg-slate-900 border border-slate-800 rounded-lg">
        <table className="min-w-3xl md:min-w-2xl max-w-full text-sm">
          <thead className="bg-slate-800 text-blue-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      title="Click to sort"
                      className="px-4 py-3 text-left cursor-pointer select-none whitespace-nowrap hover:text-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-white">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {isSorted === "asc" ? (
                          <FaSortAmountUp className="inline-block text-yellow-400" />
                        ) : isSorted === "desc" ? (
                          <FaSortAmountDown className="inline-block text-yellow-400" />
                        ) : (
                          <span>
                            <FaSortAmountUp className="inline-block" />
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center text-gray-400"
                >
                  No featured blogs found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <motion.tr
                  key={row.id}
                  className="border-t border-slate-800 cursor-pointer"
                  whileHover={{ scale: 1.01, backgroundColor: "#1e293b" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => navigate(`/blog/${row.original._id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4 align-top">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
