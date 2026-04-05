from models.audit_model import AuditLog

def log_audit(db, action, table, record_id, admin_email, changes=None):
    log = AuditLog(
        action=action,
        table_name=table,
        record_id=record_id,
        changed_by=admin_email,
        changes=changes
    )
    db.add(log)
    db.commit()