import { VisitInterface } from "../Interfaces";
import { embassyDB } from "../utils/db.server";

const ApiError = require("../exceptions/api-error");
class VisitService {
  getVisitById = async (id: number): Promise<VisitInterface> => {
    const visit = await embassyDB.visits.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        date: true,
        time: true,
        location: true,
        description: true,
        userId: true,
      },
    });

    if (!visit) {
      throw ApiError.badRequest("Visit not found");
    }

    return visit;
  };

  getVisitsByUserId = async (userId: number): Promise<VisitInterface[]> => {
    const visits = await embassyDB.visits.findMany({
      where: {
        userId: Number(userId),
      },
      select: {
        date: true,
        time: true,
        location: true,
        description: true,
        userId: true,
      },
    });

    if (!visits) {
      throw ApiError.badRequest("Visits not found");
    }
    return visits;
  };

  createVisit = async (visit: VisitInterface): Promise<VisitInterface> => {
    const updatedVisit = await embassyDB.visits.create({
      data: {
        date: visit.date,
        time: visit.time,
        location: visit.location,
        description: visit.description,
        userId: visit.userId,
      },
    });
    if (!updatedVisit) {
      throw ApiError.badRequest("Visit not created");
    }

    return updatedVisit;
  };

  updateVisit = async (
    visit: VisitInterface,
    id: number
  ): Promise<VisitInterface> => {
    const updatedVisit = await embassyDB.visits.update({
      where: {
        id: Number(id),
      },
      data: {
        date: visit.date,
        time: visit.time,
        location: visit.location,
        description: visit.description,
        userId: visit.userId,
      },
    });
    if (!updatedVisit) {
      throw ApiError.badRequest("Visit not updated");
    }

    return updatedVisit;
  };

  deleteVisit = async (id: number): Promise<VisitInterface> => {
    const deletedVisit = await embassyDB.visits.delete({
      where: {
        id: Number(id),
      },
    });
    if (!deletedVisit) {
      throw ApiError.badRequest("Visit not deleted");
    }

    return deletedVisit;
  };
}

module.exports = new VisitService();
