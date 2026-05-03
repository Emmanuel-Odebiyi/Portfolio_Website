# Graph Report - .  (2026-05-03)

## Corpus Check
- Large corpus: 1439 files · ~1,789,352 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1905 nodes · 3068 edges · 87 communities detected
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 318 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 89|Community 89]]
- [[_COMMUNITY_Community 91|Community 91]]
- [[_COMMUNITY_Community 92|Community 92]]
- [[_COMMUNITY_Community 93|Community 93]]
- [[_COMMUNITY_Community 94|Community 94]]
- [[_COMMUNITY_Community 95|Community 95]]
- [[_COMMUNITY_Community 150|Community 150]]

## God Nodes (most connected - your core abstractions)
1. `Dashboard` - 46 edges
2. `spawnSync()` - 46 edges
3. `_load_instincts_from_dir()` - 21 edges
4. `grade()` - 21 edges
5. `_make_project()` - 20 edges
6. `StateStore` - 19 edges
7. `main()` - 18 edges
8. `main()` - 14 edges
9. `main()` - 14 edges
10. `loadInstallManifests()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `runPatchedRunAll()` --calls--> `spawnSync()`  [INFERRED]
  everything-claude-code\tests\hooks\hooks.test.js → everything-claude-code\tests\lib\tmux-worktree-orchestrator.test.js
- `runCli()` --calls--> `spawnSync()`  [INFERRED]
  everything-claude-code\tests\lib\skill-dashboard.test.js → everything-claude-code\tests\lib\tmux-worktree-orchestrator.test.js
- `runNode()` --calls--> `spawnSync()`  [INFERRED]
  everything-claude-code\tests\lib\state-store.test.js → everything-claude-code\tests\lib\tmux-worktree-orchestrator.test.js
- `record_tool_call()` --calls--> `log_tool_call()`  [INFERRED]
  everything-claude-code\ecc2\src\session\manager.rs → everything-claude-code\ecc2\src\observability\mod.rs
- `askClaude()` --calls--> `spawnSync()`  [INFERRED]
  everything-claude-code\scripts\claw.js → everything-claude-code\tests\lib\tmux-worktree-orchestrator.test.js

## Communities

### Community 0 - "Community 0"
Cohesion: 0.02
Nodes (150): cmd_evolve(), cmd_export(), cmd_import(), cmd_projects(), cmd_promote(), cmd_prune(), cmd_status(), _collect_pending_dirs() (+142 more)

### Community 1 - "Community 1"
Cohesion: 0.02
Nodes (69): runScript(), runTests(), test(), runScript(), runTests(), test(), runCustomHook(), runHook() (+61 more)

### Community 2 - "Community 2"
Cohesion: 0.03
Nodes (77): classify_events(), _parse_classification(), Classify tool calls against compliance steps using LLM., Classify which tool calls match which compliance steps.      Returns {step_id:, Parse LLM classification output into {step_id: [event_indices]}., _check_temporal_order(), ComplianceResult, grade() (+69 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (83): main(), main(), buildSessionHeader(), buildSummaryBlock(), buildSummarySection(), escapeRegExp(), extractHeaderField(), extractSessionSummary() (+75 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (50): clean_svg(), agent_program(), build_agent_command(), build_config(), build_session(), build_session_record(), create_session(), create_session_in_dir() (+42 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (17): aggregate_cost_summary_mentions_total_cost(), AggregateUsage, Dashboard, grid_layout_renders_four_panes(), metrics_scroll_does_not_mutate_output_scroll(), Pane, pane_navigation_skips_log_outside_grid_layouts(), pane_resize_clamps_to_bounds() (+9 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (51): analyzeRecord(), areFilesEqual(), buildDoctorReport(), buildIssue(), buildRecordedStatePreview(), cloneJsonValue(), compareStringArrays(), createRepairPlanFromRecord() (+43 more)

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (36): runNode(), runTests(), seedStore(), test(), main(), parseArgs(), printDecisions(), printSessionDetail() (+28 more)

### Community 8 - "Community 8"
Cohesion: 0.04
Nodes (17): KineticText(), ScrollMaskText(), NumberTicker(), SEO(), CTASection(), HeroSection(), StatsBar(), cn() (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.06
Nodes (30): applyInstallPlan(), buildMergedSettings(), findHooksSourcePath(), mergeHookEntries(), readJsonObject(), buildDiscoveryRecord(), runTests(), test() (+22 more)

### Community 10 - "Community 10"
Cohesion: 0.06
Nodes (36): main(), parseArgs(), usage(), inspectSkillLoopTarget(), main(), parseArgs(), usage(), createClaudeHistoryAdapter() (+28 more)

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (43): dedupeStrings(), findDefaultInstallConfigPath(), formatValidationErrors(), getValidator(), loadInstallConfig(), readJson(), resolveInstallConfigPath(), dedupeStrings() (+35 more)

### Community 12 - "Community 12"
Cohesion: 0.12
Nodes (31): createInstallPlanFromRequest(), getInstallTargetAdapter(), listInstallTargetAdapters(), planInstallTargetScaffold(), addFileCopyOperation(), addMatchingRuleOperations(), addRecursiveCopyOperations(), buildCopyFileOperation() (+23 more)

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (23): parseBullets(), parseLeftOff(), contextMdPath(), contextPath(), daysAgoLabel(), encodeProjectPath(), gitLogSince(), gitSummary() (+15 more)

### Community 14 - "Community 14"
Cohesion: 0.13
Nodes (25): cleanupAliases(), deleteAlias(), getAliasesForSession(), getAliasesPath(), getDefaultAliases(), listAliases(), loadAliases(), renameAlias() (+17 more)

### Community 15 - "Community 15"
Cohesion: 0.11
Nodes (25): main(), parseArgs(), requireValue(), showHelp(), bucketByDay(), formatPercent(), getTrendArrow(), groupRecordsBySkill() (+17 more)

### Community 16 - "Community 16"
Cohesion: 0.13
Nodes (23): loadStateStoreImpl(), buildAggregates(), deriveClaudeWorkerId(), deriveDmuxSessionState(), deriveWorkerHealth(), ensureInteger(), ensureOptionalString(), ensureString() (+15 more)

### Community 17 - "Community 17"
Cohesion: 0.13
Nodes (20): assess_blast_radius(), assess_file_sensitivity(), assess_irreversibility(), base_tool_risk(), blocks_combined_high_risk_operations(), computes_blast_radius_risk(), computes_irreversible_risk(), computes_sensitive_file_risk() (+12 more)

### Community 18 - "Community 18"
Cohesion: 0.14
Nodes (14): animateProgress(), box(), demo(), SkillCreateOutput, sleep(), stripAnsi(), check_sessions(), resume_crashed_sessions() (+6 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (12): budget_ratio(), budget_state(), BudgetState, format_currency(), format_token_count(), gradient_color(), interpolate_rgb(), MeterFormat (+4 more)

### Community 20 - "Community 20"
Cohesion: 0.19
Nodes (25): attemptReconnect(), configPaths(), detectFailureCode(), emitLogs(), envNumber(), extractMcpTarget(), extractMcpTargetFromRaw(), failureSummary() (+17 more)

### Community 21 - "Community 21"
Cohesion: 0.14
Nodes (21): branchExists(), buildOrchestrationPlan(), buildSessionBannerCommand(), buildWorkerArtifacts(), canonicalizePath(), cleanupExisting(), commandSucceeds(), executePlan() (+13 more)

### Community 22 - "Community 22"
Cohesion: 0.17
Nodes (19): askClaude(), branchSession(), buildPrompt(), compactSession(), estimateTokenCount(), exportSession(), getClawDir(), getSessionMetrics() (+11 more)

### Community 23 - "Community 23"
Cohesion: 0.14
Nodes (12): assertNoProjectDetectionSideEffects(), assertObserveSkipBeforeProjectDetection(), asyncTest(), cleanupTestDir(), createTestDir(), fromBashPath(), normalizeComparablePath(), runPatchedRunAll() (+4 more)

### Community 24 - "Community 24"
Cohesion: 0.15
Nodes (19): append_event(), cleanup_pid(), default_output_dir(), ensure_private_dir(), is_fatal_error(), listen_with_retry(), log(), main() (+11 more)

### Community 25 - "Community 25"
Cohesion: 0.26
Nodes (17): buildReport(), countFiles(), detectTargetMode(), fileExists(), findPluginInstall(), getConsumerChecks(), getRepoChecks(), hasFileWithExtension() (+9 more)

### Community 26 - "Community 26"
Cohesion: 0.22
Nodes (6): OutputEvent, OutputLine, OutputStream, pushing_output_broadcasts_events(), ring_buffer_keeps_most_recent_lines(), SessionOutputStore

### Community 27 - "Community 27"
Cohesion: 0.36
Nodes (14): appendEvolutionRecord(), createVersion(), ensureSkillExists(), ensureSkillVersioning(), getCurrentVersion(), getEvolutionDir(), getEvolutionLog(), getEvolutionLogPath() (+6 more)

### Community 28 - "Community 28"
Cohesion: 0.24
Nodes (13): buildSessionSnapshot(), collectSessionSnapshot(), listTmuxPanes(), listWorkerDirectories(), loadWorkerSnapshots(), parseBullets(), parseSection(), parseWorkerHandoff() (+5 more)

### Community 29 - "Community 29"
Cohesion: 0.33
Nodes (13): assertValidProvenance(), classifySkillPath(), getProvenancePath(), getSkillRoots(), isIsoTimestamp(), isWithinRoot(), normalizeSkillDir(), readProvenance() (+5 more)

### Community 30 - "Community 30"
Cohesion: 0.23
Nodes (9): runCatalogValidator(), runSourceViaTempFile(), runTests(), runValidatorWithDir(), runValidatorWithDirs(), stripShebang(), test(), writeInstallComponentsManifest() (+1 more)

### Community 31 - "Community 31"
Cohesion: 0.19
Nodes (6): Config, default_includes_positive_budget_thresholds(), missing_budget_fields_fall_back_to_defaults(), PaneLayout, RiskThresholds, Theme

### Community 32 - "Community 32"
Cohesion: 0.28
Nodes (11): emitHookResult(), getPluginRoot(), main(), readStdinRaw(), writeLegacySpawnOutput(), writeStderr(), getDisabledHookIds(), getHookProfile() (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.26
Nodes (9): run(), exec(), log(), maybeRunQualityGate(), run(), detectFormatter(), findProjectRoot(), getRunnerFromPackageManager() (+1 more)

### Community 34 - "Community 34"
Cohesion: 0.32
Nodes (10): buildCatalog(), evaluateExpectations(), formatExpectation(), listMatchingFiles(), main(), parseAgentsDocExpectations(), parseReadmeExpectations(), readFileOrThrow() (+2 more)

### Community 35 - "Community 35"
Cohesion: 0.29
Nodes (10): collectDangerousInvisibleMatches(), collectMatches(), isAllowedEmojiLikeSymbol(), isDangerousInvisibleCodePoint(), isTextFile(), lineAndColumn(), listFiles(), sanitizeText() (+2 more)

### Community 36 - "Community 36"
Cohesion: 0.26
Nodes (10): buildAgentCatalog(), compressToCatalog(), compressToSummary(), extractSummary(), lazyLoadAgent(), loadAgent(), loadAgents(), parseFrontmatter() (+2 more)

### Community 37 - "Community 37"
Cohesion: 0.27
Nodes (10): extract_content(), format_feedback(), get_anomaly_attr(), main(), Append an audit event to the JSONL audit log.      Creates a new dict to avoid, Get a field from an anomaly that may be a dict or an object.      The SDK's ``, Format detected anomalies as feedback for Claude Code.      Returns:, Entry point for the Claude Code PreToolUse hook. (+2 more)

### Community 38 - "Community 38"
Cohesion: 0.36
Nodes (8): buildValidationIssue(), createFlatRuleOperations(), createManagedOperation(), createNamespacedFlatRuleOperations(), createRemappedOperation(), defaultValidateAdapterInput(), listRelativeFiles(), normalizeRelativePath()

### Community 39 - "Community 39"
Cohesion: 0.4
Nodes (9): analyzeForGovernanceEvents(), detectApprovalRequired(), detectSecrets(), detectSensitivePath(), emitGovernanceEvent(), fingerprintCommand(), generateEventId(), run() (+1 more)

### Community 40 - "Community 40"
Cohesion: 0.22
Nodes (2): asyncTest(), runTests()

### Community 41 - "Community 41"
Cohesion: 0.44
Nodes (7): buildTree(), classifyFiles(), generateAreaDoc(), generateIndex(), main(), rel(), walkDir()

### Community 42 - "Community 42"
Cohesion: 0.39
Nodes (7): configDiffers(), findSubSections(), log(), main(), removeSectionFromText(), removeServerFromText(), warn()

### Community 43 - "Community 43"
Cohesion: 0.25
Nodes (4): Session, SessionMetrics, SessionState, WorktreeInfo

### Community 44 - "Community 44"
Cohesion: 0.46
Nodes (7): getRunsFilePath(), normalizeExecutionRecord(), readJsonl(), readSkillExecutionRecords(), recordSkillExecution(), resolveHomeDir(), toNullableNumber()

### Community 45 - "Community 45"
Cohesion: 0.29
Nodes (2): runTests(), test()

### Community 46 - "Community 46"
Cohesion: 0.48
Nodes (5): detectPatterns(), generateReport(), groupFailures(), inspect(), normalizeFailureReason()

### Community 47 - "Community 47"
Cohesion: 0.52
Nodes (6): assertValidEntity(), formatValidationErrors(), getAjv(), getEntityValidator(), readSchema(), validateEntity()

### Community 48 - "Community 48"
Cohesion: 0.33
Nodes (2): runTests(), test()

### Community 49 - "Community 49"
Cohesion: 0.33
Nodes (2): runTests(), test()

### Community 51 - "Community 51"
Cohesion: 0.6
Nodes (5): getLeadingCommandWord(), isOptionToken(), normalizeCommandWord(), readToken(), shouldSkipOptionValue()

### Community 53 - "Community 53"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 54 - "Community 54"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 55 - "Community 55"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 56 - "Community 56"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 57 - "Community 57"
Cohesion: 0.4
Nodes (2): cleanupTmpDirs(), runTests()

### Community 58 - "Community 58"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 59 - "Community 59"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 60 - "Community 60"
Cohesion: 0.7
Nodes (4): isNonEmptyString(), isNonEmptyStringArray(), validateHookEntry(), validateHooks()

### Community 61 - "Community 61"
Cohesion: 0.8
Nodes (4): normalizeRelativePath(), readJson(), validateInstallManifests(), validateSchema()

### Community 62 - "Community 62"
Cohesion: 0.5
Nodes (2): discoverTestFiles(), walkFiles()

### Community 63 - "Community 63"
Cohesion: 0.5
Nodes (2): runTests(), test()

### Community 64 - "Community 64"
Cohesion: 0.5
Nodes (2): runTests(), test()

### Community 65 - "Community 65"
Cohesion: 0.5
Nodes (2): runTests(), test()

### Community 67 - "Community 67"
Cohesion: 0.67
Nodes (3): main(), pick(), 使用 secrets 模块（直接读 os.urandom）确保真随机

### Community 68 - "Community 68"
Cohesion: 0.67
Nodes (2): escapeRegExp(), getTomlSection()

### Community 70 - "Community 70"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 72 - "Community 72"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 73 - "Community 73"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 74 - "Community 74"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 76 - "Community 76"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 77 - "Community 77"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 78 - "Community 78"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 79 - "Community 79"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 80 - "Community 80"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 81 - "Community 81"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 84 - "Community 84"
Cohesion: 0.67
Nodes (1): MessageType

### Community 85 - "Community 85"
Cohesion: 1.0
Nodes (2): extractFrontmatter(), validateAgents()

### Community 86 - "Community 86"
Cohesion: 1.0
Nodes (2): collectRuleFiles(), validateRules()

### Community 87 - "Community 87"
Cohesion: 1.0
Nodes (2): parseInput(), run()

### Community 89 - "Community 89"
Cohesion: 1.0
Nodes (2): isSuspiciousDocPath(), run()

### Community 91 - "Community 91"
Cohesion: 1.0
Nodes (2): runTests(), test()

### Community 92 - "Community 92"
Cohesion: 1.0
Nodes (2): runTests(), test()

### Community 93 - "Community 93"
Cohesion: 1.0
Nodes (2): runTests(), test()

### Community 94 - "Community 94"
Cohesion: 1.0
Nodes (2): runTests(), test()

### Community 95 - "Community 95"
Cohesion: 1.0
Nodes (2): runTests(), test()

### Community 150 - "Community 150"
Cohesion: 1.0
Nodes (1): write_test has before_step=write_impl, but test is written AFTER impl.

## Knowledge Gaps
- **124 isolated node(s):** `Cli`, `Commands`, `MessageType`, `PaneLayout`, `Theme` (+119 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 40`** (10 nodes): `hooks.test.js`, `asyncTest()`, `cleanupTestDir()`, `createTestDir()`, `getHookCommandByDescription()`, `getSessionStartPayload()`, `runHookCommand()`, `runHookWithInput()`, `runTests()`, `_test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (8 nodes): `trae-install.test.js`, `cleanup()`, `createTempDir()`, `readManifestLines()`, `runInstall()`, `runTests()`, `runUninstall()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (7 nodes): `resolve-ecc-root.test.js`, `createTempDir()`, `runTests()`, `setupLegacyPluginInstall()`, `setupPluginCache()`, `setupStandardInstall()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (7 nodes): `install-apply.test.js`, `cleanup()`, `createTempDir()`, `readJson()`, `run()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (6 nodes): `install-config.test.js`, `cleanup()`, `createTempDir()`, `runTests()`, `test()`, `writeJson()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (6 nodes): `install-manifests.test.js`, `cleanupTestRepo()`, `createTestRepo()`, `runTests()`, `test()`, `writeJson()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (6 nodes): `package-manager.test.js`, `cleanupTestDir()`, `createTestDir()`, `runTests()`, `test()`, `withIsolatedHome()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (6 nodes): `project-detect.test.js`, `cleanupDir()`, `createTempDir()`, `runTests()`, `test()`, `writeTestFile()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (6 nodes): `resolve-formatter.test.js`, `cleanupTmpDirs()`, `makeTmpDir()`, `runTests()`, `test()`, `withIsolatedHome()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (6 nodes): `harness-audit.test.js`, `cleanup()`, `createTempDir()`, `run()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (6 nodes): `install-sh.test.js`, `cleanup()`, `createTempDir()`, `run()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (5 nodes): `run-all.js`, `boxLine()`, `discoverTestFiles()`, `matchesTestGlob()`, `walkFiles()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (5 nodes): `install-state.test.js`, `cleanupTestDir()`, `createTestDir()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (5 nodes): `session-manager.test.js`, `cleanup()`, `createTempSessionDir()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (5 nodes): `skill-create-output.test.js`, `captureLog()`, `runTests()`, `stripAnsi()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (4 nodes): `codex-config.test.js`, `escapeRegExp()`, `getTomlSection()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (4 nodes): `hook-flags.test.js`, `runTests()`, `test()`, `withEnv()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 72`** (4 nodes): `inspection.test.js`, `makeSkillRun()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 73`** (4 nodes): `install-targets.test.js`, `normalizedRelativePath()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (4 nodes): `session-aliases.test.js`, `resetAliases()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (4 nodes): `catalog.test.js`, `run()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (4 nodes): `claw.test.js`, `makeTmpDir()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (4 nodes): `install-plan.test.js`, `run()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (4 nodes): `orchestration-status.test.js`, `run()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (4 nodes): `session-inspect.test.js`, `run()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (4 nodes): `setup-package-manager.test.js`, `run()`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 84`** (3 nodes): `MessageType`, `send()`, `mod.rs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 85`** (3 nodes): `extractFrontmatter()`, `validateAgents()`, `validate-agents.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (3 nodes): `collectRuleFiles()`, `validateRules()`, `validate-rules.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 87`** (3 nodes): `config-protection.js`, `parseInput()`, `run()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 89`** (3 nodes): `doc-file-warning.js`, `isSuspiciousDocPath()`, `run()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 91`** (3 nodes): `governance-capture.test.js`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 92`** (3 nodes): `install-request.test.js`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 93`** (3 nodes): `selective-install.test.js`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 94`** (3 nodes): `utils.test.js`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 95`** (3 nodes): `sync-ecc-to-codex.test.js`, `runTests()`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 150`** (1 nodes): `write_test has before_step=write_impl, but test is written AFTER impl.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `spawnSync()` connect `Community 1` to `Community 32`, `Community 33`, `Community 3`, `Community 7`, `Community 12`, `Community 13`, `Community 20`, `Community 21`, `Community 22`, `Community 23`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `runCommand()` connect `Community 12` to `Community 1`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Are the 45 inferred relationships involving `spawnSync()` (e.g. with `askClaude()` and `runCommand()`) actually correct?**
  _`spawnSync()` has 45 INFERRED edges - model-reasoned connections that need verification._
- **Are the 9 inferred relationships involving `_load_instincts_from_dir()` (e.g. with `test_load_from_empty_dir()` and `test_load_from_nonexistent_dir()`) actually correct?**
  _`_load_instincts_from_dir()` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Are the 16 inferred relationships involving `grade()` (e.g. with `classify_events()` and `main()`) actually correct?**
  _`grade()` has 16 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Cli`, `Commands`, `MessageType` to the rest of the system?**
  _124 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._