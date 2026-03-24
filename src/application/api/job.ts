import { restTransport } from "../controllerApi/transportByAxios";
import { Job } from "@/types/job";

// định nghĩa endpoint của mock api
const RESOURCE = "/jobs";

const { get, post } = restTransport();

export const getJobs = async () => { // action lấy danh sách job
    const res = await get<Job[]>(RESOURCE); //gọi phương thức get từ transport, Job[] trả về MẢNG các job
    return res;
}

// action tạo job mới
export const createJob = async (data: Omit<Job, 'id' | 'createdAt'>) => {
    // gọi phương thức post từ transport, Omit<Job, 'id'> là backend tự tạo, ko cần gửi id (BE tự sinh)
    const res = await post<Job>(RESOURCE, data);
    return res;
}

//action xóa job
export const deleteJob = async (id: string) => { // mock api yêu cầu id dạng: /jobs/:id, nối RESOURCE(/jobs) + / + id
    const res = await restTransport()._delete<Job>(`${RESOURCE}/${id}`);
    return res;
}

// action update job
export const updateJob = async (id: string, data: Partial<Job>) => {
    const res = await restTransport().put<Job>(`${RESOURCE}/${id}`, data);
    return res;
}