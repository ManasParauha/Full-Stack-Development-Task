import {connect} from "@/lib/database/dbConfig"
import Project from "@/models/projectModel";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { name, description, image } = reqBody;

    console.log("Received Project Data:", reqBody);

    // Optional: Check if project already exists
    const existing = await Project.findOne({ name });
    if (existing) {
      return NextResponse.json({ error: "Project already exists" }, { status: 400 });
    }

    // Create new project
    const newProject = new Project({
      name,
      description,
      image
    });

    const savedProject = await newProject.save();

    return NextResponse.json({
      message: "✅ Project created successfully",
      success: true,
      project: savedProject
    });

  } catch (error: any) {
    console.error("❌ Project POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const projects = await Project.find({});
    return NextResponse.json(projects, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}