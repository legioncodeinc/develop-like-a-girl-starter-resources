# Estimation and forecasting guide map

Use [the full method](playbook.md) to distinguish size, conditional scenarios, empirical forecasts and commitments.

| Task | Complete local guide |
| --- | --- |
| Establish principles and commitment boundary | [00 Principles](guides/00-principles.md) |
| Diagnose five dysfunction categories | [01 Diagnosis](guides/01-diagnosis.md) |
| Calibrate points, T-shirt sizes and Planning Poker | [02 Relative sizing](guides/02-relative-sizing.md) |
| Evaluate throughput-based NoEstimates | [03 NoEstimates](guides/03-noestimates.md) |
| Sample history and interpret percentiles | [04 Monte Carlo](guides/04-monte-carlo.md) |
| Use outside-view and reference-class remedies | [05 Planning fallacy](guides/05-planning-fallacy.md) |
| Forecast an AI-assisted individual project | [06 Conditional forecast](guides/06-ai-assisted-forecast.md) |
| Reconcile total build cash and first operation | [07 Build budget](guides/07-total-build-budget.md) |

Use the [advisory](templates/estimation-advisory.md), [individual forecast](references/ai-assisted-forecast/worksheet.md) and [cash/time/credit](references/build-budget/worksheet.md) worksheets. Complete illustrations: [Planning Poker session](examples/fibonacci-estimation-session.md), [Monte Carlo interpretation](examples/monte-carlo-forecast.md), [individual scenario](examples/ai-assisted-forecast.md) and [budget reconciliations](references/build-budget/fictional-examples.md). Their numbers and timelines are teaching examples, not this project's promises or current vendor prices.

The [supplied JSON input](references/ai-assisted-forecast/example-input.json), [calculator](scripts/forecast-ai-assisted.py) and [tests](scripts/test_forecast_ai_assisted.py) remain local. Calculator proof validates only the declared supplied-input model; it is not empirical forecasting accuracy or invoice correctness. Read [historical research](research/research-summary.md), [AI review evidence limits](references/ai-assisted-forecast/research/distillation.md) and [invoice-semantics limits](references/build-budget/research/distillation.md). No source archive or original counterpart repository is required.
