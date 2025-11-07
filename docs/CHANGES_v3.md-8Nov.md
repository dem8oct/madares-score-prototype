
**8 Nov Madares Score Prototype notes**
We've already implemented what's in this repo with the help of Claude Code(mostly).
I've some changes and edits, and would like your assistance in reviewing the changes with me, confirm what you understood from these changes, tell me the impact of such changes. once we are aligned, we will make a plan to make the changes. Refernce 

"General:
1. Data: how to change some mock data e.g. users or schools. 
2. Data: Add more mock data for indicators, evaluation requests, questions etc.
3. Make onboarding walkthrough for prototype demo presentation (give me ideas), how to flow the demo for the meeting attendants.
Role (Committee Member):
1. In Domains tab, make the Configure button openable and user edits the domain
2. Inside indicators pages, make the Actions buttons clickable: "Edit Indicator", "Adjust Weight", and "Disable Indicator"
3. Questions Bank: each question should be linked to 1 indicator only. Each Indicator could have 1 or many questions (up to 10).
4. Add "Indicator" in the filters and in "Add New Question" modal.
5. In the Indicator Review page, include the related question(s).
6. In "Evaluation Indicators" table, add filter like Domain, 
7. Rename the Committee Member to "Indicators Committee Member"
Role (Operations Reviewer):
1. In the "Create New Evaluation Requests" modal, the user should be able to select the active indicators first (Domain then category then indicator) to be included in this Evaluation Request in step 1. In step 2 Select Schools, and so on.
2. In the  Evaluation Requests filters: add creation date rang and SLA fields.
Role (Inspector) Assignment Flow {in docs, but not implemented yet}:
**Triggered by:** Ops creates Evaluation Request
**Auto-Assignment Logic (Mock):**
- System assigns inspectors based on:
	- Geographic region (inspectors assigned to specific regions)
	- Indicator type (some inspectors specialize in safety, others in facilities)
	- Workload balance (distribute assignments evenly)
**Manual Assignment (Ops):**
- In Evaluation Requests table, add action: "Assign Inspector"
- Opens modal with inspector dropdown and indicator checklist
- Ops selects: Which inspector + Which indicators to inspect"