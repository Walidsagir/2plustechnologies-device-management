from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi.responses import JSONResponse
from auth import RoleChecker
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from typing import Optional
from database import (
    get_db,
    Device,
    User,
    Agent,
    UserRole,
    Ticket,
    TicketPriority,
    TicketStatus,
    DeviceStatus,
    TicketCategory,
    DeviceAssignment,
)


class DeviceInfo(BaseModel):
    imei1: str
    imei2: str
    model: str


class DeviceAssignmentInfo(BaseModel):
    device_imie: str
    agent_phone_number: str
    assigned_by: int
    assigned_at: datetime
    returned_at: Optional[datetime]
    is_active: bool
    notes: Optional[str]


router = APIRouter(prefix="/devices", tags=["Devices"])


@router.post(
    "/add-device", dependencies=[Depends(RoleChecker(["admin", "aggregator"]))]
)
async def add_device(
    device_data: DeviceInfo, request: Request, db: Session = Depends(get_db)
):
    aggregator_id = request.session.get("user_id")
    device = Device(**device_data.model_dump(), aggreagator_id=aggregator_id)
    try:
        db.add(device)
        db.commit()
        return {"status": "success", "detail": "Device Saved Successfully"}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"{str(e)}")


@router.get("/devices", dependencies=[Depends(RoleChecker(["admin", "aggregator"]))])
def get_devices(request: Request, db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")
    role = request.session.get("role")
    if role == "AGGREGATOR":
        devices = db.query(Device).filter(Device.aggregator_id == user_id).all()
    elif role == "ADMIN":
        devices = db.query(Device).all()
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")

    data = {
        "status": "success",
        "detail": "Devices retrieved successfully",
        "data": [
            {
                "device": {
                    "id": device.id,
                    "imei1": device.imei1,
                    "imei2": device.imei2,
                    "model": device.model,
                },
                "agent": {
                    "id": device.agent.id,
                    "account_number": device.agent.account_number,
                    "account_name": device.agent.account_name,
                    "created_by": device.agent.created_by,
                    "agent_name": f"{device.agent.first_name} {device.agent.last_name}",
                    "created_at": device.agent.created_at,
                },
            }
            for device in devices
        ],
    }


@router.post(
    "/assign-device",
    dependencies=[Depends(RoleChecker(["admin", "aggregator"]))],
)
async def assign_device(
    device_assignment_data: DeviceAssignmentInfo,
    request: Request,
    db: Session = Depends(get_db),
):
    aggregator_id = request.session.get("user_id")
    device = (
        db.query(Device)
        .filter(Device.imei1 == device_assignment_data.device_imie)
        .first()
    )
    agent = db.query(Agent).filter(Agent.id == device_assignment_data.agent_id).first()
    assignment = DeviceAssignment(
        **device_assignment_data.model_dump(),
        device_id=device.id,
        agent_id=agent.id,
        aggregator_id=aggregator_id,
    )
    try:
        db.add(assignment)
        db.commit()
        return {"status": "success", "detail": "Device Assignment Saved Successfully"}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"{str(e)}")


@router.get(
    "/device-assignments", dependencies=[Depends(RoleChecker(["admin", "aggregator"]))]
)
def get_device_assignments(request: Request, db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")
    role = request.session.get("role")
    if role == "AGGREGATOR":
        assignments = (
            db.query(DeviceAssignment)
            .filter(DeviceAssignment.device_id == user_id)
            .all()
        )
    elif role == "ADMIN":
        assignments = db.query(DeviceAssignment).all()
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")

    data = {
        "status": "success",
        "detail": "Device Assignments retrieved successfully",
        "data": [
            {
                "id": assignment.id,
                "device_id": assignment.device_id,
                "agent_id": assignment.agent_id,
                "assigned_by": assignment.assigned_by,
                "assigned_at": assignment.assigned_at,
                "returned_at": assignment.returned_at,
                "is_active": assignment.is_active,
                "notes": assignment.notes,
            }
            for assignment in assignments
        ],
    }
