## 14. How we built it

### 14.1 Process

We treated this as BA work, with AI doing the drafting and people making the decisions. The proposal came first, then the tool and slides were built from the approved proposal. Specialist subagents each wrote named documents from templates, and an independent reviewer checked the spec and the final pack. Six human reviews controlled the work.

{{One or two sentences on anything specific to this event.}}

### 14.2 Project structure

```text
hackathon_template/
├─ CLAUDE.md          Rules every AI session follows
├─ RUNBOOK.md         Our timeline, roles and scope-cut rules
├─ STATUS.md          Review log
├─ .claude/           Subagents, skills, templates and tool build rules
├─ deliverables/      Proposal, assumptions, slides, notes, reviewer reports
└─ our-tool/          The deployed tool
```

### 14.3 Review log

| Gate | Review | Decider | Approved at | Decisions and accepted flags |
|---|---|---|---|---|
| {{gate}} | {{review}} | {{name}} | {{time}} | {{decisions}} |

### 14.4 Where people changed the AI's work

| Review | What the AI proposed | What people changed | Why |
|---|---|---|---|
| {{gate}} | {{proposal}} | {{change}} | {{reason}} |

### 14.5 Prepared beforehand and built on the day

| Prepared before the event | Built on the day |
|---|---|
| Toolkit: subagents, skills, templates, review process, deployment skeleton and design system | Use case analysis, proposal, tool, slides, speaker notes and demo |
