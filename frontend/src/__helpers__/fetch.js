export default {
	successful(data) {
		return jest.fn().mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json: () => data,
			}),
		);
	},

	failing(error) {
		return jest.fn().mockImplementation(() =>
			Promise.reject(error),
		);
	},
};
