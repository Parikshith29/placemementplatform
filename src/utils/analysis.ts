export interface AnalyzedSkills {
    category: string;
    skills: string[];
}

export interface AnalysisResult {
    id: string;
    createdAt: string;
    company: string;
    role: string;
    jdText: string;
    extractedSkills: AnalyzedSkills[];
    plan: string[];
    checklist: { round: string; items: string[] }[];
    questions: string[];
    readinessScore: number;
}

const SKILL_DATABASE = {
    "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

const ROUND_TEMPLATES = [
    { round: "Round 1: Aptitude / Basics", base: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "CS Fundamentals"] },
    { round: "Round 2: DSA + Core CS", base: ["Data Structures", "Algorithms", "Time Complexity"] },
    { round: "Round 3: Tech Interview", base: ["Project Walkthrough", "System Design Basics", "Coding Principles"] },
    { round: "Round 4: Managerial / HR", base: ["Why this company?", "Strengths & Weaknesses", "Behavioral questions", "Salary expectations"] }
];

export function analyzeJD(company: string, role: string, jdText: string): AnalysisResult {
    const extracted: AnalyzedSkills[] = [];
    const text = jdText.toLowerCase();
    let categoriesFound = 0;

    // 1. Skill Extraction
    Object.entries(SKILL_DATABASE).forEach(([category, skills]) => {
        const found = skills.filter(skill => {
            // Create regex for whole word matching to avoid "Go" matching in "Good"
            const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            return regex.test(text);
        });

        if (found.length > 0) {
            extracted.push({ category, skills: found });
            categoriesFound++;
        }
    });

    const allFoundSkills = extracted.flatMap(se => se.skills);

    // 2. Readiness Score
    let score = 35;
    score += Math.min(categoriesFound * 5, 30);
    if (company.trim()) score += 10;
    if (role.trim()) score += 10;
    if (jdText.length > 800) score += 10;
    score = Math.min(score, 100);

    // 3. Checklist Generation
    const checklist = ROUND_TEMPLATES.map(rt => {
        const items = [...rt.base];
        if (rt.round.includes("DSA") && allFoundSkills.includes("DSA")) items.push("Advanced DSA Patterns");
        if (rt.round.includes("Tech") && allFoundSkills.length > 0) {
            items.push(...allFoundSkills.slice(0, 3).map(s => `${s} Implementation`));
        }
        return { round: rt.round, items: items.slice(0, 7) };
    });

    // 4. 7-Day Plan
    const plan = [
        "Day 1-2: Review CS Fundamentals (OS, DBMS) and Language basics.",
        "Day 3-4: Practice DSA problems related to " + (allFoundSkills.includes("DSA") ? "detected patterns" : "Arrays/Strings") + ".",
        "Day 5: Deep dive into project implementation and resume alignment.",
        "Day 6: Mock interview session focused on " + (role || "Technical") + " behavioral questions.",
        "Day 7: Final revision of common patterns and weak areas identified."
    ];

    // 5. Interview Questions
    const questions: string[] = [];
    if (allFoundSkills.length === 0) {
        questions.push(
            "Explain the basic principles of Object Oriented Programming.",
            "What are the primary differences between SQL and NoSQL databases?",
            "How do you ensure your code is clean and maintainable?",
            "Describe a project you worked on and the biggest technical challenge you faced.",
            "Explain the concept of time and space complexity with an example."
        );
    } else {
        if (allFoundSkills.includes("SQL")) questions.push("Explain indexing and when it helps.");
        if (allFoundSkills.includes("React")) questions.push("Explain state management options in React (Context vs Redux).");
        if (allFoundSkills.includes("DSA")) questions.push("How would you optimize search in sorted data?");
        if (allFoundSkills.includes("Node.js")) questions.push("Explain the Node.js Event Loop and why it's beneficial.");
        if (allFoundSkills.includes("Docker")) questions.push("What is the difference between a Container and a Virtual Machine?");
        if (allFoundSkills.includes("Java")) questions.push("Explain the concept of JVM, JRE, and JDK.");
        if (allFoundSkills.includes("Python")) questions.push("What are decorators in Python and how do they work?");

        // Fill up to 10 if needed
        const generic = [
            "Tell me about a time you had to debug a complex issue.",
            "How do you stay updated with the latest trends in " + (allFoundSkills[0] || "tech") + "?",
            "Explain your favorite architectural pattern for building scalable apps.",
            "What is your approach to testing your application code?"
        ];
        while (questions.length < 10) {
            questions.push(generic[questions.length % generic.length]);
        }
    }

    return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills: extracted.length > 0 ? extracted : [{ category: "General", skills: ["General fresher stack"] }],
        plan,
        checklist,
        questions: questions.slice(0, 10),
        readinessScore: score
    };
}

export function saveResult(result: AnalysisResult) {
    const history = getHistory();
    const updated = [result, ...history];
    localStorage.setItem('prep_history', JSON.stringify(updated.slice(0, 20))); // Keep last 20
}

export function getHistory(): AnalysisResult[] {
    const data = localStorage.getItem('prep_history');
    return data ? JSON.parse(data) : [];
}

export function getResultById(id: string): AnalysisResult | undefined {
    return getHistory().find(r => r.id === id);
}
