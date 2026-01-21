"use client";

import { UseGetJobs, UseCreateJob, UseDeleteJob } from "@/controllerApi/useApi/job/useJob";
import { useForm } from "react-hook-form";
import { Trash2, Briefcase, DollarSign, Calendar } from "lucide-react"; // Import Icon đẹp

export default function JobsPage() {
  const { jobs, isLoading } = UseGetJobs();
  const { triggerCreate, isCreating } = UseCreateJob();
  const { triggerDelete, isDeleting } = UseDeleteJob(); // Gọi hook xóa

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      status: 'Applied', // Mặc định khi tạo mới là "Đã ứng tuyển"
      appliedDate: new Date().toISOString(),
      description: 'Mô tả công việc...'
    };
    await triggerCreate(payload);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-blue-700 flex items-center gap-3">
          <Briefcase size={40} /> CareerCanvas
        </h1>

        {/* --- FORM THÊM MỚI (Đẹp hơn) --- */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10 border border-gray-100">
          <h2 className="font-bold text-gray-700 mb-4 text-lg">🚀 Thêm công việc mới</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-wrap md:flex-nowrap">
            <input 
              {...register("company")}
              placeholder="Tên công ty (VD: VNG)" 
              className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input 
               {...register("position")}
              placeholder="Vị trí (VD: React Developer)" 
              className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input 
               {...register("salary")}
              placeholder="Lương" 
              className="border border-gray-300 p-3 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              disabled={isCreating}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-200"
            >
              {isCreating ? "Đang lưu..." : "Thêm Ngay"}
            </button>
          </form>
        </div>

        {/* --- DANH SÁCH JOB --- */}
        {isLoading ? (
          <div className="text-center py-10 text-gray-500">⏳ Đang tải dữ liệu từ MockAPI...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="flex justify-between items-start mb-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Briefcase className="text-blue-600" size={24} />
                  </div>
                  {/* Nút Xóa với Icon thùng rác */}
                  <button 
                    onClick={() => triggerDelete(job.id)}
                    disabled={isDeleting}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                    title="Xóa công việc này"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <h3 className="font-bold text-xl text-gray-800 mb-1">{job.position}</h3>
                <p className="text-gray-500 font-medium mb-4">{job.company}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <DollarSign size={16} className="text-green-600"/> 
                    <span className="font-semibold text-green-700">{job.salary || "Thỏa thuận"}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Calendar size={16} /> 
                    <span>
                        {job.appliedDate 
                            ? new Date(job.appliedDate).toLocaleDateString('vi-VN')
                            : 'Chưa có ngày'
                        }
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full 
                    ${job.status === 'Applied' ? 'bg-yellow-100 text-yellow-700' : 
                      job.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                      job.status === 'Offered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}