from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_db
from queries import (
    get_course_progress,
    get_weekly_learning_hours,
    get_due_assignments,
    get_student_stats,
    get_recent_activity,
)
from sqlalchemy.orm import Session
from fastapi import Depends

app = FastAPI(title="LMS Student Progress API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # production mein frontend URL daalna
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Main dashboard endpoint ─────────────────────────
# Frontend isko call karega: fetch('/api/student/{id}/dashboard')
@app.get("/api/student/{student_id}/dashboard")
def student_dashboard(student_id: str, db: Session = Depends(get_db)):
    try:
        return {
            "stats":           get_student_stats(db, student_id),
            "courseProgress":  get_course_progress(db, student_id),
            "weeklyProgress":  get_weekly_learning_hours(db, student_id),
            "dueAssignments":  get_due_assignments(db, student_id),
            "recentActivity":  get_recent_activity(db, student_id),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "ok"}
