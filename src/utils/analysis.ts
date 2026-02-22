export interface ExtractedSkills {
    coreCS: string[];
    languages: string[];
    web: string[];
    data: string[];
    cloud: string[];
    testing: string[];
    other: string[];
}

export interface RoundMappingItem {
    roundTitle: string;
    focusAreas: string[];
    whyItMatters: string;
}

export interface ChecklistItem {
    roundTitle: string;
    items: string[];
}

export interface DayPlan {
    day: string;
    focus: string;
    tasks: string[];
}

export interface AnalysisResult {
    id: string;
    createdAt: string;
    updatedAt: string;
    company: string;
    role: string;
    jdText: string;
    extractedSkills: ExtractedSkills;
    roundMapping: RoundMappingItem[];
    checklist: ChecklistItem[];
    plan7Days: DayPlan[];
    questions: string[];
    baseScore: number;
    finalScore: number;
    skillConfidenceMap: Record<string, 'know' | 'practice'>;
}

const SKILL_DATABASE = {
    coreCS: ["DSA", "OOP", "DBMS", "OS", "Networks"],
    languages: ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    web: ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    data: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    cloud: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    testing: ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

export function analyzeJD(company: string, role: string, jdText: string): AnalysisResult {
    const extracted: ExtractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };

    const text = jdText.toLowerCase();
    let categoriesFound = 0;

    // 1. Skill Extraction
    Object.entries(SKILL_DATABASE).forEach(([category, skills]) => {
        const found = skills.filter(skill => {
            const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            return regex.test(text);
        });

        if (found.length > 0) {
            (extracted as any)[category] = found;
            categoriesFound++;
        }
    });

    // Default behavior if no skills detected
    if (categoriesFound === 0) {
        extracted.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    const allFoundSkills = Object.values(extracted).flat();

    // 2. Base Score Calculation
    let baseScore = 35;
    baseScore += Math.min(categoriesFound * 5, 30);
    if (company.trim()) baseScore += 10;
    if (role.trim()) baseScore += 10;
    if (jdText.length > 800) baseScore += 10;
    baseScore = Math.min(baseScore, 100);

    // 3. Round Mapping
    const enterpriseNames = ["amazon", "google", "meta", "tcs", "infosys", "microsoft", "netflix", "apple", "ibm", "oracle", "wipro", "hcl", "accenture", "capgemini"];
    const isEnterprise = enterpriseNames.some(e => company.toLowerCase().includes(e));

    const roundMapping: RoundMappingItem[] = isEnterprise ? [
        { roundTitle: "Round 1: Online Screening", focusAreas: ["Aptitude", "DSA Basics"], whyItMatters: "Standardized filter for large volumes of applicants." },
        { roundTitle: "Round 2: Technical I (DSA)", focusAreas: ["Complexity Analysis", "Data Structures"], whyItMatters: "Proves technical foundation and problem-solving grit." },
        { roundTitle: "Round 3: Technical II (System)", focusAreas: ["Core CS", "Design Patterns"], whyItMatters: "Evaluates ability to build scalable and maintainable solutions." },
        { roundTitle: "Round 4: HR & Values", focusAreas: ["Cultural Fit", "Behavioral"], whyItMatters: "Ensures long-term alignment with company culture." }
    ] : [
        { roundTitle: "Round 1: Practical Assessment", focusAreas: ["Stack Implementation", "Bug Fixes"], whyItMatters: "Agile environments need people who can ship code fast." },
        { roundTitle: "Round 2: Technical Discussion", focusAreas: ["Project Depth", "Stack Expertise"], whyItMatters: "Checks if you truly understand the tools you use." },
        { roundTitle: "Round 3: Culture & Founder", focusAreas: ["Vision Alignment", "Adaptability"], whyItMatters: "Critical for small teams to have shared ownership." }
    ];

    // 4. Checklist & 7-Day Plan
    const checklist: ChecklistItem[] = roundMapping.map(rm => ({
        roundTitle: rm.roundTitle,
        items: [rm.focusAreas[0], ...allFoundSkills.slice(0, 4), "Mock Interview"].slice(0, 6)
    }));

    const plan7Days: DayPlan[] = [
        { day: "Day 1-2", focus: "Foundation", tasks: ["Review " + (extracted.coreCS[0] || "CS Basics"), "Mock Test on Aptitude"] },
        { day: "Day 3-4", focus: "Practice", tasks: ["Solve 10 problems on " + (allFoundSkills[0] || "Arrays"), "Practice Complexity"] },
        { day: "Day 5", focus: "Resume", tasks: ["Align projects with " + (company || "JD"), "Impact metrics"] },
        { day: "Day 6-7", focus: "Final Push", tasks: ["Simulate " + roundMapping[0].roundTitle, "Final Revision"] }
    ];

    // 5. Questions
    const questions = [
        allFoundSkills.includes("React") ? "Explain the difference between useMemo and useCallback." : "Explain memory management in your primary language.",
        allFoundSkills.includes("SQL") ? "How do you optimize a slow query in a large database?" : "Briefly describe a situation where you chose between two technologies.",
        "Describe the most challenging part of your main project.",
        "How do you handle conflicting requirements in a team environment?",
        "Explain the concept of CAP theorem in distributed systems.",
        "What is your approach to handling technical debt?",
        "How do you stay current with tech trends?",
        "Describe a time you failed and what you learned.",
        "Solve: Find the middle element of a linked list.",
        "Why " + (company || "this company") + "?"
    ].slice(0, 10);

    const confidenceMap: Record<string, 'know' | 'practice'> = {};
    allFoundSkills.forEach(skill => { confidenceMap[skill] = 'practice'; });

    return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills: extracted,
        roundMapping,
        checklist,
        plan7Days,
        questions,
        baseScore,
        finalScore: baseScore,
        skillConfidenceMap: confidenceMap
    };
}

export function getHistory(): AnalysisResult[] {
    const data = localStorage.getItem('prep_history');
    if (!data) return [];
    try {
        const parsed = JSON.parse(data);
        return parsed.filter((entry: any) => {
            // Basic validation for required fields
            return entry && entry.id && entry.jdText && entry.extractedSkills;
        });
    } catch (e) {
        console.error("Corrupted history", e);
        return [];
    }
}

export function saveResult(result: AnalysisResult) {
    const history = getHistory();
    const updated = [result, ...history];
    localStorage.setItem('prep_history', JSON.stringify(updated.slice(0, 20)));
}

export function updateResult(updatedResult: AnalysisResult) {
    const history = getHistory();
    const index = history.findIndex(r => r.id === updatedResult.id);
    if (index !== -1) {
        history[index] = { ...updatedResult, updatedAt: new Date().toISOString() };
        localStorage.setItem('prep_history', JSON.stringify(history));
    }
}

export function getResultById(id: string): AnalysisResult | undefined {
    return getHistory().find(r => r.id === id);
}
