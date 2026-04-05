# Responsibilities:

# track recognized faces across frames
# count repeated detections
# confirm identity after N frames

from datetime import datetime
from app.utils.config import MULTI_FRAME_CONFIRMATION, ATTENDANCE_COOLDOWN


class MultiFrameTracker:

    def __init__(self):

        self.frame_counts = {}
        self.cooldown_tracker = {}

    def update(self, student_id):

        now_time = datetime.now()

        # cooldown check
        if student_id in self.cooldown_tracker:

            last_time = self.cooldown_tracker[student_id]

            if (now_time - last_time).seconds < ATTENDANCE_COOLDOWN:
                return False

        # increase frame count
        if student_id not in self.frame_counts:
            self.frame_counts[student_id] = 0

        self.frame_counts[student_id] += 1

        # confirm after required frames
        if self.frame_counts[student_id] >= MULTI_FRAME_CONFIRMATION:

            self.frame_counts[student_id] = 0
            self.cooldown_tracker[student_id] = now_time

            return True

        return False