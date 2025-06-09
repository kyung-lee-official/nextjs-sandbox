"use client";

import React, { useMemo, useState, useRef, useCallback } from "react";
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	createColumnHelper,
	ColumnDef, // Import ColumnDef for explicit typing
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { makeData, Product } from "../data";

// Use createColumnHelper for type-safe column definitions
const columnHelper = createColumnHelper<Product>();

export function Content() {
	const [data] = useState<Product[]>(() => makeData(10000)); // Type the data state

	const columns = useMemo<ColumnDef<Product, any>[]>( // Explicitly type columns
		() => [
			columnHelper.accessor("id", {
				header: "ID",
				size: 60, // Set size for layouting with CSS Grid
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("name", {
				header: "Product Name",
				size: 200,
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("category", {
				header: "Category",
				size: 150,
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("price", {
				header: "Price",
				size: 100,
				cell: (info) => `$${info.getValue().toFixed(2)}`,
			}),
			columnHelper.accessor("stock", {
				header: "Stock",
				size: 80,
				cell: (info) => info.getValue(),
			}),
		],
		[]
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const { rows } = table.getRowModel();

	// Virtualization setup
	const tableContainerRef = useRef<HTMLDivElement>(null); // Type the ref

	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => tableContainerRef.current,
		estimateSize: useCallback(
			(index: number) => {
				// Type the index
				const row = rows[index];
				// Assuming summary rows are slightly taller for demonstration
				return row.original.type === "categorySummary" ? 60 : 40;
			},
			[rows]
		),
		overscan: 5,
	});

	const virtualRows = rowVirtualizer.getVirtualItems();
	const totalSize = rowVirtualizer.getTotalSize();

	// Calculate the grid template columns string dynamically based on column sizes
	const gridTemplateColumns = useMemo(() => {
		return columns.map((col) => `${col.size || 0}px`).join(" ");
	}, [columns]);

	return (
		<div className="p-4 max-w-full mx-auto">
			<h1 className="text-3xl font-bold mb-6 text-neutral-800">
				Virtualization Basic Style Pattern
			</h1>
			<p className="mb-4 text-neutral-600">
				Showing {rows.length.toLocaleString()} rows.
			</p>

			<div
				ref={tableContainerRef}
				className="relative overflow-auto h-[600px] 
				border rounded"
			>
				{/* Header */}
				<div
					className="sticky top-0 z-10 grid
					bg-neutral-100 border-b"
					style={{ gridTemplateColumns }}
					role="row"
				>
					{table.getHeaderGroups().map((headerGroup) =>
						headerGroup.headers.map((header) => (
							<div
								key={header.id}
								className="p-3
								text-left border"
								role="columnheader"
								style={{
									gridColumn: `span ${header.colSpan} / span ${header.colSpan}`,
								}}
							>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
									  )}
							</div>
						))
					)}
				</div>

				{/* Body */}
				<div
					className="relative"
					style={{ height: totalSize }}
					role="rowgroup"
				>
					{virtualRows.map((virtualRow) => {
						const row = rows[virtualRow.index];
						const isSummaryRow =
							(row.original as Product).type ===
							"categorySummary";

						return (
							<div
								key={row.id}
								data-index={virtualRow.index}
								ref={(node) =>
									rowVirtualizer.measureElement(node)
								}
								className={`absolute w-full grid
									${isSummaryRow ? "bg-blue-50 text-blue-800" : "bg-white"}
									border-b border-neutral-200 `}
								style={{
									transform: `translateY(${virtualRow.start}px)`,
									height: virtualRow.size,
									gridTemplateColumns,
								}}
								role="row"
							>
								{isSummaryRow ? (
									<div
										className="flex justify-center items-center py-3 col-span-full
										text-center"
										role="cell"
									>
										{(row.original as Product).summaryText}
									</div>
								) : (
									row.getVisibleCells().map((cell) => (
										<div
											key={cell.id}
											className="flex items-center p-3
											border-r border-neutral-100 last:border-r-0 "
											role="cell"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</div>
									))
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
