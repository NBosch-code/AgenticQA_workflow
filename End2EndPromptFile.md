# End-toEnd QA Workflow 

## Workflow Overview

This prompt guides you through a complete 7-step QA workflow using MCP servers and AI agents from user story to committed automated test scripts.

---
## STEP 1: Read User Story

**Prompt:**
```
I need to sart a new testing workflow. Please read the user story from the file:
user-stories/jira-task-checkout.md

Summarize the key requirements, acceptance critera, and testing scope.
```
**Expected Output**
- Summary of the user story
- List of acceptance criteria
- Application URL and test credentials
- Key features

---
## STEP 2: Create Test Plan

**Prompt:**
```
Based on the JIRA user story jira-task-checkout.md that we just reviewed, use the playwright-test-planner agent to:
1. Read the appliaction URL and test credentials ffrom the user story
2. Explore the application and understand all workflows mentioned in the acceptance criteria
3. Create a comprehensive test plan covers all acceptance criteria including:
    - Happy path scenarios
    - Negative scenarios (validation errors, empty fields, invalid data)
    - Edge cases and boundary conditions
    - Navigationflow tests
    - UI element validation
4. Save the test plan as a markdown file in the specs folder specs/saucedemo-test-plan.md
Ensure each test scenario includes:
    - Clear test case title
    - Detailed step-by-step instructions
    - Test data requirements
```
**Expected Output**
- Complete test plan markdown file saved to specs/
- Organized test scenarios with clear structure
- Browser exploration screenshots (if needed)

---
## STEP 3: Perform Exploratory Testing

**Prompt:**
```
Now I need to perform manual exploratory testing using Playwright CLI.
Please read the test plan from: specs/saucedemo-test-plan.md

Then execute the test scenarios ddefined in the test plan:
1. Use Playwright browser tools to manually execute each test scenario from the plan
2. Follow the ste-by-step instructions in each test case
3. Verify expected results match actual results
4. Take screenshots at key steps and error states
5. Document your findings:
    - Test execution results for each scenario
    - Any UI inconsistencies or unexpected behaviours
    - Missing validations or bugs discovered
    - Screenshots as evidence
```
**Expected Output**
- Manual test execution results
- Screenshots of the application at various states
- List of observations and findings
- Any issues discovered during exploration

---
## STEP 4: Generate Automation Scripts

**Prompt:**
```
Now I need to create automated test scripts using the playwright-test-generator agent.

Please review:
1. Test Plan from: specs folder specs/saucedemo-test-plan.md 
2. Exploratory testing results from Step 3 (for actual element selectors and UI insights)

Using insights from the manual exploratory testing:
1. Leverage the element selectors and locators that were successfully used in Step 3
2. Use stable element properties (IDs, data attributes, roles) discovered during exploration
3. Apply wait strategies and UI behaviours observed during manual testing
4. Incorporate any workarounds for UI quirks discovered

Generate Playwright Javascript automation scripts:
1. Create tests for each test scenario from the test plan
2. Organize scripts into appropriate test suite files in tests/
3. Use the test case names from the test plan and align with the way this project is set up
4. Use reliable selectors and strategies from exploratory testing

Requirements for all scripts:
1. Follow Playwright best practices
2. Include proper assertions using expect()
3. Use descriptive test name matching the format in the test plan
4. Use robust element selectors discovered during manual testing
5. Add comments for complex steps
6. Use proper wait strategies based on the actual application behaviour
7. Add proper test hooks (beforeEach, afterEach)

After generating the scripts, run the tests to verify the tests pass.
```

**Expected Output**

- Test suite files created in tests/ based on the test plan scenarios
- Scripts using robust selectors discovered during exploratory testing
- All scripts follow Playwright best practices
- Initial test generation complete
----
## STEP 5: Execute and Heal Automation Tests

**Prompt:**
```

Now I need to execute the generated automation scripts and heal any failures using the playwright-test-healer agent.

1. Run all automation scripts for this user story in tests/saucedemo-test-plan.md
2. Identify any failing tests
3. For each failing test, use the playwright-test-healer agent to:
- Analyze the failure (selector issue, timing issue, assertion failures)
- Auto-heal the test by fixing selectors, adding waits, or adjusting assertions
- Update the test scripts with the fixes
4. Re-run the healed tests to verify they pass
5. Repeat the heal process until all tests are stable and passing
6. Document:
- Initial test results (pass/fail count)
- Healing activities performed
- Final test results after healing
- Any tests that couldnt be auto-healed

**Expected Output**

- All automation tests executed
- Failing tests identified and healed using test-healer-agent
- Healed test scripts updated in tests folder
- Final stable test execution results
- Summary of healing activities performed
```

---
## Step 6: Create Test Report

**Prompt:**
```

Now I need to create a comprehensive test execution report based on manual testing, automation execution, and healing activities.

Please compile results from:
- Step 3: Manual exploratory testing results
- Step 4: Generated automation scripts
- Step 5: Automated test execution and healing results

Structure the report as. a md file in test-results folder

Include:
1. Executive Summary
    - Total test cases planned
    - Test cases executed (manual + automated)
    - Overall Pass/Fail/Blocked status

2. Manual Testing Results
    - Results from Step 3 exploratory testing
    - Screenshots and observations
    - Issues found during manual testing

3. Automated Test Results
    - Initial automation results from Step 5
    - Healing activities performed
    - Fonal test execution results after healing
    - Test suite execution summary
    - Pass/Fail count for each test suite

4. Defects Log
    - For any failed tests (manual or automated):
        - Bug ID
        - Severity (Critical/High/Medium/low)
        - Title and Description
        - Steps to Reproduce
        - Expected vs Actual Behavior
        - Screenshots/Evidence
        - Environment Details

5. Test Coverage Analysis
    - Which acceptance criteria are covered
    - Coverage from manual vs automated tests
    - Any gaps in test coverage
    - Recommendations for additional testing

6. Summary and Recommendations
    - Overall quality assessment
    - Risk areas
    - Next steps

**Expected Output**

- Comprehensive test execution report covering both manual and automated testing
- Clear PASS/FAIL status for all test scenarios
- Detailed bug reports for failures
- Complete test coverage analysis
- Evidence and screenshots attached
```
---

## Step 7: Commit to Gitlab Repository

Gitlab Repository URL: https://github.com/NBosch-code/AgenticQA_workflow.git

**Prompt:**

```
Now I need to commit all the test artifacts to the Gitlab repository using the Gitlab MCP agent

Gitlab Repository URL: https://github.com/NBosch-code/AgenticQA_workflow.git

Please perform the following Git operations:

1. Initialize Git repository if not already initialized

2. Stage all files in the workspace (all new and modified files)

3. Create a commit with the message:
"feat(tests): Add complete test suite for ....  (add the name of the user story workflow)

    - Add user story documentation
    - Add comprehensive test plan with all scenarios
    - Add test execution report with results
    - Add automated test scripts for checkout process
    - Include validation, navigation, and edge case tests

Resolves ... "

4. Push all changes to the Git repository
```

**Expected Output**

- All workspace files committed to Git
- Descriptive commit message following conventional commit format
- Confirmation of successful push to the provided respository
- Summary of changes

---


