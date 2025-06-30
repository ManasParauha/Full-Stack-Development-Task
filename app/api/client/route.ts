import { connect } from "@/lib/database/dbConfig";
import Client from "@/models/clientModel";
import { NextRequest, NextResponse } from "next/server";

// Connect to MongoDB
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, designation, description, image } = reqBody;

    console.log("Received Client Data:", reqBody);

    // Optional: check if client already exists by name
    const existingClient = await Client.findOne({ name });
    if (existingClient) {
      return NextResponse.json({ error: "Client already exists" }, { status: 400 });
    }

    // Save new client
    const newClient = new Client({
      name,
      designation,
      description,
      image,
    });

    const savedClient = await newClient.save();

    return NextResponse.json({
      message: "✅ Client added successfully",
      success: true,
      client: savedClient,
    });

  } catch (error: any) {
    console.error("❌ Error in adding client:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const clients = await Client.find({});
    return NextResponse.json(clients, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}