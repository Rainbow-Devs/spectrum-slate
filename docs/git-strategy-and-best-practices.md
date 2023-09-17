## Git Page for Notion Document

### Git Branching Strategy

#### **1. Main Branch**
- The `main` branch should always contain the stable version of the project.
- Direct pushes to `main` are restricted; changes should be introduced only through Pull Requests (PRs).

#### **2. Development Branch**
- A `development` branch should be created as a pre-step to the `main` branch. This branch will contain the latest developments and features that are ready for a release.

#### **3. Feature Branches**
- Feature branches are created for new features or bug fixes.
- Branch naming convention: `feature/spectrum-{ticketNumber}` where `{ticketNumber}` is a unique identifier for the task at hand.
- These branches should be created off the `development` branch and must be merged back into it once the feature is completed and tested.

#### **4. Hotfix Branches**
- These branches are meant for urgent bug fixes.
- Branch naming convention: `hotfix/spectrum-{ticketNumber}`.
- Hotfix branches can be created off the `main` branch and should be merged back into both the `main` and `development` branches.

### Pull Request (PR) Policies

1. **Code Review**
   - Before merging a PR, it must be reviewed by at least one other team member.
   - The reviewer should ensure that the code follows the project's coding standards and guidelines.

2. **Continuous Integration**
   - PRs should pass all continuous integration checks before being merged.

3. **Descriptive Comments**
   - PRs should contain detailed comments that explain the changes made, the reason for the changes, and any potential impacts.

4. **Commit Messages**
   - Commit messages should be clear and descriptive, following a consistent pattern that makes it easy to understand the changes made at any point in time.

### Merging Policies

1. **Merging into `Development`**
   - Once a feature or hotfix branch is ready to be merged, a PR should be created to merge it into the `development` branch.
   - After code review and approval, the PR can be merged into the `development` branch.

2. **Merging into `Main`**
   - When the `development` branch is stable and ready for release, a PR should be created to merge it into the `main` branch.
   - PRs into `main` should be thoroughly reviewed to ensure stability.

### Documentation
- Notion documentation should be updated regularly with details about the branch structures, naming conventions, and merging policies to provide a comprehensive guide for team members.

---

## Commit Messages: Best Practices

#### **Introduction**
- The significance of meaningful commit messages.
- How following a consistent commit message convention aids in better understanding and tracking of the project’s history.

#### **Commit Message Convention**

##### **Pattern**
- Commit messages should follow the pattern: `SPECTRUM-ticketNumber: Short descriptive message`.
- `SPECTRUM-ticketNumber`: A unique identifier linking back to the task or issue in the project management tool.
- `Short descriptive message`: A succinct description of the changes made.

##### **Components**
1. **Ticket Number**
   - Should directly correlate with the task or issue number in the project management tool.
   - Facilitates quick reference and tracking.

2. **Descriptive Message**
   - Clearly describe the essence of the change.
   - Should ideally not exceed 50-60 characters.

#### **Writing Good Descriptive Messages**
1. **Imperative Mood**
   - Use the imperative mood, e.g., "Add" instead of "Added" or "Adds".

2. **Specificity**
   - The message should clearly indicate what was done without having to delve into the code.
   - Avoid vague messages like "Fix bug" or "Update file".

3. **Context**
   - Provide enough context to understand the impact of the change.
   - Mention if the commit relates to a particular module or feature.

#### **Body of Commit Message (optional)**
- For more complex changes, a detailed explanation can be provided in the body of the commit message, following the short descriptive message.
- Should detail the rationale behind the change and its implications.

#### **Examples**
- **Correct**
  - `SPECTRUM-123: Add error handling to login function`
  - `SPECTRUM-456: Optimize image loading for faster page rendering`

- **Incorrect**
  - `SPECTRUM-123: Updated files`
  - `SPECTRUM-456: Made some changes`

### **Conclusion**
- Recap of the importance of adhering to the defined convention.
- A note encouraging collaboration and adherence to these guidelines for the betterment of the project.

#### **Resources**
- Links to additional readings or tutorials on writing effective commit messages.
