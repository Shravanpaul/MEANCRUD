class ResponseHandler {
	constructor(res, status, message, data) {
		this.res = res;
		this.status = status;
		this.message = message;
		this.data = data;
		this.send();
	}

	send () {
		if(this.status && this.status === 200) {
			this.message = 'Success'
		}
		return this.res.status(this.status).json({ message: this.message, ...(this.data && { data: this.data }) });
	}
}

module.exports = ResponseHandler;