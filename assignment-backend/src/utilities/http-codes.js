const someHTTPSTATUS = {
	200:`API request valid, informations ready to access`,
	304:`API request valid, but data was not modified since last accessed (compared using Etag)`,
	400:`Client side error. occurs for invalid request`,
	401:`occurs for unauthorized request`,
	501:`Server side error. Internal server error, unable to process your request`
}

module.exports = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
	OK: 200
}