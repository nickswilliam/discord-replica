import qs from 'query-string'
import { useParams } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'

import { useSocket } from '@/components/providers/socket-provider'

interface ChatQueryProps{
    queryKey: string;
    apiUrl: string;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
}