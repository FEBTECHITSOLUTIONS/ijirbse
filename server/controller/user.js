import path from 'path';
import sendEmail from '../services/emailServices.js'
import { JournalIssue, UploadedFile } from "../models/models.js"; 
import nodemailer from "nodemailer";
import { apiResponse } from '../utils/apiResponse.js';

export const uploadarticle = async (req, res) => {
  try {
    console.log("Uploading article...");
    console.log('file meta data' , req.file , req.body);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const { authorName, affiliation, email, title:articleTitle } = req.body;

    if (!authorName || !email || !articleTitle) {
      return res.status(400).json({
        success: false,
        message: "Author name, email, and article title are required.",
      });
    }

   
    const fileMeta = {
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`, 
    };

    const uploadedDoc = await UploadedFile.create({
      authorName,
      affiliation,
      email,
      articleTitle,
      uploadedManuscriptMetaData: fileMeta,
    });

    // ✅ Send email notification to the author
    await sendEmail({
      to: email,
      subject: `Your Manuscript Submission: "${articleTitle}"`,
      text:articleTitle,
       html: `
        <p>Dear <b>${authorName}</b>,</p>
        <p>Thank you for submitting your research article titled <b>"${articleTitle}"</b> to the <i>International Journal of Interdisciplinary Research in Basic Sciences and Engineering (IJIRBSE)</i>.</p>
        <p>Your submission has been received successfully and is currently under editorial review.</p>
        <p>We will notify you about the review outcome within 30–90 days.</p>
        <br/>
        <p>Best Regards,<br/>
        <b>Editorial Team</b><br/>
        IJIRBSE Journal<br/>
        <a href="http://ijirbse.org" target="_blank">www.ijirbse.org</a></p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Article uploaded and email sent successfully.",
      file: uploadedDoc,
    });
  } catch (error) {
    console.error("Error uploading article:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};


export const updateArticleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["submitted", "under_review", "accepted", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json(new apiResponse("", "Invalid article status."));
    }

    // Update status
    const article = await UploadedFile.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!article) {
      return res.status(404).json(new apiResponse("", "Article not found."));
    }

    // Trigger email
    const { authorName, email, articleTitle } = article;

     sendEmail({
      to: email,
      subject: `Your Manuscript Submission: "${articleTitle}"`,
      text: articleTitle,
      html: `
        <p>Dear <b>${authorName}</b>,</p>
        <p>Thank you for submitting your research article titled <b>"${articleTitle}"</b> to the <i>International Journal of Interdisciplinary Research in Basic Sciences and Engineering (IJIRBSE)</i>.</p>
        <p>Your submission status has been updated to: <b>${status.replace("_", " ").toUpperCase()}</b>.</p>
        <p>We will keep you informed about further decisions.</p>
        <br/>
        <p>Best Regards,<br/>
        <b>Editorial Team</b><br/>
        IJIRBSE Journal<br/>
        <a href="http://ijirbse.org" target="_blank">www.ijirbse.org</a></p>
      `,
    });

    return res
      .status(200)
      .json(new apiResponse(article, "Article status updated successfully."));
  } catch (error) {
    console.error("updateArticleStatus Error:", error);
    return res
      .status(500)
      .json(new apiResponse("", "Internal server error while updating article status."));
  }
};


export const constactUs = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Prepare email content
    // const to = "editor@ijirbse.org"; 
    const to = "contact@amarjha.dev"; 
    const mailSubject = `New Contact Message: ${subject}`;
    const text = `
      New message from IJIRBSE Contact Form
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message:
      ${message}
    `;

    const html = `
      <h2>New Message from IJIRBSE Contact Form</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // Send email using your service
    await sendEmail(to, mailSubject, text, html);

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Error in contactUs:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending your message. Please try again later.",
    });
  }
};


export const publishArticle = async(req , res) =>{
   try {
    const { year, volume, issueNumber, category, uploadedFileId } = req.body;
   const {_id} = req.user
    
    if (!uploadedFileId) {
      return res.status(400).json(new apiResponse("", "Missing uploadedFileId"));
    }

    const uploadedFile = await UploadedFile.findByIdAndUpdate(uploadedFileId , {$set:{published:true}});
    if (!uploadedFile) {
      return res.status(400).json(new apiResponse("", "Uploaded file not found"));
    }

    // Find or create issue
    let issue = await JournalIssue.findOne({uploadedFileId});
    if (!issue) {
      issue = await JournalIssue.create({ year, volume, issueNumber, publishedArticles:uploadedFileId , category , edditor:_id });
      return res.status(201).json(new apiResponse("", "Article published successfully"));
    }
    return res.status(400).json(new apiResponse("", "Already published"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new apiResponse("", `${error.message}`));
  }
}


export const getPublishedArticles = async (req, res) => {
  try {
    // Sort by academic year (descending), then volume, then issueNumber
    const issues = await JournalIssue.find()
      .populate("publishedArticles") // populate article details
      .populate("edditor", "email name" )  // populate editor info
      .sort({ year: -1, volume: -1, issueNumber: -1 });
    return res.status(200).json(new apiResponse(issues, "Fetched all published issues"));
  } catch (error) {
    console.error("Error fetching published articles:", error);
    return res.status(500).json(new apiResponse("", `${error.message}`));
  }
};