"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateCoverLetterAction(company: string, position: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Thiếu GEMINI_API_KEY");

    // --- BƯỚC 1: HỆ THỐNG DÒ TÌM TÊN MODEL ---
    // Đoạn code này sẽ hỏi Google xem bạn được dùng những model nào và in ra Terminal
    const checkModels = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await checkModels.json();
    console.log("=== DANH SÁCH MODEL BẠN ĐƯỢC PHÉP DÙNG ===");
    data.models?.forEach((m: any) => console.log(m.name));
    console.log("==========================================");

    // --- BƯỚC 2: KHỞI TẠO AI VỚI PHIÊN BẢN MỚI NHẤT ---
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Thử sử dụng phiên bản chuẩn mới nhất hiện tại
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Bạn là một chuyên gia nhân sự. Hãy viết một đoạn Thư ứng tuyển (Cover Letter) ngắn gọn, chuyên nghiệp bằng tiếng Việt (khoảng 150 chữ) để ứng tuyển vị trí ${position} tại công ty ${company}. Chỉ trả về nội dung thư, không giải thích gì thêm.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return { success: true, data: text };
  } catch (error: any) {
    console.error("Lỗi khi gọi AI:", error.message || error);
    return { success: false, error: "Lỗi AI. Hãy xem Terminal trong VS Code để biết thêm chi tiết." };
  }
}