// Hàm tạo Prompt từ dữ liệu đã collect (Ngữ cảnh)
function buildNSFQPrompt(originalText) {
    const context = document.title; // Lấy tiêu đề trang làm ngữ cảnh
    const chapterInfo = document.querySelector('.chapter-info')?.innerText || ""; // Ví dụ lấy tên chương
    
    return `[System: Role DeepSeek V4 Pro]
    Dựa trên ngữ cảnh: "${context}" và thông tin: "${chapterInfo}".
    Hãy dịch đoạn văn sau sang tiếng Việt theo phong cách NSFQ (mượt mà, giữ đúng sắc thái):
    ---
    ${originalText}
    ---
    Kết quả:`;
}

// Hàm gửi dữ liệu đến DeepSeek
async function callDeepSeek(text) {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "sk-a48c9bc959c84ea08eda71f72dd86c57" // Thay API Key của bạn vào đây
        },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: [{ role: "user", content: buildNSFQPrompt(text) }]
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}
