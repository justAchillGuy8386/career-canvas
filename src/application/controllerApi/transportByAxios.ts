import axios, { Axios, AxiosRequestConfig, AxiosResponse} from "axios";

// lấy url từ mock api
const BASE_URL = "https://692edb8591e00bafccd5a98a.mockapi.io/jobs"; 

// instance axios để tái sử dụng cấu hình
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    //timeout 10s nếu mạng lag
    timeout: 10000,
});

// (Tùy chọn) Interceptor: lưu token để ứng dụng chạy nhanh hơn
api.interceptors.request.use(
    (config) => {
        // console.log('Đang gọi API:', config.url);
        return config; 
    },
    (error) => {
        Promise.reject(error);
    }
)

//Helpful function dùng để lấy dữ liệu nhanh gọn, các phương thức crud cơ bản
export const restTransport = () => {
    return {
        get: async <T>(url: string , params?: any, config?: AxiosRequestConfig) => {
            const res = await api.get<T>(url, {...config, params});
            return res.data; //trả về data trực tiếp
        },

        post: async <T>(url: string, data: any, config?: AxiosRequestConfig) => {
            const res = await api.post<T>(url, data, config);
            return res.data;
        },

        put: async <T>(url: string, data: any, config?: AxiosRequestConfig) => {
            const res = await api.put<T>(url, data, config);
            return res.data;
        },

        _delete: async <T>(url: string, config?: AxiosRequestConfig) => {
            const res = await api.delete<T>(url, config);
            return res.data;
        }
    }
}