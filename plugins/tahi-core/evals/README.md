# tahi-core evals

These cases check the balance the core plugin exists for: proportionate rigour, settled decisions, flagged tier changes, and the kickoff intake. Every case except `no-profile-runs-intake` seeds a project with a scaffold script, so pass `--scaffold`:

    claude plugin eval plugins/tahi-core --scaffold

Run them after changing any `tahi-core` skill and before merging to `main`. A case that fails twice is a skill problem, not a flaky judge, until proven otherwise (re-run with `--judge-model sonnet` to check).
