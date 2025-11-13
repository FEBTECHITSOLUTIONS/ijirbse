import { JournalIssue } from "../models/models.js";
import { apiResponse } from "../utils/apiResponse.js";



export const getLatestIssue = async (req, res) => {
  try {
    // Step 1: Find the most recently published issue
    const latestIssue = await JournalIssue.findOne()
      .sort({ publishedAt: -1 })
      .populate("publishedArticles")
      .populate("edditor", "name email");

    if (!latestIssue) {
      return res
        .status(400)
        .json(new apiResponse("", "No published issues found"));
    }

    // Step 2: Get current month (1–12)
    const currentMonth = new Date().getMonth() + 1; // +1 because getMonth() is 0-based

    // Step 3: Filter by current issueNumber (matches current month)
    const issues = await JournalIssue.find({ issueNumber: currentMonth })
      .populate("publishedArticles")
      .populate("edditor", "name email")
      .sort({ publishedAt: -1 });

    if (!issues.length) {
      return res
        .status(400)
        .json(new apiResponse("", `No issues found for Issue #${currentMonth}`));
    }

    return res
      .status(200)
      .json(new apiResponse(issues, `Issue #${currentMonth} fetched successfully`));
  } catch (error) {
    console.error("❌ Error fetching latest issue:", error);
    return res.status(500).json(new apiResponse("", "Internal Server Error"));
  }
};




export const getArchivedIssues = async (req, res) => {
  try {
    const allIssues = await JournalIssue.find({})
      .populate("publishedArticles")
      .populate("edditor")
      .sort({ publishedAt: -1 });

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // 0-based in JS

    // Filter in JS: exclude documents with current year & issueNumber == currentMonth
    const archivedIssues = allIssues.filter(issue => {
      const issueYear = issue.publishedAt.getFullYear();
      return !(issueYear === currentYear && issue.issueNumber === currentMonth);
    });

    if (archivedIssues.length === 0) {
      return res
        .status(200)
        .json(new apiResponse("", "No archived issues found"));
    }

    return res
      .status(200)
      .json(new apiResponse(archivedIssues, "Archived issues fetched successfully"));
  } catch (err) {
    console.error("Error fetching archived issues:", err);
    return res
      .status(500)
      .json(new apiResponse("", "Server error while fetching archived issues"));
  }
};

