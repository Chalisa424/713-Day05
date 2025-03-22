import { PrismaClient } from "@prisma/client";
import type { Participant } from "../models/participant";


const participants: Participant[] = [];


const prisma = new PrismaClient();

export const getAllParticipantsWithPagination = async (
keyword: string, pageSize: number, pageNo: number  ) => {
    try {
     
      const participants = await prisma.participant.findMany({
        skip: pageSize * (pageNo - 1),
        take: pageSize, 
        select: {
          id: true,
          name: true,
          email: true,
          events: true 
        }
      });
  
   
      const count = await prisma.participant.count();
  
      return { participants, count };
    } catch (error) {
      console.error("Error in getAllParticipantsWithPagination:", error);
      throw new Error("Internal Server Error");
    }
  };

  export const getParticipantById = async (id: number): Promise<Participant | null> => {
    try {
      const participant = await prisma.participant.findUnique({
        where: { id },
        include: { 
          events: {
            select: {
              id: true,
              time: true,
              date: true,
              location: true,
              description: true,
            },
          },
        },
      });
  
      if (!participant) {
        return null;
      }
  
      return {
        id: participant.id,
        name: participant.name,
        email: participant.email,
        
        events: participant.events.map(event => event.id),
      };
    } catch (error) {
      console.error("Error in getParticipantById:", error);
      throw new Error("Internal Server Error");
    }
  };
  