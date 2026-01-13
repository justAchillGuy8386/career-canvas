"use client";

import useSWR, { useSWRConfig } from "swr";
import { getJobs, createJob } from "@/application/api/job";
import { Job } from "@/types/job";
import { use, useState } from "react";

export const JOB_CACHE_KEY = "/jobs"; //cache key: tên ngắn kéo chứa dữ liệu

export function UseGetJobs() { // hook read: lấy danh sách job
    const { data, error, isLoading } = useSWR<Job[]>(
        JOB_CACHE_KEY, 
        getJobs // swr tự động gọi hàm getJobs để fetch data
    );

    return {
        jobs: data || [], //nếu data undefined trả về mảng rỗng
        isLoading,
        isError: error
    }
}

export function UseCreateJob() {
    const { mutate } = useSWRConfig(); //lấy hàm mutate từ swr config để cập nhật cache
    const [isCreating, setIsCreating] = useState(false); // trạng thái đang tạo job

    const triggerCreate = async (newJobData: any) => { // hàm tạo job mới
        setIsCreating(true);
        try {
            await createJob(newJobData); //gọi api tạo job
            mutate (JOB_CACHE_KEY); // thành công => gọi swr tải lại danh sách mới
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, error }; 
        } finally {
            setIsCreating(false); 
        }
    };

    return {
        triggerCreate,
        isCreating
    }
}