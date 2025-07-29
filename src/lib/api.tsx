const { GoogleGenerativeAI } = require("@google/generative-ai");

class API {
  genAI: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  }

  async generate(prompt: string, images: string[]) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const inlineDataArray = images.map(image => ({
      data: image,
      mimeType: "image/*"
    }));
    const requestPayload = [
      { text: prompt },
      ...inlineDataArray.map((inlineData) => ({ inlineData })),
    ];

    const result = await model.generateContent(requestPayload);
    const response = await result.response;
    return response.text();
  }
}

const api = new API();
export default api;
