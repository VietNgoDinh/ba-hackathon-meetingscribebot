## 11. Roadmap

The stages below are our proposal. They show what a rollout across the BA department needs, in order, with owners and dependencies. We give no durations, headcounts or costs, because we have no basis for them [A-18, A-19]. Owners are roles, and BA management would name the people [A-20].

### 11.1 From prototype to department tool

| Stage | Goal | What's needed | Owner | Ready when |
|---|---|---|---|---|
| Pilot | Find out, with a small group of BAs, whether reviewing a draft costs less than writing the MoM by hand, and whether the checks hold up on realistic material | An executive sponsor and a small pilot group chosen by the sponsor [A-18]. A fixed set of fictional but realistic transcripts, including long ones (L-01). Approval to use the AI provider and hosting for the pilot data. Measurements recorded as `SRC-xx` entries: time to a MoM ready to send, items accepted, edited, rejected and missed, and attendee review time (8.4). A written pilot rule that only approved data may be pasted (R-02) | BA manager (pilot sponsor), with Proposal lead | The sponsor has the measured results, the BAs' feedback and the list of missed items, and decides to continue, change or stop. Acceptable edit and rejection rates are set by the sponsor before the pilot starts [A-18] |
| Hardening | Fix what the pilot shows, and close the gaps that block real use | Findings from the pilot turned into changes: the transcript limit set from measured lengths (L-01), the name and date check tuned (L-02), a decision on the Word layout or a company template (L-06, Q-03), an optional download without the Audit trail (L-04), and a decision on sign-in and history (Level 2, L-07). Individual sign-in and usage records if the sponsor wants control of spending (R-05). A security review of the tool and its settings | Tool owner (to be named), with Security | Security and the data owner have signed off the tool, and the open limitations are either fixed or accepted by name |
| Department rollout | Make the tool a supported BA service | A named owner and support route. BA guidance and short training on how to review a draft against its quotes. A quality-monitoring routine. Hosting and AI provider under company terms. A retirement or review point if the tool is not used or quality drops | BA department head | The department head accepts the support model and the monitoring results. Rollout does not start before the dependencies in 11.2 are met |

### 11.2 What rollout depends on

| Dependency | Why it matters | Who decides |
|---|---|---|
| Approved hosting | The prototype runs on a public cloud host with no data storage at Level 1. Company data may need a different host, region or contract | IT, with Security |
| Approved AI provider and data terms | Each run sends the transcript to an outside AI service. The terms decide whether that is allowed, whether the provider keeps or learns from the text, and where it is processed. We have not checked these [A-20] | Security and Legal, with the BA manager |
| Data classification | Real transcripts may hold personal or confidential content (9.3). The class decides which transcripts may be pasted at all, and who may use the tool | Data owner or Information Security |
| Ownership and support | Someone must own the prompt, the model setting, the limits and the fixes, and answer BAs' questions. The prototype team will not do this after the event | BA department head |
| BA guidance and training | The control that matters most is the BA reading each quote. Without guidance, R-01 grows. Guidance covers what the checks prove and do not prove (L-02, L-03), the fictional or approved data rule, and what to do with the Audit trail (L-04) | BA manager |
| Quality monitoring | Model and prompt changes can shift quality (R-09). The routine keeps a fixed set of test transcripts, re-runs them on every prompt or model change, and tracks edit, rejection and missed-item rates from the pilot onwards | BA manager, with the tool owner |

### 11.3 Cost and effort

We have no cost figures [A-19]. We did not research AI provider pricing, hosting terms or support effort, and we will not guess them. The pilot must estimate:

- the AI cost per run, from the provider's price list and the lengths of real pilot transcripts;
- hosting cost under the approved arrangement;
- the effort of the tool owner and of support;
- the BA time for training and for review, compared with writing by hand (8.4).

Each estimate becomes an `SRC-xx` entry with the date and who collected it. The cost question is not answered until then.
