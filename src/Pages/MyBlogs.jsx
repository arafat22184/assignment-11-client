/* eslint-disable no-unused-vars */
import { useContext, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import LoadingSpinner from "../Components/LoadingSpinner";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import {
  MdArticle,
  MdDateRange,
  MdFavorite,
  MdComment,
  MdCategory,
} from "react-icons/md";

const MyBlogs = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const [sorting, setSorting] = useState([]);

  // Fetch user's blogs
  const {
    data: blogs = [],
    isLoading: isBlogsLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myBlogs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myBlogs?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Memoized delete handler to avoid recreation on every render
  const handleDelete = useCallback(
    (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "This blog will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axiosSecure.delete(`/blogs/${id}`);
            if (res.data.message === "Blog and related comments deleted") {
              Swal.fire("Deleted!", "Your blog has been deleted.", "success");
              queryClient.invalidateQueries(["myBlogs", user?.email]);
            } else {
              Swal.fire("Error", "Failed to delete blog", "error");
            }
          } catch {
            Swal.fire("Error", "Something went wrong", "error");
          }
        }
      });
    },
    [axiosSecure, queryClient, user?.email]
  );

  // Table columns
  const columns = useMemo(
    () => [
      {
        header: (
          <span className="flex items-center gap-1 text-lg">
            <MdArticle className="text-green-400" /> Blog
          </span>
        ),
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
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <MdCategory className="text-slate-500" />
                {row.original.category}
              </div>
            </div>
          </div>
        ),
      },
      {
        header: (
          <span className="flex items-center gap-1 text-lg">
            <MdDateRange className="text-green-400" /> Published
          </span>
        ),
        accessorFn: (row) =>
          new Date(row.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        id: "date",
      },
      {
        header: (
          <span className="flex items-center gap-1 text-lg">
            <MdFavorite className="text-red-500" /> Likes
          </span>
        ),
        accessorFn: (row) => row.likes?.length || 0,
        id: "likes",
        cell: ({ getValue }) => (
          <span className="text-xs flex justify-center text-slate-400">
            {getValue()}
          </span>
        ),
      },
      {
        header: (
          <span className="flex items-center gap-1 text-lg">
            <MdComment className="text-blue-400" /> Comments
          </span>
        ),
        accessorFn: (row) => row.comments?.length || 0,
        id: "comments",
        cell: ({ getValue }) => (
          <span className="text-xs flex justify-center text-slate-400">
            {getValue()}
          </span>
        ),
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/updateBlog/${row.original._id}`);
              }}
              className="text-yellow-400 hover:text-yellow-300"
              title="Edit Blog"
            >
              <FaEdit size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row.original._id);
              }}
              className="text-red-500 hover:text-red-400"
              title="Delete Blog"
            >
              <FaTrashAlt size={18} />
            </button>
          </div>
        ),
      },
    ],
    [handleDelete, navigate]
  );

  const table = useReactTable({
    data: blogs,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
  });

  if (isBlogsLoading) return <LoadingSpinner />;
  if (isError)
    return <div className="p-6 text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-white mx-auto">
      {/* Section Header */}
      <div className="mb-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 dmSerif">
          My <span className="text-blue-400">Blogs</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
          Manage all your blogs here — update, delete, and track your likes and
          comments.
        </p>
      </div>

      {/* Table */}
      <div className="xl:overflow-hidden overflow-x-auto bg-slate-900 border border-slate-800 rounded-lg ">
        <table className="min-w-4xl w-full text-sm">
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
                          <FaSortAmountUp className="inline-block" />
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
                  You haven't added any blogs yet.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  className="border-t border-slate-800 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.01, backgroundColor: "#1e293b" }}
                  onClick={() => navigate(`/blog/${row.original._id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4 align-middle">
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

export default MyBlogs;
