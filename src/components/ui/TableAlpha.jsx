import { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender
} from '@tanstack/react-table';
import {
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    Search,
} from 'lucide-react';

const TableAlpha = ({
    data = [],
    columnsConfig,
    statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' }
    ],
    locationOptions = [
        { value: 'all', label: 'All Locations' },
        { value: 'Dubai', label: 'Dubai' },
        { value: 'Abu Dhabi', label: 'Abu Dhabi' },
        { value: 'Sharjah', label: 'Sharjah' },
        { value: 'Ajman', label: 'Ajman' },
    ],
    showStatusFilter,
    showLocationFilter,
    itemsName,
    additionalFilters
}) => {
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [locationFilter, setLocationFilter] = useState('all');

    const columns = columnsConfig;

    const filteredData = useMemo(() => {
        let filtered = data;

        if (showStatusFilter && statusFilter !== 'all') {
            filtered = filtered.filter(item => item.status === statusFilter);
        }

        if (showLocationFilter && locationFilter !== 'all') {
            filtered = filtered.filter(item => item.location === locationFilter);
        }

        if (filtering) {
            filtered = filtered.filter(item =>
                Object.values(item).some(value =>
                    value && value.toString().toLowerCase().includes(filtering.toLowerCase())
                )
            );
        }

        return filtered;
    }, [data, statusFilter, locationFilter, filtering]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            value={filtering}
                            onChange={(e) => setFiltering(e.target.value)}
                            placeholder={`Search ${itemsName}...`}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-sm outline-none"
                        />
                    </div>

                    {/* Status Filter */}
                    {showStatusFilter && (
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-sm cursor-pointer outline-none"
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Location Filter */}
                    {showLocationFilter && (
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-sm cursor-pointer outline-none"
                        >
                            {locationOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Additional Filters */}
                    {additionalFilters && additionalFilters}
                </div>

                <div className="text-sm text-gray-600">
                    Showing {table.getRowModel().rows.length} of {data.length} {itemsName}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={`flex items-center space-x-1 ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                                                        }`}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    <span>
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                    </span>
                                                    {header.column.getCanSort() && (
                                                        <span className="flex flex-col">
                                                            <ChevronUp
                                                                className={`w-3 h-3 ${header.column.getIsSorted() === 'asc' ? 'text-gray-900' : 'text-gray-400'
                                                                    }`}
                                                            />
                                                            <ChevronDown
                                                                className={`w-3 h-3 -mt-1 ${header.column.getIsSorted() === 'desc' ? 'text-gray-900' : 'text-gray-400'
                                                                    }`}
                                                            />
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => table.setPageSize(Number(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                        >
                            {[5, 10, 20, 30].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableAlpha;