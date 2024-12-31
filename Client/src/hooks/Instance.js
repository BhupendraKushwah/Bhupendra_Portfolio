import Axios from "axios";
import { getAuthHeader } from "../services/Authentication.service";
// import { loadEnv } from "vite";

function makeRequest(method, baseUrl, responseType = "json") {
	return async function (url, data = {}, options = {}) {
		if (!url) throw new Error("URL can't be blank");
		if(!import.meta.env.VITE_ENV=='development'){
			baseUrl = import.meta.env.VITE_SERVER_URL
			console.log('ENV :',import.meta.env.VITE_SERVER_URL)
		}
		const isDataIsParams = method === "get" || method === "delete";
		const { status, error, ...params } = isDataIsParams ? data : options;

		try {
			const response = await Axios({
				method,
				url: baseUrl + url,
				data,
				params,
				responseType,
				...getAuthHeader(),
			});

			return status ? response : response.data;
		} catch (error) {
			if (error) throw error;
			return { status: 500 };
		}
	};
}

export default function useInstance(baseUrl = "/") {
	return {
		get: makeRequest("get", baseUrl),
		post: makeRequest("post", baseUrl),
		put: makeRequest("put", baseUrl),
		patch: makeRequest("patch", baseUrl),
		delete: makeRequest("delete", baseUrl),
		download: makeRequest("get", baseUrl, "blob"),
	};
}
