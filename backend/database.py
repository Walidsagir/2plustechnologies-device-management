from datetime import date, datetime
from enum import Enum
from typing import Optional

from sqlalchemy import ForeignKey, create_engine, func
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    declarative_base,
    relationship,
    Session,
)

Base = declarative_base()
engine = create_engine("sqlite:///database.db", echo=True)


class UserRole(str, Enum):
    SUPER_ADMIN = "SUPER_ADMIN"
    AGGREGATOR = "AGGREGATOR"
    AGENT = "AGENT"
    TECHNICIAN = "TECHNICIAN"


class UserStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    SUSPENDED = "SUSPENDED"


class TicketStatus(str, Enum):
    OPEN = "OPEN"
    ASSIGNED = "ASSIGNED"
    IN_PROGRESS = "IN_PROGRESS"
    RESOLVED = "RESOLVED"
    CLOSED = "CLOSED"


class TicketCategory(str, Enum):
    HARDWARE = "HARDWARE"
    SOFTWARE = "SOFTWARE"
    OTHER = "OTHER"


class TicketPriority(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class DeviceStatus(str, Enum):
    AVAILABLE = "AVAILABLE"
    ASSIGNED = "ASSIGNED"
    ACTIVE = "ACTIVE"
    FAULTY = "FAULTY"
    UNDER_REPAIR = "UNDER_REPAIR"
    LOST = "LOST"
    RETIRED = "RETIRED"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)

    username: Mapped[str] = mapped_column(
        unique=True,
        nullable=False,
        index=True,
    )

    password_hash: Mapped[str]

    first_name: Mapped[str]

    last_name: Mapped[str]

    phone_number: Mapped[Optional[str]]

    email: Mapped[Optional[str]]

    role: Mapped[UserRole]

    status: Mapped[UserStatus] = mapped_column(default=UserStatus.ACTIVE)

    must_change_password: Mapped[bool] = mapped_column(default=True)

    created_by: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"))

    last_login: Mapped[Optional[datetime]]

    created_at: Mapped[datetime]

    updated_at: Mapped[datetime]


class Aggregator(Base):
    __tablename__ = "aggregators"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True)

    company_name: Mapped[str]

    company_code: Mapped[str] = mapped_column(unique=True)

    address: Mapped[Optional[str]]

    notes: Mapped[Optional[str]]

    # Relationships

    agents: Mapped[list["Agent"]] = relationship(backpopulates="aggregator")

    devices: Mapped[list["Device"]] = relationship(backpopulates="aggregator")

    enrollments: Mapped[list["Enrollment"]] = relationship(backpopulates="aggregator")

    tickets: Mapped[list["Ticket"]] = relationship(backpopulates="aggregator")


class Agent(Base):
    __tablename__ = "agents"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True)

    first_name: Mapped[str]

    last_name: Mapped[str]

    phone_number: Mapped[str]

    aggregator_id: Mapped[int] = mapped_column(ForeignKey("aggregators.id"))

    device_id: Mapped[int] = mapped_column(ForeignKey("devices.id"))

    account_number: Mapped[str]

    account_name: Mapped[str]

    created_by: Mapped[int] = mapped_column(ForeignKey("users.id"))

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    enrollments: Mapped[list["Enrollment"]] = relationship(backpopulates="agent")

    aggregator: Mapped["Aggregator"] = relationship(back_populates="agents")


class Ticket(Base):
    __tablename__ = "tickets"

    id: Mapped[int] = mapped_column(primary_key=True)

    title: Mapped[str]

    description: Mapped[str] = mapped_column(
        nullable=True, default="No description provided."
    )

    device_id: Mapped[int] = mapped_column(ForeignKey("devices.id"))

    agent_id: Mapped[int] = mapped_column(ForeignKey("agents.id"))

    aggregator_id: Mapped[int] = mapped_column(ForeignKey("aggregators.id"))

    admin_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    technician_id: Mapped[Optional[int]] = mapped_column(ForeignKey("technicians.id"))

    status: Mapped[TicketStatus] = mapped_column(default=TicketStatus.open)

    priority: Mapped[TicketPriority] = mapped_column(default=TicketPriority.LOW)

    category: Mapped[TicketCategory] = mapped_column(default=TicketCategory.HARDWARE)

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    resolved_at: Mapped[Optional[datetime]]

    technician_comments: Mapped[Optional[str]] = mapped_column(
        nullable=True, default="No comments provided."
    )

    aggregator: Mapped["Aggregator"] = relationship(backpopulates="tickets")

    agent: Mapped["Agent"] = relationship(backpopulates="tickets")

    device: Mapped["Device"] = relationship(backpopulates="tickets")

    technician: Mapped[Optional["Technician"]] = relationship(back_populates="tickets")


class Device(Base):
    __tablename__ = "devices"

    id: Mapped[int] = mapped_column(primary_key=True)

    imei1: Mapped[str] = mapped_column(unique=True)

    imei2: Mapped[str] = mapped_column(unique=True)

    model: Mapped[str]

    aggregator_id: Mapped[int] = mapped_column(ForeignKey("aggregators.id"))

    current_agent_id: Mapped[Optional[int]] = mapped_column(ForeignKey("agents.id"))

    status: Mapped[DeviceStatus] = mapped_column(default=DeviceStatus.ACTIVE)

    total_enrollments: Mapped[int] = mapped_column(default=0)

    last_sync_at: Mapped[Optional[datetime]]

    notes: Mapped[Optional[str]]

    aggregator: Mapped["Aggregator"] = relationship(backpopulates="devices")

    agent: Mapped[Optional["Agent"]] = relationship(backpopulates="devices")

    tickets: Mapped[list["Ticket"]] = relationship(backpopulates="device")


class Enrollment(Base):
    __tablename__ = "enrollments"

    id: Mapped[int] = mapped_column(primary_key=True)

    agent_id: Mapped[int] = mapped_column(ForeignKey("agents.id"))

    device_id: Mapped[int] = mapped_column(ForeignKey("devices.id"))

    aggregator_id: Mapped[int] = mapped_column(ForeignKey("aggregators.id"))

    enrollment_count: Mapped[int] = mapped_column(default=0)

    enrollment_date: Mapped[date] = mapped_column(default=date.today())

    notes: Mapped[Optional[str]] = mapped_column(
        nullable=True, default="No notes provided."
    )


class Technician(Base):
    __tablename__ = "technicians"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True)

    notes: Mapped[Optional[str]]

    tickets: Mapped[list["Ticket"]] = relationship()


class DeviceAssignment(Base):
    __tablename__ = "device_assignments"

    id: Mapped[int] = mapped_column(primary_key=True)

    device_id: Mapped[int] = mapped_column(ForeignKey("devices.id"))

    agent_id: Mapped[int] = mapped_column(ForeignKey("agents.id"))

    assigned_by: Mapped[int] = mapped_column(ForeignKey("users.id"))

    assigned_at: Mapped[datetime] = mapped_column(server_default=func.now())

    returned_at: Mapped[Optional[datetime]]

    is_active: Mapped[bool] = mapped_column(default=True)

    notes: Mapped[Optional[str]]

    device: Mapped["Device"] = relationship(backpopulates="assignments")

    agent: Mapped["Agent"] = relationship(back_populates="assignments")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    action: Mapped[str]

    entity_type: Mapped[str]

    entity_id: Mapped[int]

    details: Mapped[Optional[str]]

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())


class Target(Base):
    __tablename__ = "targets"

    id: Mapped[int] = mapped_column(primary_key=True)

    aggregator_id: Mapped[int] = mapped_column(ForeignKey("aggregators.id"))

    device_id: Mapped[Optional[int]] = mapped_column(ForeignKey("devices.id"))

    target_count: Mapped[int]

    achieved_count: Mapped[int] = mapped_column(default=0)

    start_date: Mapped[date]

    deadline: Mapped[date]

    reward: Mapped[Optional[str]]

    edit_count: Mapped[int] = mapped_column(default=0)

    is_completed: Mapped[bool] = mapped_column(default=False)

    completed_at: Mapped[Optional[datetime]]

    aggregator: Mapped["Aggregator"] = relationship(backpopulates="targets")

    device: Mapped[Optional["Device"]] = relationship(backpopulates="targets")


def init_db():
    Base.metadata.create_all(engine)


def get_db():
    with Session(engine) as db:
        yield db
