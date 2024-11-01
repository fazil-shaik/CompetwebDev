import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

async function fetchCompetitorsFromGemini(company: string): Promise<string[]> {
  try {
    // Use the Gemini API to generate competitors
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const prompt = `Generate a list of 3 potential competitors for the company "${company}". Return only the company names as a comma-separated list, without numbering or additional text.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Split the comma-separated list into an array
    const competitors = text.split(',').map(name => name.trim())

    return competitors
  } catch (error) {
    console.error("Error fetching competitors from Gemini:", error)
    throw new Error("Failed to fetch competitors from Gemini API")
  }
}

// Define the API route handler
export async function POST(req: Request) {
  try {
    const { company } = await req.json()

    // Validate input
    if (!company) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 })
    }

    // Fetch competitors using Gemini API
    const competitors = await fetchCompetitorsFromGemini(company)
    return NextResponse.json({ competitors })
  } catch (error) {
    console.error("Error in analyze-competitor API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}