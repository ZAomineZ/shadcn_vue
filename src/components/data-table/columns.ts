import type {ColumnDef} from '@tanstack/vue-table'
import type {Task} from '@/data/schema'

import {Badge} from '@/components/ui/badge'
import {Checkbox} from '@/components/ui/checkbox'
import {h} from 'vue'
import {labels, priorities, statuses} from '@/data/data'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import {Progress} from "@/components/ui/progress";
import SheetDetails from "./SheetDetails.vue";
import ChartTableArea from "../ChartTableArea.vue";

export const columns: ColumnDef<Task>[] = [
    {
        id: 'select',
        header: ({table}) => h(Checkbox, {
            'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
            'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
            'ariaLabel': 'Select all',
            'class': 'translate-y-0.5',
        }),
        cell: ({row}) => h(Checkbox, {
            'checked': row.getIsSelected(),
            'onUpdate:checked': value => row.toggleSelected(!!value),
            'ariaLabel': 'Select row',
            'class': 'translate-y-0.5'
        }),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: ({column}) => h(DataTableColumnHeader, {column, title: 'Task'}),
        cell: ({row}) => h('div', {class: 'w-20'}, row.getValue('id')),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'title',
        header: ({column}) => h(DataTableColumnHeader, {column, title: 'Title'}),

        cell: ({row}) => {
            const label = labels.find(label => label.value === row.original.label)

            return h('div', {class: 'flex space-x-2'}, [
                label ? h(Badge, {variant: 'outline'}, () => label.label) : null,
                h('span', {class: 'max-w-[500px] truncate font-medium'}, row.getValue('title')),
            ])
        },
    },
    {
        accessorKey: 'status',
        header: ({column}) => h(DataTableColumnHeader, {column, title: 'Status'}),

        cell: ({row}) => {
            const status = statuses.find(
                status => status.value === row.getValue('status'),
            )

            if (!status)
                return null

            return h('div', {class: 'flex w-[100px] items-center'}, [
                status.icon && h(status.icon, {class: 'mr-2 h-4 w-4 text-muted-foreground'}),
                h('span', status.label),
            ])
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: 'priority',
        header: ({column}) => h(DataTableColumnHeader, {column, title: 'Priority'}),
        cell: ({row}) => {
            const priority = priorities.find(
                priority => priority.value === row.getValue('priority'),
            )

            if (!priority)
                return null

            return h('div', {class: 'flex items-center'}, [
                priority.icon && h(priority.icon, {class: 'mr-2 h-4 w-4 text-muted-foreground'}),
                h('span', {}, priority.label),
            ])
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: 'created_at',
        header: ({column}) => h(DataTableColumnHeader, {column, title: 'Created At'}),
        cell: ({row}) => h('div', {class: 'w-20'}, row.getValue('created_at')),
    },
    {
        accessorKey: 'last_updated',
        header: ({column}) => h(DataTableColumnHeader, {column, title: 'Last Updated'}),
        cell: ({row}) => h('div', {class: 'w-20'}, row.getValue('last_updated')),
    },
    {
        accessorKey: 'progress',
        header: ({column}) => h(DataTableColumnHeader, {column, title: 'Progress'}),
        cell: ({row}) => {
            return h('div', {class: 'flex items-center'}, [
                h(Progress, {"model-value": row.getValue('progress'), 'class': 'h-2'})
            ])
        },
    },
    {
        accessorKey: 'occurrence',
        header: ({column}) => h(DataTableColumnHeader, {column, title: 'Occurrence'}),
        cell: ({row}) => {
            return h('div', {class: 'flex items-center'}, [
                h(ChartTableArea, {})
            ])
        },
    },
    {
        id: 'details',
        cell: ({row}) => h(SheetDetails, {row}),
    },
    {
        id: 'actions',
        cell: ({row}) => h(DataTableRowActions, {row}),
    },
]