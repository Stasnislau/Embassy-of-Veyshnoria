import ApiError from "../Exceptions/api-error";
import { VisitInterface } from "../Interfaces";
import { embassyDB } from "../utils/db.server";

class VisitService {
  getVisitById = async (id: string): Promise<VisitInterface> => {
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

  getVisitsByUserId = async (userId: String): Promise<VisitInterface[]> => {
    const visits = await embassyDB.visits.findMany({
      where: {
        userId: Number(userId),
      },
      select: {
        id: true,
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
      },
    });
    if (!updatedVisit) {
      throw ApiError.badRequest("Visit not updated");
    }

    return updatedVisit;
  };

  deleteVisit = async (id: string, userId: string): Promise<VisitInterface> => {
    const visit = await embassyDB.visits.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        userId: true,
      },
    });
    if (!visit || visit.userId !== Number(userId)) {
      throw ApiError.badRequest("Visit not found");
    }
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

export default new VisitService();
