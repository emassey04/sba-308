console.log("Hello, World!");
alert("JavaScript is working!");

function getLearnerData(courseInfo, assignmentGroups, learnerSubmissions) {
    const results = [];
    
    // Basic validation and course matching
    if (!Array.isArray(assignmentGroups) || !Array.isArray(learnerSubmissions)) {
        throw new Error("Invalid data format.");
    }

    for (let group of assignmentGroups) {
        if (group.course_id !== courseInfo.id) {
            throw new Error(`Assignment group ${group.id} does not belong to course ${courseInfo.id}.`);
        }

        group.assignments.forEach(assignment => {
            if (new Date(assignment.due_at) > new Date()) {
                // Skip assignments that are not yet due
                return;
            }

            learnerSubmissions.forEach(submission => {
                if (submission.assignment_id === assignment.id) {
                    let score = submission.submission.score;
                    let submittedAt = new Date(submission.submission.submitted_at);
                    let dueAt = new Date(assignment.due_at);

                    if (submittedAt > dueAt) {
                        // Apply 10% late penalty
                        score -= 0.1 * assignment.points_possible;
                    }

                    // Calculate and store results
                    let percentageScore = (score / assignment.points_possible) * 100;
                    // Further calculations here for weighted average and building result object
                }
            });
        });
    }
    
    return results;
}
