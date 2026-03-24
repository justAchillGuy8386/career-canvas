"use client";

// !!! CHỖ CẦN THÊM 1/3 !!!: Import useState và Server Action
import { useState } from "react"; // Thêm useState vào đây
import { UseGetJobs, UseCreateJob, UseDeleteJob, UseUpdateJob } from "@/controllerApi/useApi/job/useJob";
import { useForm } from "react-hook-form";
import { Trash2, Briefcase, Plus, GripVertical, MapPin, DollarSign, Wand2 } from "lucide-react"; // Thêm icon cây đũa thần Wand2 cho đẹp
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
// Import Server Action gọi AI
import { generateCoverLetterAction } from "@/application/api/ai"; 

const COLUMNS = {
  Applied: { title: "Đã ứng tuyển", color: "bg-gray-100 border-gray-300" },
  Interviewing: { title: "Phỏng vấn", color: "bg-blue-50 border-blue-200" },
  Offered: { title: "Nhận Offer", color: "bg-green-50 border-green-200" }, 
  Rejected: { title: "Từ chối", color: "bg-red-50 border-red-200" },
};

export default function JobsPage() {
  const { jobs, isLoading } = UseGetJobs();
  const { triggerCreate, isCreating } = UseCreateJob();
  const { triggerDelete } = UseDeleteJob();
  const { triggerUpdate } = UseUpdateJob();

  const { register, handleSubmit, reset } = useForm();

  // !!! CHỖ CẦN THÊM 2/3 !!!: Khai báo State và Hàm xử lý AI (Nằm TRƯỚC return)
  
  // 1. State theo dõi xem Job nào đang được AI viết thư
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  // 2. State lưu nội dung Cover Letter để hiển thị Modal
  const [coverLetter, setCoverLetter] = useState<{company: string, position: string, text: string} | null>(null);

  // 3. Hàm xử lý khi bấm nút AI
  const handleGenerateAI = async (company: string, position: string, jobId: string) => {
    setGeneratingId(jobId); // Hiện loading
    const res = await generateCoverLetterAction(company, position); // Gọi Server Action bảo mật
    setGeneratingId(null); // Tắt loading
    if (res.success && res.data) {
      setCoverLetter({ company, position, text: res.data }); // Mở Modal
    } else {
      alert("Lỗi AI: " + res.error);
    }
  };

  // --- Hết phần code logic AI ---

  const onSubmit = async (data: any) => {
    const payload = { ...data, status: 'Applied', appliedDate: new Date().toISOString() };
    await triggerCreate(payload); reset();
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    const newStatus = destination.droppableId;
    await triggerUpdate(draggableId, { status: newStatus });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
        <Briefcase className="text-blue-600" size={32} /> Career Canvas
      </h1>

      {/* Form thêm nhanh */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 mb-10 max-w-3xl bg-gray-50 p-4 rounded-xl border border-gray-200">
        <input {...register("company")} placeholder="Công ty..." className="border border-gray-300 p-2.5 rounded-lg flex-1 outline-none" required />
        <input {...register("position")} placeholder="Vị trí..." className="border border-gray-300 p-2.5 rounded-lg flex-1 outline-none" required />
        <input {...register("salary")} placeholder="Lương" className="border border-gray-300 p-2.5 rounded-lg w-28 outline-none" />
        <button disabled={isCreating} className="bg-blue-600 text-white px-5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-1">
          <Plus size={20} /> Thêm
        </button>
      </form>

      {/* --- KANBAN BOARD --- */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 h-full items-start">
          {Object.entries(COLUMNS).map(([columnId, columnData]) => (
            <div key={columnId} className={`rounded-2xl border-2 p-4 min-h-[600px] flex flex-col ${columnData.color}`}>
              <h2 className="font-bold text-gray-700 mb-4 flex justify-between items-center text-lg">{columnData.title}</h2>

              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className={`flex-1 space-y-4 rounded-xl transition-colors ${snapshot.isDraggingOver ? "bg-black/5" : ""}`}>
                    {jobs.filter((job) => job.status === columnId).map((job, index) => (
                      <Draggable key={job.id} draggableId={job.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                            className={`bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all 
                              ${snapshot.isDragging ? "shadow-xl ring-2 ring-blue-400 opacity-90" : ""}`}
                            style={provided.draggableProps.style}
                          >
                            {/* --- Nội dung Card --- */}
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{job.position}</h3>
                              <button onClick={() => triggerDelete(job.id)} className="text-gray-300 hover:text-red-500 p-1"><Trash2 size={16} /></button>
                            </div>
                            <p className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-1"><MapPin size={14} className="text-gray-400"/> {job.company}</p>
                            
                            <div className="flex justify-between items-center pt-3 mt-1">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500"><GripVertical size={14} className="text-gray-300" /><span>...</span></div>
                              {job.salary && (<span className="text-green-700 bg-green-50 px-2 py-1 rounded font-semibold text-xs flex items-center"><DollarSign size={12}/> {job.salary}</span>)}
                            </div>
                            
                            {/* !!! CHỖ CẦN THÊM 3/3 VỊ TRÍ 1/2 !!!: Nút gọi AI (Nằm cuối Card, sau Salary) */}
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <button 
                                onClick={() => handleGenerateAI(job.company, job.position, job.id)}
                                disabled={generatingId !== null}
                                className="w-full py-2 rounded-lg text-sm font-medium transition-all flex justify-center items-center gap-2
                                  bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 hover:from-purple-100 hover:to-pink-100 border border-purple-200 disabled:opacity-50"
                              >
                                {generatingId === job.id ? "⏳ Đang viết..." : <><Wand2 size={16}/> AI Viết Thư</>}
                              </button>
                            </div>
                            {/* --- Hết Card div --- */}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* !!! CHỖ CẦN THÊM 3/3 VỊ TRÍ 2/2 !!!: Modal AI (Nằm ngoài cùng, cuối file) */}
      {coverLetter && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl max-w-2xl w-full shadow-2xl border border-purple-100 transform transition-all">
            <h3 className="font-bold text-2xl mb-2 text-gray-800 flex items-center gap-2"><Wand2 className="text-purple-600"/> Thư Ứng Tuyển AI</h3>
            <p className="text-gray-500 mb-4 text-sm">Gửi tới: <strong className="text-purple-600">{coverLetter.position} @ {coverLetter.company}</strong></p>
            <textarea className="w-full h-64 border border-gray-200 bg-gray-50 p-4 rounded-xl mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none leading-relaxed" defaultValue={coverLetter.text}></textarea>
            <div className="flex justify-end gap-3">
              <button onClick={() => setCoverLetter(null)} className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100">Đóng</button>
              <button onClick={() => { navigator.clipboard.writeText(coverLetter.text); alert("Đã copy!"); }} className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-purple-700 shadow-lg shadow-purple-200">Copy văn bản</button>
            </div>
          </div>
        </div>
      )}

    </div> // Thẻ div to nhất của trang
  );
}