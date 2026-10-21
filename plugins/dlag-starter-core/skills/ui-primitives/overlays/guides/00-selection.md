# Choose by behavior and installed source

| Need | Existing component to inspect | Expected behavior |
|---|---|---|
| Form or detail modal | Local Dialog | Named content, contained focus, cancel/close |
| Destructive or urgent confirmation | Local AlertDialog | Clear consequence, safe initial focus, explicit action |
| Slide-in panel | Local Sheet/Drawer | Existing modality; optional gestures if supported |
| Completed reversible feedback | Existing toast/status wrapper | Nonblocking announcement, recoverable outcome |
| Command search | Local Command plus Dialog when modal | Named input, selection and keyboard behavior |
| Small associated popup | Existing Popover | Inspect whether configured modal; do not assume a trap |
| Persistent event history | Existing notification view | Durable information outside a temporary toast |

shadcn offers multiple primitive families. Read actual exports, composition props and wrappers. Dialog can be styled as a side sheet without breaking focus simply because it slides. Vaul is useful when an already selected drawer needs snapping or gestures, but it is not required for every side panel. Headless UI or another existing implementation is not an instruction to install or migrate.

A tooltip or hover card is not a substitute for an interactive modal. A toast is not prior consent for an irreversible operation. An undo toast is appropriate only when restoration is actually supported and the user can still recover after missing the toast, or a deliberate durable recovery path meets the product requirement.

A dialog inside a drawer may be valid, but portal order and focus/scroll behavior need an actual test; raising z-index alone does not establish correctness. A third nested layer should trigger simplification of the interaction before adding more traps.

Missing local components or packages are named prerequisites. No package-install or registry-overwrite command is authorized by this guide. Implement independent local work and report the exact missing dependency/API.
