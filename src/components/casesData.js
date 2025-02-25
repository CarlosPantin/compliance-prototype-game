export const casesData = [
    {
      title: "Harassment Complaint",
      description:
        "An employee, Alice Johnson, has filed a formal complaint against her manager, Mark Smith, alleging harassment in the workplace. The complaint specifically mentions offensive language used by Mark during email correspondence, creating a hostile and uncomfortable work environment for Alice.",
      people_involved: [
        {
          name: "Alice Johnson",
          role: "Complainant",
          department: "Human Resources (HR)",
        },
        { name: "Mark Smith", role: "Subject", department: "Sales" },
      ],
      evidence: [
        {
          type: "Email Correspondence",
          details:
            "Alice has provided several email exchanges in which Mark uses offensive and inappropriate language, contributing to a toxic work atmosphere.",
        },
      ],
      compliance_violations: [
        {
          regulation: "Company Policy 3.2",
          violation:
            "Harassment in the workplace, as outlined by company policy, which prohibits any form of verbal abuse, bullying, or misconduct.",
        },
      ],
      recommendations: [
        {
          action: "Conduct sensitivity and anti-harassment training",
          department: "Sales",
        },
        {
          action: "Establish clearer reporting protocols for harassment issues",
          department: "HR",
        },
      ],
      correct_answer: "Guilty",
    },
    {
      title: "False Complaint on Overtime",
      description:
        "An employee, John Doe, has submitted a complaint claiming that he was denied overtime pay for hours worked during a busy period. However, upon reviewing the company's payroll records, it is clear that John was compensated correctly according to the overtime policy and that no violation of company procedures occurred.",
      people_involved: [
        { name: "John Doe", role: "Complainant", department: "Logistics" },
        { name: "HR Team", role: "Subject", department: "Human Resources (HR)" },
      ],
      evidence: [
        {
          type: "Payroll Records",
          details:
            "The HR department has verified the payroll records, which indicate that John received the appropriate overtime compensation according to the company's official policy and labor laws.",
        },
      ],
      compliance_violations: [],
      recommendations: [
        {
          action:
            "Clearly communicate the overtime policy to all employees to prevent misunderstandings",
          department: "HR",
        },
        {
          action:
            "Ensure that employees are aware of the proper channels to address pay-related concerns",
          department: "HR",
        },
      ],
      correct_answer: "Not Guilty",
    },
    {
      title: "Discrimination in Promotion",
      description:
        "Sarah Chen, a talented software developer, claims she was passed over for promotion due to gender bias. She has been with the company for 5 years with excellent performance reviews but was not considered for a senior position that went to a male colleague with less experience.",
      people_involved: [
        { name: "Sarah Chen", role: "Complainant", department: "Engineering" },
        { name: "David Wilson", role: "Subject", department: "Engineering Management" },
      ],
      evidence: [
        {
          type: "Performance Reviews",
          details:
            "Sarah's performance reviews consistently show 'Exceeds Expectations' ratings for the past 3 years.",
        },
        {
          type: "Promotion History",
          details:
            "Records show 7 promotions in the department over 2 years, all going to male employees despite the department being 40% female.",
        },
      ],
      compliance_violations: [
        {
          regulation: "Equal Employment Opportunity Policy",
          violation:
            "Potential bias in promotion decisions based on gender, violating company EEO policies and federal law.",
        },
      ],
      recommendations: [
        {
          action: "Review promotion criteria and decision-making process",
          department: "HR",
        },
        {
          action: "Implement blind review process for promotions",
          department: "Engineering",
        },
      ],
      correct_answer: "Guilty",
    },
    {
      title: "Safety Protocol Violation",
      description:
        "A warehouse supervisor, James Miller, has been reported for instructing employees to bypass safety checks to increase productivity. Two minor accidents have occurred in the past month that may be related to these instructions.",
      people_involved: [
        { name: "James Miller", role: "Subject", department: "Warehouse Operations" },
        { name: "Miguel Rodriguez", role: "Complainant", department: "Warehouse Staff" },
      ],
      evidence: [
        {
          type: "Accident Reports",
          details:
            "Two recent incidents resulting in minor injuries, both occurring during rushed operations.",
        },
        {
          type: "Witness Statements",
          details:
            "Three employees have provided written statements confirming they were instructed to skip safety protocols.",
        },
      ],
      compliance_violations: [
        {
          regulation: "Occupational Health and Safety Policy 7.3",
          violation:
            "Deliberate circumvention of established safety protocols, endangering employee wellbeing.",
        },
      ],
      recommendations: [
        {
          action: "Immediate safety retraining for all warehouse staff",
          department: "Operations",
        },
        {
          action: "Review of productivity metrics to ensure they don't incentivize unsafe practices",
          department: "Operations Management",
        },
      ],
      correct_answer: "Guilty",
    },
    {
      title: "Alleged Expense Fraud",
      description:
        "The Finance department flagged potentially fraudulent expense claims from Regional Manager Patricia Lee. Initial review suggested duplicate submissions and personal expenses being claimed as business expenses.",
      people_involved: [
        { name: "Patricia Lee", role: "Subject", department: "Regional Sales" },
        { name: "Finance Audit Team", role: "Complainant", department: "Finance" },
      ],
      evidence: [
        {
          type: "Expense Reports",
          details:
            "After thorough investigation, the apparent duplicates were determined to be similar but legitimate expenses from consecutive days of travel.",
        },
        {
          type: "Receipt Verification",
          details:
            "All questionable expenses were verified with hotels and restaurants, confirming they were legitimate business meetings.",
        },
      ],
      compliance_violations: [],
      recommendations: [
        {
          action: "Improve expense reporting form to clearly differentiate similar consecutive expenses",
          department: "Finance",
        },
        {
          action: "Provide better guidelines on documentation requirements for business meals",
          department: "Finance",
        },
      ],
      correct_answer: "Not Guilty",
    },
  ];