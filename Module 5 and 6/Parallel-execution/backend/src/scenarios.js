const scenarios = [
  {
    id: 'feature-build',
    title: 'Build a feature with multiple Codex workstreams',
    description: 'Simulates research, backend, frontend, tests, and review happening as separate Codex threads.',
    workstreams: [
      {
        id: 'research',
        label: 'Research Agent',
        focus: 'Understand requirements and identify existing patterns.',
        durationMs: 900,
        result: 'Mapped requirements to existing app patterns.'
      },
      {
        id: 'backend',
        label: 'Backend Agent',
        focus: 'Design API shape and implement endpoint behavior.',
        durationMs: 1600,
        result: 'Prepared endpoint contract and server logic.'
      },
      {
        id: 'frontend',
        label: 'Frontend Agent',
        focus: 'Build the user flow and visual timeline.',
        durationMs: 1400,
        result: 'Created interactive UI states and result display.'
      },
      {
        id: 'tests',
        label: 'Testing Agent',
        focus: 'Define checks for success and regression risk.',
        durationMs: 1100,
        result: 'Outlined API and UI verification checks.'
      },
      {
        id: 'review',
        label: 'Review Agent',
        focus: 'Inspect consistency, edge cases, and learner clarity.',
        durationMs: 800,
        result: 'Flagged final polish items and documentation needs.'
      }
    ]
  },
  {
    id: 'bugfix-sprint',
    title: 'Debug a broken project with parallel investigation',
    description: 'Shows how independent investigation paths can reduce debugging time.',
    workstreams: [
      {
        id: 'logs',
        label: 'Logs Agent',
        focus: 'Read server logs and isolate runtime failures.',
        durationMs: 1000,
        result: 'Identified the failing request path.'
      },
      {
        id: 'ui',
        label: 'UI Agent',
        focus: 'Reproduce the issue from the user journey.',
        durationMs: 1300,
        result: 'Captured the failing interaction and input state.'
      },
      {
        id: 'api',
        label: 'API Agent',
        focus: 'Check request payloads and response validation.',
        durationMs: 1500,
        result: 'Found a mismatch between payload and validation.'
      },
      {
        id: 'fix',
        label: 'Fix Agent',
        focus: 'Patch the likely cause after investigation data arrives.',
        durationMs: 1200,
        result: 'Prepared the minimal code change.'
      }
    ]
  }
];

const findScenario = (scenarioId) => scenarios.find((scenario) => scenario.id === scenarioId);

module.exports = {
  scenarios,
  findScenario
};
