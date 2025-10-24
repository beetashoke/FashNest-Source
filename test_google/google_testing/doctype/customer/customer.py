import frappe
from frappe.model.document import Document
from frappe.utils import now


class Customer(Document):
	def before_save(self):
		if not self.created_at:
			self.created_at = now()

	def validate(self):
		# Validate email format
		if self.email and "@" not in self.email:
			frappe.throw("Please enter a valid email address")

		# Validate phone number (basic validation)
		if self.phone and len(self.phone) < 10:
			frappe.throw("Please enter a valid phone number")
