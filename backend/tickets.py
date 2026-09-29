from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi.responses import JSONResponse
from auth import RoleChecker
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from database import (
    get_db,
    User,
    Agent,
    UserRole,
    Ticket,
    TicketPriority,
    TicketStatus,
    DeviceStatus,
    TicketCategory,
)


class TicketInfo(BaseModel):
    title: str
    description: str
    priority: TicketPriority
    category: TicketCategory


router = APIRouter(prefix="/tickets", tags=["Tickets"])


@router.post("/add-ticket", dependencies=[Depends(RoleChecker(["agent"]))])
async def add_ticket(
    ticket_data: TicketInfo, request: Request, db: Session = Depends(get_db)
):
    agent_id = request.session.get("user_id")
    agent = db.query(Agent).filter(Agent.id == agent_id).first()
    device_id = agent.device_id

    ticket = Ticket(**ticket_data.model_dump(), agent_id=agent_id, device_id=device_id)
    try:
        db.add(ticket)
        db.commit()
        return {"status": "success", "detail": "Ticket Saved Successfully"}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"{str(e)}")


@router.get(
    "/tickets",
    dependencies=[Depends(RoleChecker(["agent", "technician", "admin", "aggregator"]))],
)
def get_tickets(request: Request, db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")
    role = request.session.get("role")
    if role == "AGENT":
        tickets = db.query(Ticket).filter(Ticket.agent_id == user_id).all()
    elif role == "TECHNICIAN":
        tickets = db.query(Ticket).filter(Ticket.technician_id == user_id).all()
    elif role == "AGGREGATOR":
        tickets = db.query(Ticket).filter(Ticket.aggregator_id == user_id).all()
    elif role == "ADMIN":
        tickets = db.query(Ticket).all()
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")
    data = {
        "status": "success",
        "detail": "Tickets retrieved successfully",
        "data": [
            {
                "id": ticket.id,
                "title": ticket.title,
                "status": ticket.status,
                "priority": ticket.priority,
                "category": ticket.category,
                "created_at": ticket.created_at,
                "resolved_at": ticket.resolved_at,
                "technician_comments": ticket.technician_comments,
            }
            for ticket in tickets
        ],
    }
