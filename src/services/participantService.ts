import type { Participant } from "../models/participant";


const participants: Participant[] = [];

export const getAllParticipantsWithPagination = async (
    keyword: string,
    pageSize: number,
    pageNo: number
) => {
    const filteredParticipants = participants.filter((p) =>
        p.name.includes(keyword)
    );
    const startIndex = (pageNo - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedParticipants = filteredParticipants.slice(startIndex, endIndex);
    return {
        participants: paginatedParticipants,
        count: filteredParticipants.length,
    };
};