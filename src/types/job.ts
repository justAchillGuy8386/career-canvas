export interface Job {
    id: string; // mock api sinh ra ID là string    
    company: string;
    position: string;
    status: 'Applied' | 'Interviewed' | 'Offered' | 'Rejected'; // enum cứng ko chỉnh sửa
    salary: string;
    description: string;
    appliedDate?: Date; // mock api tự thêm
}

// định nghĩa kiểu query khi find job
export interface QueryFindJob {
    search?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
}