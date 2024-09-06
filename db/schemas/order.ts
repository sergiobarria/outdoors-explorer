import { defineTable, column, NOW } from 'astro:db';
import { Tour } from './tour';
import { User } from './user';

export const Order = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true }),
		created: column.date({ default: NOW }),
		modified: column.text({ optional: true }),

		tourId: column.text({ name: 'tour_id', references: () => Tour.columns.id }),
		userId: column.text({ name: 'user_id', references: () => User.columns.id }),
		amount: column.number(),
		isPaid: column.boolean({ name: 'is_paid', default: false }),
		status: column.text({ default: 'pending' })
	}
});

export const ShippingAddress = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true }),
		created: column.date({ default: NOW }),
		modified: column.text({ optional: true }),

		orderId: column.text({ name: 'order_id', references: () => Order.columns.id }),
		address: column.text(),
		city: column.text(),
		state: column.text(),
		zip: column.text(),
		country: column.text(),
		phone: column.text({ optional: true })
	}
});

export const BillingAddress = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true }),
		created: column.date({ default: NOW }),
		modified: column.text({ optional: true }),

		orderId: column.text({ name: 'order_id', references: () => Order.columns.id }),
		address: column.text(),
		city: column.text(),
		state: column.text(),
		zip: column.text(),
		country: column.text(),
		phone: column.text({ optional: true })
	}
});
