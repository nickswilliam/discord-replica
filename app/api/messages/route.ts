import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

const MEESAGES_BATCH = 10;

export async function GET(req: Request){
    try {
    
    const profile = currentProfile();
    const {searchParams} = new URL(req.url)

    const cursor = searchParams.get("cursor")
    const channelId = searchParams.get("channelId")

    if(!profile){
        return new NextResponse("No autorizado", {status:401})
    }
        
    if(!channelId){
        return new NextResponse("Channel ID no encontrado", {status:40})
    }

    let messages: Message[] = [];

    if(cursor){
        messages = await db.message.findMany({
            take: MEESAGES_BATCH,
            skip: 1,
            cursor:{ 
                id: cursor,

            },
            where:{
                channelId,
            },
            include:{
                member:{
                    include:{
                        profile: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    } else{
        messages = await db.message.findMany({
            take: MEESAGES_BATCH,
            where:{
                channelId,
            },
            include:{
                member:{
                    include:{
                        profile: true
                    }
                }
            },
            orderBy:{
                createdAt: "desc"
            }
        })
    }

    let nextCursor = null

    if(messages.length === MEESAGES_BATCH){
        nextCursor = messages[MEESAGES_BATCH - 1].id
    }

    return NextResponse.json({
        items: messages,
        nextCursor
    })

    } catch (error) {
        console.log("[MESSAGES_GET]", error);
        return new NextResponse("Internal error", {status: 500})        
    }
}