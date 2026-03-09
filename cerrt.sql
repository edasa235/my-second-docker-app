
CREATE TABLE certifications (
  id SERIAL PRIMARY KEY,
  organization_id INT NOT NULL,
  seqf_version SMALLINT NOT NULL,
  process_status VARCHAR(100) NOT NULL DEFAULT 'NONE'
    CHECK (process_status IN ('NONE','PREPARATION','SELF_EVALUATION','AUDIT','GRADING','ACTION_PLAN','NEEDS_RENEWAL','EXPIRED')),
  process_started_at TIMESTAMPTZ,
  process_deadline_at TIMESTAMPTZ,
  process_ended_at TIMESTAMPTZ,
  grade VARCHAR(100) NOT NULL DEFAULT 'NONE'
    CHECK (grade IN ('NONE','EXCELLENT','GOOD','ACCREDITED','IMPROVEMENT_REQUIRED')),
  override_state VARCHAR(100) NOT NULL DEFAULT 'NONE'
    CHECK (override_state IN ('NONE','SUSPENDED','WITHDRAWN','TERMINATED')),
  last_override_state_at TIMESTAMPTZ,
  appeal_started_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);


