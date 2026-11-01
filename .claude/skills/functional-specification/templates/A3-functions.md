## A3. Functions

### A3.1 Function list

| ID | Function | Actor | Feature | Traces to | Priority | Type |
|---|---|---|---|---|---|---|
| FN-01 | {{function}} | {{ACT-xx}} | {{CF-xx}} | {{P-xx, N-xx}} | {{Must, Should or Could}} | {{AI, Rule, UI or Export}} |

### A3.2 Function specifications

Repeat the block below once per Must function.

#### FN-01 {{function name}}

- **Purpose:** {{why it exists}}
- **Trigger:** {{what starts it}}
- **Inputs:** {{what it receives, with limits}}
- **Processing:** {{what happens, step by step}}
- **Outputs:** {{what it produces}}
- **Business rules:** {{rules that apply}}
- **Validation and errors:** {{what's rejected, and the exact message shown}}
- **AI involvement:** {{what AI does here, or None}}
- **Human control:** {{what a person decides here, or None}}
- **Screens:** {{SCR-xx}}

**Acceptance criteria**

- Given {{context}}, when {{action}}, then {{observable result}}.

### A3.3 Data contract

What the AI must return for each result. This becomes `our-tool/prompts/output-schema.js`.

| Field | Type | Required | Meaning | Allowed values |
|---|---|---|---|---|
| `quote` | Text | Yes | Exact text copied from the input | Must appear in the input |
| {{field}} | {{type}} | {{Yes or No}} | {{meaning}} | {{allowed values}} |

Example result:

```json
{{One complete example that uses only fictional content.}}
```

### A3.4 Limits

- **Input limit:** {{maximum input size and the reason}}
- **Prompt version:** {{starting version, such as v1}}
