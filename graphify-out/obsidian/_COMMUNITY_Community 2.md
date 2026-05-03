---
type: community
cohesion: 0.03
members: 100
---

# Community 2

**Cohesion:** 0.03 - loosely connected
**Members:** 100 nodes

## Members
- [[.test_empty_file_returns_empty_list()]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[.test_event_fields()]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[.test_events_sorted_by_timestamp()]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[.test_nonexistent_file_raises()]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[.test_optional_detector_fields()]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[.test_parses_compliant_trace()]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[.test_parses_noncompliant_trace()]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[.test_parses_tdd_spec()]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[.test_required_vs_optional_steps()]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[.test_scoring_threshold()]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[.test_step_fields()]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[CLI entry point for skill-comply.]] - rationale - everything-claude-code\skills\skill-comply\scripts\run.py
- [[Check before_stepafter_step constraints. Returns failure reason or None.]] - rationale - everything-claude-code\skills\skill-comply\scripts\grader.py
- [[Classify tool calls against compliance steps using LLM.]] - rationale - everything-claude-code\skills\skill-comply\scripts\classifier.py
- [[Classify which tool calls match which compliance steps.      Returns {step_id]] - rationale - everything-claude-code\skills\skill-comply\scripts\classifier.py
- [[ComplianceResult]] - code - everything-claude-code\skills\skill-comply\scripts\grader.py
- [[ComplianceSpec]] - code - everything-claude-code\skills\skill-comply\scripts\parser.py
- [[Create sandbox directory and run setup commands.]] - rationale - everything-claude-code\skills\skill-comply\scripts\runner.py
- [[Detector]] - code - everything-claude-code\skills\skill-comply\scripts\parser.py
- [[Execute a scenario and extract tool calls from stream-json output.]] - rationale - everything-claude-code\skills\skill-comply\scripts\runner.py
- [[Extract YAML from LLM output, stripping markdown fences if present.]] - rationale - everything-claude-code\skills\skill-comply\scripts\utils.py
- [[Generate 3 scenarios with decreasing prompt strictness.      Calls claude -p w]] - rationale - everything-claude-code\skills\skill-comply\scripts\scenario_generator.py
- [[Generate Markdown compliance reports.]] - rationale - everything-claude-code\skills\skill-comply\scripts\report.py
- [[Generate a Markdown compliance report.      Args         skill_path Path to]] - rationale - everything-claude-code\skills\skill-comply\scripts\report.py
- [[Generate a compliance spec from a skillrule file.      Calls claude -p with t]] - rationale - everything-claude-code\skills\skill-comply\scripts\spec_generator.py
- [[Generate compliance specs from skill files using LLM.]] - rationale - everything-claude-code\skills\skill-comply\scripts\spec_generator.py
- [[Generate pressure scenarios from skill + spec using LLM.]] - rationale - everything-claude-code\skills\skill-comply\scripts\scenario_generator.py
- [[Grade a trace against a compliance spec using LLM classification.]] - rationale - everything-claude-code\skills\skill-comply\scripts\grader.py
- [[Grade observation traces against compliance specs using LLM classification.]] - rationale - everything-claude-code\skills\skill-comply\scripts\grader.py
- [[ObservationEvent]] - code - everything-claude-code\skills\skill-comply\scripts\parser.py
- [[Parse LLM classification output into {step_id event_indices}.]] - rationale - everything-claude-code\skills\skill-comply\scripts\classifier.py
- [[Parse a JSONL observation trace file into sorted events.]] - rationale - everything-claude-code\skills\skill-comply\scripts\parser.py
- [[Parse a YAML compliance spec file.]] - rationale - everything-claude-code\skills\skill-comply\scripts\parser.py
- [[Parse claude -p stream-json output into ObservationEvents.      Stream-json fo]] - rationale - everything-claude-code\skills\skill-comply\scripts\runner.py
- [[Parse observation traces (JSONL) and compliance specs (YAML).]] - rationale - everything-claude-code\skills\skill-comply\scripts\parser.py
- [[Run scenarios via claude -p and parse tool calls from stream-json output.]] - rationale - everything-claude-code\skills\skill-comply\scripts\runner.py
- [[Sanitize scenario ID and ensure path stays within sandbox base.]] - rationale - everything-claude-code\skills\skill-comply\scripts\runner.py
- [[Scenario]] - code - everything-claude-code\skills\skill-comply\scripts\scenario_generator.py
- [[ScenarioRun]] - code - everything-claude-code\skills\skill-comply\scripts\runner.py
- [[Shared utilities for skill-comply scripts.]] - rationale - everything-claude-code\skills\skill-comply\scripts\utils.py
- [[Simulate LLM classifying a noncompliant trace (impl before test).]] - rationale - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[Simulate LLM correctly classifying a compliant trace.]] - rationale - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[Step]] - code - everything-claude-code\skills\skill-comply\scripts\parser.py
- [[StepResult]] - code - everything-claude-code\skills\skill-comply\scripts\grader.py
- [[TestGradeCompliant]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[TestGradeEdgeCases]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[TestGradeNoncompliant]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[TestParseSpec]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[TestParseTrace]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[Tests for grader module — compliance scoring with LLM classification.]] - rationale - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[Tests for parser module — JSONL trace and YAML spec parsing.]] - rationale - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[_check_temporal_order()]] - code - everything-claude-code\skills\skill-comply\scripts\grader.py
- [[_mock_compliant_classification()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[_mock_empty_classification()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[_mock_noncompliant_classification()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[_overall_compliance()]] - code - everything-claude-code\skills\skill-comply\scripts\report.py
- [[_parse_classification()]] - code - everything-claude-code\skills\skill-comply\scripts\classifier.py
- [[_parse_stream_json()]] - code - everything-claude-code\skills\skill-comply\scripts\runner.py
- [[_safe_sandbox_dir()]] - code - everything-claude-code\skills\skill-comply\scripts\runner.py
- [[_setup_sandbox()]] - code - everything-claude-code\skills\skill-comply\scripts\runner.py
- [[_step_compliance_rate()]] - code - everything-claude-code\skills\skill-comply\scripts\report.py
- [[_steps_to_promote()]] - code - everything-claude-code\skills\skill-comply\scripts\report.py
- [[classifier.py]] - code - everything-claude-code\skills\skill-comply\scripts\classifier.py
- [[classify_events()]] - code - everything-claude-code\skills\skill-comply\scripts\classifier.py
- [[compliant_trace()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[extract_yaml()]] - code - everything-claude-code\skills\skill-comply\scripts\utils.py
- [[generate_report()]] - code - everything-claude-code\skills\skill-comply\scripts\report.py
- [[generate_scenarios()]] - code - everything-claude-code\skills\skill-comply\scripts\scenario_generator.py
- [[generate_spec()]] - code - everything-claude-code\skills\skill-comply\scripts\spec_generator.py
- [[grade()]] - code - everything-claude-code\skills\skill-comply\scripts\grader.py
- [[grader.py]] - code - everything-claude-code\skills\skill-comply\scripts\grader.py
- [[main()_30]] - code - everything-claude-code\skills\skill-comply\scripts\run.py
- [[noncompliant_trace()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[parse_spec()]] - code - everything-claude-code\skills\skill-comply\scripts\parser.py
- [[parse_trace()]] - code - everything-claude-code\skills\skill-comply\scripts\parser.py
- [[parser.py]] - code - everything-claude-code\skills\skill-comply\scripts\parser.py
- [[report.py]] - code - everything-claude-code\skills\skill-comply\scripts\report.py
- [[run.py]] - code - everything-claude-code\skills\skill-comply\scripts\run.py
- [[run_scenario()]] - code - everything-claude-code\skills\skill-comply\scripts\runner.py
- [[runner.py]] - code - everything-claude-code\skills\skill-comply\scripts\runner.py
- [[scenario_generator.py]] - code - everything-claude-code\skills\skill-comply\scripts\scenario_generator.py
- [[spec_generator.py]] - code - everything-claude-code\skills\skill-comply\scripts\spec_generator.py
- [[tdd_spec()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_all_required_steps_detected()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_compliance_rate_is_ratio_of_required_only()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_empty_trace()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_failure_reasons_present()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_full_compliance()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_grader.py]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_hook_promotion_recommended()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_low_compliance()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_no_hook_promotion_recommended()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_optional_step_detected()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_parser.py]] - code - everything-claude-code\skills\skill-comply\tests\test_parser.py
- [[test_returns_compliance_result()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_run_test_red_not_detected()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_spec_id_in_result()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_step_evidence_not_empty()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[test_write_test_fails_ordering()]] - code - everything-claude-code\skills\skill-comply\tests\test_grader.py
- [[utils.py]] - code - everything-claude-code\skills\skill-comply\scripts\utils.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Community_2
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_Community 0]]

## Top bridge nodes
- [[main()_30]] - degree 7, connects to 1 community