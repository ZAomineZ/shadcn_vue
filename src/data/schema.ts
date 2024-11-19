import { z } from 'zod'

const commentSchema = z.object({
    author: z.string(),              // L'auteur doit être une chaîne de caractères
    comment: z.string(),             // Le commentaire doit être une chaîne de caractères
    date: z.string().refine((val) => {
        // Optionnel : Validation de la date (en format ISO ou une autre règle de formatage)
        return !isNaN(Date.parse(val)); // Vérifie que c'est une date valide
    }, {
        message: "Invalid date format"
    })
});

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
    id: z.string(),
    title: z.string(),
    status: z.string(),
    label: z.string(),
    priority: z.string(),
    created_at: z.string(),
    last_updated: z.string(),
    due_date: z.string(),
    estimated_time: z.string(),
    assigned_to: z.string(),
    subtasks: z.array(z.string()),
    description: z.string(),
    comments: z.array(commentSchema),
    associated_links: z.array(z.string()),
    progress: z.string(),
    blockers: z.string(),
    department: z.string(),
    task_type: z.string(),
    absolute_priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>