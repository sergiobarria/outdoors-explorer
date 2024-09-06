import { defineTable, column, NOW } from 'astro:db';
import { Order } from './order';
import { User } from './user';

export const Payment = defineTable({
	columns: {
		id: column.text({ primaryKey: true, unique: true }),
		created: column.date({ default: NOW }),
		modified: column.text({ optional: true }),
		orderId: column.text({ references: () => Order.columns.id }),
		userId: column.text({ references: () => User.columns.id }),
		stripeSessionId: column.text({ name: 'stripe_session_id' }),
		paymentIntentId: column.text({ name: 'payment_intent_id' }),
		paymentMethod: column.text({ name: 'payment_method' }),
		amountPaid: column.number({ name: 'amount_paid' }),
		status: column.text({ default: 'pending' }),
		invoiceUrl: column.text({ name: 'invoice_url', optional: true })
	}
});
