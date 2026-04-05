import logging

logging.basicConfig(
    filename="logs/system.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger()


# Usage anywhere:

# from app.utils.logger import logger

# logger.info("Attendance marked successfully")