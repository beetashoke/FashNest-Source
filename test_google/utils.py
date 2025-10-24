import frappe
from frappe import _


def after_request(response):
	"""Add CORS headers to all responses"""
	if hasattr(frappe.local, "response") and frappe.local.response:
		frappe.local.response.headers["Access-Control-Allow-Origin"] = "*"
		frappe.local.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
		frappe.local.response.headers["Access-Control-Allow-Headers"] = (
			"Content-Type, Authorization, X-Requested-With"
		)
		frappe.local.response.headers["Access-Control-Allow-Credentials"] = "true"
	return response
