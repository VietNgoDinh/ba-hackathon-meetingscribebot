## 12. Closing

### 12.1 What we learned

Our first spec said the tool "never guesses" an owner or a deadline, and the independent review showed that only the AI prompt prevented it. We added a rule check that replaces any name or date not found in the transcript, and then rewrote our claims to say only what the check proves (L-02). The lesson for BA work is to state what a control proves and what it does not, and to put the weak points in the document ourselves. The build repeated the lesson: the live AI result differed from our hand-prepared sample, and the Word audit trail turned out not to show how many items the checks removed (L-05, L-10). We list both as limits and do not describe them as features.

### 12.2 What we're asking for

We ask the judges to sponsor a small, time-boxed pilot of MoM Drafter. A BA manager would be the sponsor and would choose a small group of BAs [A-18]. The group would use fictional or approved data only (R-02), and the sponsor would ask IT and Security to review the AI provider, the hosting and the data class in parallel (section 11.2). The pilot measures time to a ready MoM, items edited, rejected and missed, and the length of transcript the tool can take (L-01, L-09), so that the next decision rests on measurements and not on our claims. We are not asking for approval to use real client data. The prototype was frozen at Level 1. After that freeze the team added one function that stores reviewed minutes in a database that everyone with the access code can read (FN-09, L-12), so the tool is now Level 1 plus storage and the pilot would not start with real data on it. So far it has been tried only with a few short fictional transcripts on one model, so a pilot is the next step to test it, not a claim that it is ready. Until per-user sign-in, a retention rule and delete for saved minutes are added in the Hardening stage (section 11.1), the pilot would save only fictional or approved data.

Changed after G4: the tool is now built, so we added what the build showed (L-05, L-10) and the plain statement that testing so far is small. The request is unchanged.

Changed after G5: the paragraph said "deployed at Level 1". Saving of reviewed minutes was added after the freeze, so the level is now stated as Level 1 plus storage, and the sign-in, retention and delete conditions were added to the request. The lesson in 12.1 is unchanged, and the post-freeze change is one more case of it: a claim ("nothing is stored") had to be corrected when the tool changed (A-11, L-12).
