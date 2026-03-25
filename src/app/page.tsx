import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold text-blue-600">
                CareerCanvas 🚀
            </h1>
            <p className="mt-4 text-xl">
                Hệ thống quản lí ứng tuyển thông minh
            </p>
            <div className="mt-8 p-4 border rounded bg-gray-100 text-center w-full max-w-md">
                <p>Status: <strong>Environment Setup Complete</strong></p>
                <p>API Base URL: Đã kết nối tới MockAPI</p>
                <Link href="/jobs" className="mt-4 inline-block w-60 py-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition mx-auto">
                    Click để vào trang quản lý
                </Link>
            </div>
        </main>
    )
}
