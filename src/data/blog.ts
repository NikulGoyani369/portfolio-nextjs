export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ai-test-generation',
    title: 'AI-Powered Test Generation: How LLMs Are Changing Test Automation',
    summary:
      'How large language models like GitHub Copilot and ChatGPT are being used to generate test cases, reduce manual effort, and surface edge cases that humans miss — and where they still fall short.',
    date: '2026-05-14',
    readTime: '6 min read',
    tags: ['AI', 'Test Automation', 'LLMs'],
    content: `
<p>Large language models are fundamentally changing how we write tests. Tools like GitHub Copilot, ChatGPT, and purpose-built platforms like Diffblue Cover can generate unit tests, integration tests, and even end-to-end scenarios from a natural-language description or an existing implementation. After integrating these tools into my V&amp;V workflow at Straumann Group, here is what I have learned.</p>

<h2>What LLMs actually do well</h2>
<p>LLMs excel at generating repetitive boilerplate — the five variations of a login test that differ only in credential type, the dozen boundary conditions for a form field, the mock setup that every test in a file shares. They are also surprisingly good at reading a function signature and proposing edge cases that a tired human reviewer might miss.</p>
<p>In practice, feeding an LLM a TypeScript interface and asking "write me 10 test cases for a function that accepts this" produces a useful first draft within seconds. It is not the final test suite, but it cuts the blank-page problem entirely.</p>

<h2>Where they fall short</h2>
<p>LLMs do not understand your system's invariants. They will generate tests that are syntactically correct but assert the wrong thing — or worse, assert nothing meaningful at all. I have seen Copilot produce tests that pass trivially because the assertion mirrors the implementation rather than the specification.</p>
<p>Hallucinated API methods are also common. The model confidently calls a method that does not exist in your version of a library. A strict TypeScript compiler catches most of these, which is one reason the combination of LLM + TypeScript is particularly effective.</p>

<h2>The right mental model</h2>
<p>Think of LLM-generated tests as a first draft produced by a capable but uninformed colleague. They speed up the mechanical part of test writing — structure, boilerplate, coverage breadth — while leaving the hard part (deciding what matters, specifying correct behaviour) to you. Review everything they produce as if it came from a junior engineer on their first day.</p>

<h2>Practical workflow</h2>
<p>The workflow I use: write the function, ask the LLM to generate test cases, review and cull the list, then implement the tests myself for the ones that matter. This typically cuts test-writing time by 40–60% on well-typed TypeScript codebases while keeping assertion quality high.</p>
<p>The shift is not "AI writes tests instead of humans" — it is "humans spend their time on what matters: deciding what correct behaviour looks like, not typing boilerplate".</p>
    `.trim(),
  },
  {
    slug: 'ai-copilots-in-qa',
    title: 'Using AI Copilots in QA Workflows: Tools, Pitfalls & Best Practices',
    summary:
      'A practical look at integrating AI assistants into day-to-day QA work — from writing Playwright scripts to analysing test results — plus the risks you need to manage.',
    date: '2026-04-02',
    readTime: '5 min read',
    tags: ['AI', 'QA', 'Playwright', 'Best Practices'],
    content: `
<p>AI copilots have moved from curiosity to standard equipment in many engineering teams. As a QA engineer who uses them daily, I have learned where they genuinely help, where they create subtle problems, and what practices make the difference.</p>

<h2>Where AI copilots genuinely help in QA</h2>
<p><strong>Writing Playwright and Selenium scripts:</strong> Copilot is excellent at generating page object classes, locator strategies, and repetitive test steps. Describe the user flow in a comment, and you get a plausible implementation to review.</p>
<p><strong>Analysing test failures:</strong> Pasting a stack trace or a diff into ChatGPT and asking "what's wrong here?" often surfaces the root cause faster than reading the trace manually — especially for unfamiliar frameworks.</p>
<p><strong>Generating test data:</strong> LLMs produce realistic, varied test datasets far faster than manual construction. Ask for 20 variations of a German address, or 50 edge-case email strings, and you have them in seconds.</p>

<h2>Pitfalls I have run into</h2>
<p><strong>Over-trusting assertions:</strong> The most dangerous failure mode is a test that runs green but asserts nothing meaningful. Copilot tends to echo the implementation in assertions. Always ask: "is this test checking the right thing, or just the thing I wrote?"</p>
<p><strong>Stale selectors from AI:</strong> If you describe a UI element in English, the AI will invent a plausible selector — one that may not match your actual DOM. Always verify selectors against a running browser.</p>
<p><strong>Confidently wrong framework knowledge:</strong> LLMs have training cutoffs. They may suggest deprecated Playwright APIs or outdated pytest patterns. Pin to a specific version and cross-reference with official docs.</p>

<h2>Best practices</h2>
<p>Treat AI output as a draft, not a delivery. Review it with the same rigour you would apply to a pull request from a junior engineer. Use TypeScript: a strict compiler rejects hallucinated methods before they ever reach CI. Keep your prompts specific — "write a Playwright test for the login page of an app where the submit button has data-testid='submit-btn'" produces far better output than "write a login test".</p>
<p>The engineers who get the most from AI copilots are not the ones who trust them most — they are the ones who verify fastest.</p>
    `.trim(),
  },
  {
    slug: 'autonomous-testing-ai',
    title: 'Autonomous Testing with AI: Where We Are and Where We Are Headed',
    summary:
      'From self-healing selectors to fully autonomous test agents — mapping the current state of AI-driven testing and what the next 2–3 years will likely look like for QA engineers.',
    date: '2026-02-19',
    readTime: '7 min read',
    tags: ['AI', 'Future of Testing', 'Agents'],
    content: `
<p>The phrase "autonomous testing" means different things depending on who you ask. To a vendor, it means a product that writes and runs tests with minimal human involvement. To a practitioner, it is a spectrum — and understanding where we actually are on that spectrum matters for making sensible tooling decisions.</p>

<h2>Self-healing selectors: the first wave</h2>
<p>Self-healing selectors are the most widely deployed form of AI in testing today. Tools like Healenium and Testim monitor your selectors against DOM changes and update them automatically when a UI is modified. This addresses one of the biggest sources of test maintenance overhead: brittle locators that break every release.</p>
<p>In practice, self-healing selectors work well for stable applications with predictable DOM structures. They are less reliable when UI changes are architectural rather than cosmetic. They also create a maintenance risk of their own: healed selectors that silently point to the wrong element.</p>

<h2>AI-driven test execution and analysis</h2>
<p>The current generation of tools — Mabl, Testim, Applitools — goes beyond selectors. They use machine learning to compare screenshots visually, detect functional regressions without explicit assertions, and prioritise which tests are most likely to surface a failure given a code change.</p>
<p>Visual AI testing (Applitools Eyes being the canonical example) is mature enough to use in production for regulated industries. The false-positive rate has dropped significantly in the past two years, and the ability to detect subtle visual regressions across screen sizes is genuinely useful.</p>

<h2>Where autonomous agents are heading</h2>
<p>The next frontier is LLM-powered test agents that receive a product requirement and generate, execute, and maintain a test suite with minimal human direction. Early prototypes exist — Microsoft's work on autonomous testing agents, various startups exploring agent-based QA — but production-ready, trustworthy versions are 2–3 years away for most domains.</p>
<p>The missing pieces are not technical. LLMs can already generate plausible tests. The gap is in <em>correctness verification</em>: how does an agent know whether a generated test is asserting the right behaviour? Until that is solved reliably, a human review gate remains essential.</p>

<h2>What this means for QA engineers</h2>
<p>The QA role is not being eliminated — it is being elevated. The mechanical parts of testing (writing scripts, maintaining selectors, generating data) are becoming increasingly automatable. The high-value parts (defining what "correct" means, designing risk-based test strategies, interpreting ambiguous failures) are becoming more prominent. The engineers who invest in those skills now will be ahead when the autonomous tools mature.</p>
    `.trim(),
  },
];