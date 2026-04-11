import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file" });
    }

    const text = await file.text();

    console.log("=== FILE TEXT ===");
    console.log(text);

    return NextResponse.json({
      text,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" });
  }
}