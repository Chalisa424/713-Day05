import express, { Request, Response } from "express";
import * as service from "../services/participantService";
import type { Participant } from "../models/participant";

const router = express.Router();

// Get all participants
router.get("/", async (req, res) => {
    const pageSize = parseInt(req.query.pageSize as string) || 3;
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const keyword = req.query.keyword as string;

    try {
        const result = await service.getAllParticipantsWithPagination(keyword, pageSize, pageNo);
        if (result.participants.length === 0) {
            res.status(404).send("No participant found");
            return;
        }
        res.setHeader("x-total-count", result.count.toString());
        res.setHeader("Access-Control-Expose-Headers", "x-total-count");
        res.json(result.participants);
    } catch (error) {
        console.error("Error occurred: ", error);
        if (pageNo < 1 || pageSize < 1) {
            res.status(400).send("Invalid pageNo or pageSize");
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
});
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
  
    try {
      const participant = await service.getParticipantById(id);
      if (!participant) {
        res.status(404).send("Participant not found");
        return;
      }
      res.json(participant);
    } catch (error) {
      console.error("Error occurred: ", error);
      res.status(500).send("Internal Server Error");
    }
  });

export default router;