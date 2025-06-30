import { NextRequest , NextResponse } from "next/server";
import {connect} from "@/lib/database/dbConfig";
import Contact from "@/models/contactModel";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const data = await request.json();
    const newContact = new Contact(data);
    const saved = await newContact.save();
    return NextResponse.json({ message: "Contact saved", contact: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const contacts = await Contact.find({});
    return NextResponse.json(contacts);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
