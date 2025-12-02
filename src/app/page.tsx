export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold text-blue-600">
                CareerCanvas 🚀
            </h1>
            <p className="mt-4 text-xl">
                Hệ thống quản lí ứng tuyển thông minh
            </p>
            <div className="mt-8 p-4 border rounded bg-gray-100">
                <p>Status: <strong>Environment Setup Complete</strong></p>
                <p>API Base URL: Đã kết nối tới MockAPI</p>
            </div>
        </main>
    )
}
