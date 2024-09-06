import { defineTable, column, NOW } from 'astro:db';

export const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true, optional: false }),
		created: column.date({ default: NOW }),
		modified: column.text({ optional: true }),

		email: column.text(),
		password: column.text(),
		emailVerified: column.boolean({ name: 'email_verified', default: false }),
		acceptedTerms: column.boolean({ name: 'accepted_terms', default: false }),
		active: column.boolean({ default: true })
	}
});

export const Profile = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true }),
		created: column.date({ default: NOW }),
		modified: column.text({ optional: true }),

		userId: column.text({ references: () => User.columns.id }),
		firstName: column.text(),
		lastName: column.text(),
		photo: column.text({ optional: true })
	}
});

export const Session = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		expiresAt: column.date({ optional: false }),
		userId: column.text({ references: () => User.columns.id })
	}
});
