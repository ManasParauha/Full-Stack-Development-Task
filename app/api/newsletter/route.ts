import { connect } from "@/lib/database/dbConfig";
import Subscriber from "@/models/subscriberModel";
import { NextRequest, NextResponse } from "next/server";

// Connect to MongoDB
connect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Simple validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Check if email is already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 400 });
    }

    // Save new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    return NextResponse.json({
      message: "Subscribed successfully",
      success: true,
    });

  } catch (error: any) {
    console.error("Newsletter Subscription Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
