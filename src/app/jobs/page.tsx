"use client";

import { UseGetJobs, UseCreateJob } from "@/controllerApi/useApi/job/useJob";
import { useForm } from "react-hook-form";

export default function JobsPage() {
    const {jobs, isLoading} = UseGetJobs(); // gọi hook lấy dữ liệu
    const {triggerCreate, isCreating} = UseCreateJob(); // gọi hook tạo job
    const {register, handleSubmit, reset} = useForm(); // set up form (react hook form)
    const onSubmit = async (data: any) => {
        const payload = {
            ...data,
            status: 'Applided',
            appliedDate: new Date().toISOString(),
            description: 'Test description',
        }
        await triggerCreate(payload); // gọi hàm tạo job
        reset();
    };

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-blue-600">Quản lý Việc làm 💼</h1>
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h2 className="font-bold mb-4">Thêm công việc mới</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
                    <input
                        {...register("company")}
                        placeholder="Tên công ty (VD: Gooogle"
                        className="border p-2 rounded flex-1"
                        required
                    />
                    <input
                        {...register("position")}
                        placeholder="Vị trí (VD: Frontend Developer)"
                        className="border p-2 rounded flex-1"
                        required
                    />
                    <input
                        {...register("salary")}
                        placeholder="Mức lương (VD: 1000$)"
                        className="border p-2 rounded flex-1"
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={isCreating}
                    >
                        {isCreating ? 'Đang thêm...' : 'Thêm +'}
                    </button>
                </form>
            </div>

            {/* Danh sách công việc */}
            {isLoading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <div className="grid gap-4">
                    {jobs.map((job) => (
                        <div key={job.id} className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition">
                            <div className="flex justify-between items-start ">
                                <div>
                                    <h3 className="font-bold text-xl">{job.position}</h3>
                                    <p className="text-gray-600">{job.company}</p>
                                </div>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    {job.status}
                                </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-500 flex gap-4">
                                <span>💰 {job.salary}</span>
                                <span>📅 {job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : '—'}</span>
                            </div>  
                        </div>
                    ))}

                    {jobs.length === 0 && (
                        <p className="text-center text-gray-500">Chưa có công việc nào. Hãy thêm công việc mới!</p>
                    )}
                </div>
            )}
        </div>
    )
}