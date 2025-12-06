import { NextResponse } from "next/server"

// This is a simplified fallback version of the contact API
// that doesn't rely on nodemailer, in case there are issues with the email service

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Log the message details (this would normally be sent via email)
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // Return success response
    return NextResponse.json(
      {
        message:
          "Your message has been received. Please note that due to technical limitations in the preview environment, emails cannot be sent. In the production environment, you would receive a confirmation email.",
        fallback: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      {
        error: "Server error. Please try again later or contact me directly at sumitranjan2207@gmail.com",
      },
      { status: 500 },
    )
  }
}
