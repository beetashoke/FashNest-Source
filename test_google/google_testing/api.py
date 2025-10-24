import frappe
from frappe.utils import now, cstr
import hashlib


def add_cors_headers():
	"""Add CORS headers to the response"""
	if (
		hasattr(frappe.local, "response")
		and frappe.local.response
		and hasattr(frappe.local.response, "headers")
	):
		frappe.local.response.headers["Access-Control-Allow-Origin"] = "*"
		frappe.local.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
		frappe.local.response.headers["Access-Control-Allow-Headers"] = (
			"Content-Type, Authorization, X-Requested-With"
		)
		frappe.local.response.headers["Access-Control-Allow-Credentials"] = "true"


@frappe.whitelist(allow_guest=True)
def list_categories():
	"""Return published uniform categories."""
	categories = frappe.get_all(
		"Uniform Category",
		fields=[
			"name",
			"title",
			"slug",
			"description",
			"hero_image",
			"button_text",
			"order",
		],
		filters={"is_published": 1},
		order_by="`order` asc, modified desc",
	)
	return categories


@frappe.whitelist(allow_guest=True)
def list_items(category: str | None = None, subcategory: str | None = None):
	"""Return items filtered by category and/or subcategory.

	Accepts any of the following for the `category` param:
	- Category document name (primary key)
	- Category slug
	- Category title
	And for `subcategory` param:
	- Subcategory document name (primary key)
	- Subcategory slug
	- Subcategory title
	"""

	filters = {"is_published": 1}
	if category:
		cat_name = None
		if frappe.db.exists("Uniform Category", category):
			cat_name = category
		else:
			cat = frappe.db.get_value(
				"Uniform Category",
				{"slug": category},
				["name"],
			)
			if not cat:
				cat = frappe.db.get_value(
					"Uniform Category",
					{"title": ["like", category]},
					["name"],
				)
			cat_name = cat

		if cat_name:
			filters["category"] = cat_name
		else:
			# If not resolved, still attempt with the provided value (for legacy data)
			filters["category"] = category

	if subcategory:
		subcat_name = None
		if frappe.db.exists("Uniform Subcategory", subcategory):
			subcat_name = subcategory
		else:
			subcat = frappe.db.get_value(
				"Uniform Subcategory",
				{"slug": subcategory},
				["name"],
			)
			if not subcat:
				subcat = frappe.db.get_value(
					"Uniform Subcategory",
					{"title": ["like", subcategory]},
					["name"],
				)
			subcat_name = subcat

		if subcat_name:
			filters["subcategory"] = subcat_name
		else:
			# Fallback for legacy data
			filters["subcategory"] = subcategory

	items = frappe.get_all(
		"Uniform Item",
		fields=[
			"name",
			"title",
			"category",
			"subcategory",
			"image",
			"short_description",
			"price",
			"order",
		],
		filters=filters,
		order_by="`order` asc, modified desc",
	)
	return items


@frappe.whitelist(allow_guest=True)
def get_company_settings():
	"""Return active company settings."""
	settings = frappe.get_all(
		"Company Settings",
		fields=[
			"company_name",
			"tagline",
			"phone",
			"email",
			"address",
			"city",
			"state",
			"pincode",
			"website",
			"facebook_url",
			"twitter_url",
			"instagram_url",
			"youtube_url",
			"whatsapp_number",
		],
		filters={"is_active": 1},
		limit=1,
	)
	return settings[0] if settings else {}


@frappe.whitelist(allow_guest=True)
def list_subcategories(category: str | None = None):
	"""Return subcategories for a given category."""
	filters = {"is_published": 1}
	if category:
		# Resolve category by name, slug, or title
		cat_name = None
		if frappe.db.exists("Uniform Category", category):
			cat_name = category
		else:
			cat = frappe.db.get_value(
				"Uniform Category",
				{"slug": category},
				["name"],
			)
			if not cat:
				cat = frappe.db.get_value(
					"Uniform Category",
					{"title": ["like", category]},
					["name"],
				)
			cat_name = cat

		if cat_name:
			filters["category"] = cat_name
		else:
			# Fallback for legacy data
			filters["category"] = category

	# Fetch subcategories with image field
	subcategories = frappe.get_all(
		"Uniform Subcategory",
		fields=[
			"name",
			"title",
			"slug",
			"image",
			"description",
			"order",
		],
		filters=filters,
		order_by="`order` asc, modified desc",
	)
	return subcategories


@frappe.whitelist(allow_guest=True)
def generate_brochure():
	"""Generate a simple text brochure with all items and prices"""
	import base64

	# Get company settings
	settings = frappe.get_all(
		"Company Settings",
		fields=["company_name", "tagline", "phone", "email", "address"],
		filters={"is_active": 1},
		limit=1,
	)
	company = settings[0] if settings else {}

	# Get all categories and items
	categories = frappe.get_all(
		"Uniform Category",
		fields=["name", "title", "description"],
		filters={"is_published": 1},
		order_by="`order` asc",
	)

	# Build brochure content
	content = []
	content.append("=" * 60)
	content.append(f"{company.get('company_name', 'UNIFORMITY').upper()}")
	content.append(f"{company.get('tagline', 'Creating Harmony')}")
	content.append("=" * 60)
	content.append("")

	# Contact info
	if company.get("phone"):
		content.append(f"Phone: {company['phone']}")
	if company.get("email"):
		content.append(f"Email: {company['email']}")
	if company.get("address"):
		content.append(f"Address: {company['address']}")
	content.append("")
	content.append("-" * 60)
	content.append("")

	# Add categories and items
	for category in categories:
		content.append(f"📋 {category['title'].upper()}")
		content.append("-" * 40)
		if category.get("description"):
			content.append(f"Description: {category['description']}")
			content.append("")

		# Get items for this category
		items = frappe.get_all(
			"Uniform Item",
			fields=["title", "short_description", "price"],
			filters={"category": category["name"], "is_published": 1},
			order_by="`order` asc",
		)

		if items:
			content.append("ITEMS:")
			content.append("")
			for item in items:
				content.append(f"• {item['title']}")
				if item.get("short_description"):
					content.append(f"  Description: {item['short_description']}")
				price = f"₹{item['price']:.2f}" if item.get("price") else "Contact for Price"
				content.append(f"  Price: {price}")
				content.append("")
		else:
			content.append("No items available in this category.")
			content.append("")

		content.append("")

	# Footer
	content.append("=" * 60)
	content.append("Thank you for choosing us!")
	content.append("For more information, please contact us.")
	content.append("=" * 60)

	# Convert to bytes and encode as base64
	brochure_text = "\n".join(content)
	brochure_bytes = brochure_text.encode("utf-8")
	brochure_base64 = base64.b64encode(brochure_bytes).decode("utf-8")

	# Return brochure content
	return {
		"content": brochure_base64,
		"filename": f"{company.get('company_name', 'UNIFORMITY').replace(' ', '_')}_Brochure.txt",
		"type": "text/plain",
	}


# Authentication API endpoints


@frappe.whitelist(allow_guest=True)
def user_signup(first_name, last_name, email, phone, password, address, city, state, pincode):
	"""Register a new user."""
	try:
		# Check if customer already exists
		if frappe.db.exists("Customer", {"email": email}):
			return {"success": False, "message": "Customer with this email already exists"}

		# Check if user already exists
		if frappe.db.exists("User", {"email": email}):
			return {"success": False, "message": "User with this email already exists"}

		# Create new customer
		customer_doc = frappe.get_doc(
			{
				"doctype": "Customer",
				"first_name": first_name,
				"last_name": last_name,
				"email": email,
				"phone": phone,
				"address": address,
				"city": city,
				"state": state,
				"pincode": pincode,
				"is_active": 1,
				"created_at": now(),
			}
		)
		customer_doc.insert()

		# Create Frappe User using system method
		# Use Administrator to create the user
		frappe.set_user("Administrator")

		user_doc = frappe.get_doc(
			{
				"doctype": "User",
				"email": email,
				"first_name": first_name,
				"last_name": last_name,
				"new_password": password,
				"send_welcome_email": 0,
				"enabled": 1,
				"user_type": "System User",
				"roles": [{"role": "System Manager"}],
			}
		)
		user_doc.insert(ignore_permissions=True)

		frappe.set_user("Guest")

		frappe.db.commit()

		return {
			"success": True,
			"message": "Customer registered successfully",
			"customer_id": customer_doc.name,
			"user_id": user_doc.name,
		}

	except Exception as e:
		frappe.log_error(f"User signup error: {str(e)}")
		return {"success": False, "message": f"Registration failed: {str(e)}"}


@frappe.whitelist(allow_guest=True)
def test_login_debug(email):
	"""Debug login function."""
	try:
		customer = frappe.get_value(
			"Customer", {"email": email, "is_active": 1}, ["name", "password", "email"], as_dict=True
		)
		return {"success": True, "customer": customer}
	except Exception as e:
		return {"success": False, "error": str(e)}


@frappe.whitelist(allow_guest=True)
def test_password_debug(email, password):
	"""Debug password function."""
	try:
		customer = frappe.get_value("Customer", {"email": email, "is_active": 1}, ["name"], as_dict=True)
		if not customer:
			return {"success": False, "message": "Customer not found"}

		customer_doc = frappe.get_doc("Customer", customer.name)
		return {
			"success": True,
			"stored_password": customer_doc.password,
			"provided_password": password,
			"match": customer_doc.password == password,
		}
	except Exception as e:
		return {"success": False, "error": str(e)}


@frappe.whitelist(allow_guest=True)
def user_login(email, password):
	"""Authenticate user login."""
	try:
		# Check if user exists
		user = frappe.get_value("User", {"email": email, "enabled": 1}, ["name"], as_dict=True)

		if not user:
			return {"success": False, "message": "Invalid email or password"}

		# Use Frappe's built-in authentication
		from frappe.auth import LoginManager

		login_manager = LoginManager()
		login_manager.authenticate(email, password)

		if not login_manager.user:
			return {"success": False, "message": "Invalid email or password"}

		# Get customer data
		customer = frappe.get_value("Customer", {"email": email}, ["name"], as_dict=True)

		if customer:
			customer_data = frappe.get_value(
				"Customer",
				customer.name,
				[
					"name",
					"first_name",
					"last_name",
					"email",
					"phone",
					"address",
					"city",
					"state",
					"pincode",
					"created_at",
				],
				as_dict=True,
			)
		else:
			# If no customer found, return user data
			customer_data = frappe.get_value(
				"User",
				user.name,
				[
					"name",
					"first_name",
					"last_name",
					"email",
					"phone",
					"address",
					"city",
					"state",
					"pincode",
					"creation",
				],
				as_dict=True,
			)

		return {"success": True, "message": "Login successful", "user": customer_data}

	except Exception as e:
		frappe.log_error(f"User login error: {str(e)}")
		return {"success": False, "message": f"Login failed: {str(e)}"}


@frappe.whitelist(allow_guest=True)
def get_user_profile(user_id):
	"""Get user profile by ID."""
	try:
		customer_data = frappe.get_value(
			"Customer",
			user_id,
			[
				"name",
				"first_name",
				"last_name",
				"email",
				"phone",
				"address",
				"city",
				"state",
				"pincode",
				"created_at",
			],
			as_dict=True,
		)

		if not customer_data:
			return {"success": False, "message": "Customer not found"}

		return {"success": True, "user": customer_data}

	except Exception as e:
		frappe.log_error(f"Get user profile error: {str(e)}")
		return {"success": False, "message": f"Failed to get user profile: {str(e)}"}


@frappe.whitelist(allow_guest=True)
def update_user_profile(user_id, **kwargs):
	"""Update user profile."""
	try:
		customer_doc = frappe.get_doc("Customer", user_id)

		# Update allowed fields
		allowed_fields = ["first_name", "last_name", "phone", "address", "city", "state", "pincode"]
		for field, value in kwargs.items():
			if field in allowed_fields and value is not None:
				customer_doc.set(field, value)

		customer_doc.save()
		frappe.db.commit()

		return {"success": True, "message": "Profile updated successfully"}

	except Exception as e:
		frappe.log_error(f"Update user profile error: {str(e)}")
		return {"success": False, "message": f"Failed to update profile: {str(e)}"}
