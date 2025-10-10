import frappe


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
